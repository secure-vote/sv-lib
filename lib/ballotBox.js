var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BN = require('bn.js');
import * as R from 'ramda';
import * as assert from 'assert';
import * as web3Utils from 'web3-utils';
import * as svCrypto from './crypto';
import axios from 'axios';
import BBFarmAbi from './smart_contracts/BBFarm.abi.json';
/**
 * This object tracks the flags used for SV ballot boxes. They determine the submission
 * methods and whether ballots are tracked as binding, official, or testing.
 *
 * For more info see docs.secure.vote
 */
export const flags = {
    // flags on submission methods
    USE_ETH: Math.pow(2, 0),
    USE_SIGNED: Math.pow(2, 1),
    USE_NO_ENC: Math.pow(2, 2),
    USE_ENC: Math.pow(2, 3),
    // other ballot settings
    IS_BINDING: Math.pow(2, 13),
    IS_OFFICIAL: Math.pow(2, 14),
    USE_TESTING: Math.pow(2, 15)
};
/**
 * Creates a packed copy of start and end times with submissionBits
 *
 * @param {number} start
 *  Start time in seconds since epoch
 * @param {number} end
 *  End time in seconds since epoch
 * @param {number} submissionBits
 *  Submission bits - can be created using mkSubmissionBits
 * @returns {BN}
 *  Returns a `bn.js` BigNum of the packed values.
 *  Format: [submissionBits(16)][startTime(64)][endTime(64)]
 */
export const mkPacked = (start, end, submissionBits) => {
    const max64Bit = new BN('ffffffffffffffff', 16);
    const s = new BN(start);
    assert.equal(s.lte(max64Bit) && s.gtn(0), true, 'start time must be >0 and <2^64');
    const e = new BN(end);
    assert.equal(e.lte(max64Bit) && e.gtn(0), true, 'end time must be >0 and <2^64');
    const sb = new BN(submissionBits);
    assert.equal(sb.ltn(Math.pow(2, 16)) && sb.gtn(0), true, 'submission bits must be >0 and <2^16'); // note: submission bits of 0 is invalid
    return sb
        .shln(64)
        .add(s)
        .shln(64)
        .add(e);
};
/**
 * This combines flags into a finished submissionBits. It also does some validation.
 * @param {number[]} toCombine
 *  Array of all submission flags to combine. See SV.ballotBox.flags for flag options.
 *  All flags must be a power of 2 (which indicates they occupy a single bit in the number when combining).
 * @returns {number}
 *  A 16 bit integer of combined flags.
 */
export const mkSubmissionBits = (...toCombine) => {
    const toRet = R.reduce((acc, i) => acc | i, 0, toCombine);
    assert.equal(R.all(i => typeof i == 'number', toCombine), true, `Bad input to mkSubmissionBits. Input is required to be an array of numbers. Instead got: ${toCombine}`);
    assert.equal(R.all(i => i === (i | 0), toCombine), true, `Bad input to mkSubmissionBits. Input was not an array of integers. Instead got: ${toCombine}`);
    assert.equal(toRet, R.sum(toCombine), `Bad input provided to mkSubmissionBits. Logical OR and sum sanity check failed. Input was: ${toCombine}`);
    assert.equal(toRet < Math.pow(2, 16), true, `Submission bits must fit into a 16 bit integer (i.e. less than 2^16). Result was: ${toRet}`);
    return toRet;
};
/**
 * Take the arguments and produce web3 data fitting the `submitProxyVote` method.
 * @param {string} ballotId
 *  a BN.js or Hex ballotId
 * @param {number} sequence
 *  the sequence number to use (0 < sequence < 2^32)
 * @param {string} voteData
 *  the vote data to use, should be 32 bytes hex encoded
 * @param {string} extra
 *  any extra data included with the vote (such as curve25519 pubkeys)
 * @param {string} privateKey
 *  the privkey used to sign
 * @param {object?} opts
 *  options:
 *   - skipSequenceSizeCheck: boolean (will not throw if sequence is >= 2^32)
 * @returns {object}
 *  { proxyReq (bytes32[5]), extra (bytes) } in the required format for `submitProxyVote`
 */
export const mkSignedBallotForProxy = (ballotId, sequence, voteData, extra, privateKey, opts = {}) => {
    if (opts.skipSequenceSizeCheck !== true)
        assert.equal(0 < sequence && sequence < Math.pow(2, 32), true, 'sequence number out of bounds');
    assert.equal(web3Utils.isHexStrict(ballotId) || web3Utils.isBN(ballotId), true, 'ballotId incorrect format (either not a BN or not hex)');
    assert.equal(web3Utils.isHexStrict(voteData), true, 'vote data is not hex (strict)');
    assert.equal(web3Utils.isHexStrict(extra), true, 'extra param is not hex (strict)');
    const _ballotId = web3Utils.isBN(ballotId) ? web3Utils.padLeft(web3Utils.toHex(ballotId), 64) : ballotId;
    assert.equal(_ballotId.length, 66, 'ballotId incorrect length');
    assert.equal(voteData.length, 66, 'voteData incorrect length');
    const sequenceHex = web3Utils.padLeft(web3Utils.toHex(sequence), 8);
    const messageHash = web3Utils.soliditySha3({ t: 'bytes31', v: web3Utils.padLeft(sequenceHex, '62') }, { t: 'bytes32', v: _ballotId }, { t: 'bytes32', v: voteData }, { t: 'bytes', v: extra });
    const { v, r, s } = svCrypto.ethSignHash(messageHash, privateKey);
    const vBytes = web3Utils.hexToBytes(v);
    const midBytes = web3Utils.hexToBytes(web3Utils.padRight('0x', 54));
    const sequenceBytes = web3Utils.hexToBytes(sequenceHex);
    const packed2Bytes = R.concat(vBytes, R.concat(midBytes, sequenceBytes));
    const packed2 = web3Utils.bytesToHex(packed2Bytes);
    return {
        proxyReq: [r, s, packed2, _ballotId, voteData],
        extra
    };
};
/**
 * Verify a signed vote to be submitted via proxy as generated by `mkSignedBallotForProxy`
 *
 * @param {ProxyVote} proxyVote The ProxyVote object
 * @param {*} [opts={}] Not used currently; for future options
 * @returns {{verified: bool, address: EthAddress}}
 */
export const verifySignedBallotForProxy = (proxyVote, opts = {}) => {
    const { proxyReq: [r, s, packed2, ballotId, voteData], extra } = proxyVote;
    const p2Bytes = web3Utils.hexToBytes(packed2);
    const v = web3Utils.bytesToHex(p2Bytes.slice(0, 1));
    const seqNum = web3Utils.bytesToHex(p2Bytes.slice(27, 32));
    const messageHash = web3Utils.soliditySha3({ t: 'bytes31', v: web3Utils.bytesToHex(p2Bytes.slice(1)) }, { t: 'bytes32', v: ballotId }, { t: 'bytes32', v: voteData }, { t: 'bytes', v: extra });
    return svCrypto.ethVerifySig(messageHash, [v, r, s]);
};
/**
 * Prepares voteData for a Range3 ballot from an array of votes
 *
 * @param {array} votesArray
 *  Takes an array of numbers which represent the votes to be transformed
 *  Format: [1, 2, -1]
 *
 * @returns {string}
 *  Returns an eth hex string of the vote data
 */
export const genRange3VoteData = (votesArray) => {
    assert.equal(R.all(v => (v | 0) === v, votesArray), true, 'All array elements must be defined and integers.');
    assert.equal(R.all(v => -3 <= v && v <= 3, votesArray), true, 'Votes must be in range -3 to 3.');
    assert.equal(votesArray.length <= 85, true, 'Too many votes; maximum capacity of 32 bytes is 85 individual items.');
    // Generate list of binary encoded votes. Read bottom to top.
    const binaryVotes = R.compose(
    // pad to 3 bits
    R.map((vBin) => R.join('', R.repeat('0', 3 - vBin.length)) + vBin), 
    // convert votes to binary
    R.map((v) => v.toString(2)), 
    // offset votes to be in range 0,6
    R.map((v) => v + 3))(votesArray);
    // check we have converted votes to bitstring representation of length 3
    assert.equal(R.all(bVote => bVote.length == 3, binaryVotes), true, 'Assertion failed: all binary-encoded votes should be 3 bits long');
    // create the binary voteData
    const rawBinVotes = R.join('', binaryVotes);
    // and pad it with 0s to length 256 (32 bytes total)
    const binVoteData = rawBinVotes + R.join('', R.repeat('0', 32 * 8 - rawBinVotes.length));
    assert.equal(binVoteData.length, 256, 'Assertion failed: generated voteData bit string does not have length 256');
    // Convert to bytes
    const voteBytes = R.map(bStr => parseInt(bStr, 2), R.splitEvery(8, binVoteData));
    // check bytes are in range
    assert.equal(R.all(vByte => 0 <= vByte && vByte <= 255, voteBytes), true, 'Assertion failed: voteBytes (byte array) had a byte out of bounds (<0 or >255)');
    // generate final hex
    const voteData = web3Utils.bytesToHex(voteBytes);
    assert.equal(voteData.length, 66, 'Assertion failed: final hex was not 66 characters long (32 bytes)');
    return voteData;
};
/**
 * Prepares a transaction for sending with the users web3 browser
 *
 * @param {object} txInfo
 *  Object literal containing the information required to generate the web3 transaction.
 * @param {object} svNetwork
 *  config object containing svNetwork
 *
 * @returns {object}
 *  Returns an object with all fields required to cast the transaction
 */
export const prepareWeb3BBVoteTx = ({ txInfo }, { svNetwork }) => __awaiter(this, void 0, void 0, function* () {
    const { bbFarm, ballotId, voteData } = txInfo;
    const { web3 } = svNetwork;
    assert.equal(web3Utils.isAddress(bbFarm), true, 'BBFarm address supplied is not a valid ethereum address.');
    assert.equal(voteData.length, 66, 'Assertion failed: final hex was not 66 characters long (32 bytes)');
    const BBFarmContract = new web3.eth.Contract(BBFarmAbi, bbFarm);
    const submitVote = BBFarmContract.methods.submitVote(ballotId, voteData, '0x');
    const gasEstimate = yield submitVote.estimateGas();
    const abiValue = yield submitVote.encodeABI();
    const web3Tx = {
        to: bbFarm,
        data: abiValue,
        gas: web3.utils.toHex((gasEstimate * 1.05) | 0),
    };
    return web3Tx;
});
export const castProxyVote = (request, svConfig) => __awaiter(this, void 0, void 0, function* () {
    assert.equal(web3Utils.isBN(request.ballotId), true, 'Ballot id is not a BN');
    assert.equal(request.proxyReq.length == 5, true, 'Proxy vote req does not contain the correct number of parameters');
    assert.equal(request.hasOwnProperty('extra') && request.hasOwnProperty('democHash'), true, 'Request does not contain extra and democ hash data');
    return new Promise((resolve, reject) => {
        const svApiUrl = svConfig.svApiUrl;
        const proxyVotePath = '/sv/light/submitProxyVote';
        const requestUrl = `${svApiUrl}${proxyVotePath}`;
        axios
            .post(requestUrl, request)
            .then(response => {
            const { data } = response;
            resolve(data);
        })
            .catch(error => {
            console.log('error :', error.response);
            reject(error);
        });
    });
});
//# sourceMappingURL=ballotBox.js.map