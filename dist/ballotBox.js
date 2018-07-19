var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
import * as R from 'ramda';
var BN = require('bn.js');
import * as assert from 'assert';
import * as web3Utils from 'web3-utils';
import * as svCrypto from './crypto';
import axios from 'axios';
import * as Light from './light';
import BBFarmAbi from './smart_contracts/BBFarm.abi.json';
/**
 * This object tracks the flags used for SV ballot boxes. They determine the submission
 * methods and whether ballots are tracked as binding, official, or testing.
 *
 * For more info see docs.secure.vote
 */
export var flags = {
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
export var mkPacked = function (start, end, submissionBits) {
    var s = new BN(start);
    var e = new BN(end);
    var sb = new BN(submissionBits);
    return sb
        .shln(64)
        .add(s)
        .shln(64)
        .add(e);
};
/**
 * This combines flags into a finished submissionBits. It also does some validation.
 * @param {*} toCombine
 *  Array of all submission flags to combine. See SV.ballotBox.flags for flag options.
 *  All flags must be a power of 2 (which indicates they occupy a single bit in the number when combining).
 * @returns {number}
 *  A 16 bit integer of combined flags.
 */
export var mkSubmissionBits = function () {
    var toCombine = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        toCombine[_i] = arguments[_i];
    }
    if (Array.isArray(toCombine[0]) && typeof toCombine[0][0] == 'number') {
        console.warn('Warning: mkSubmissionBits does not take an Array<number> anymore.');
        toCombine = toCombine[0];
    }
    var toRet = R.reduce(function (acc, i) { return acc | i; }, 0, toCombine);
    assert.equal(R.all(function (i) { return typeof i == 'number'; }, toCombine), true, "Bad input to mkSubmissionBits. Input is required to be an array of numbers. Instead got: " + toCombine);
    assert.equal(R.all(function (i) { return i === (i | 0); }, toCombine), true, "Bad input to mkSubmissionBits. Input was not an array of integers. Instead got: " + toCombine);
    assert.equal(toRet, R.sum(toCombine), "Bad input provided to mkSubmissionBits. Logical OR and sum sanity check failed. Input was: " + toCombine);
    assert.equal(toRet < Math.pow(2, 16), true, "Submission bits must fit into a 16 bit integer (i.e. less than 2^16). Result was: " + toRet);
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
export var mkSignedBallotForProxy = function (ballotId, sequence, voteData, extra, privateKey, opts) {
    if (opts === void 0) { opts = {}; }
    if (opts.skipSequenceSizeCheck !== true)
        assert.equal(0 < sequence && sequence < Math.pow(2, 32), true, 'sequence number out of bounds');
    assert.equal(web3Utils.isHexStrict(ballotId) || web3Utils.isBN(ballotId), true, 'ballotId incorrect format (either not a BN or not hex)');
    assert.equal(web3Utils.isHexStrict(voteData), true, 'vote data is not hex (strict)');
    assert.equal(web3Utils.isHexStrict(extra), true, 'extra param is not hex (strict)');
    var _ballotId = web3Utils.isBN(ballotId)
        ? web3Utils.padLeft(web3Utils.toHex(ballotId), 64)
        : ballotId;
    assert.equal(_ballotId.length, 66, 'ballotId incorrect length');
    assert.equal(voteData.length, 66, 'voteData incorrect length');
    var sequenceHex = web3Utils.padLeft(web3Utils.toHex(sequence), 8);
    var messageHash = web3Utils.soliditySha3({ t: 'bytes31', v: web3Utils.padLeft(sequenceHex, '62') }, { t: 'bytes32', v: _ballotId }, { t: 'bytes32', v: voteData }, { t: 'bytes', v: extra });
    var _a = svCrypto.ethSignHash(messageHash, privateKey), v = _a.v, r = _a.r, s = _a.s;
    var vBytes = web3Utils.hexToBytes(v);
    var midBytes = web3Utils.hexToBytes(web3Utils.padRight('0x', 54));
    var sequenceBytes = web3Utils.hexToBytes(sequenceHex);
    var packed2Bytes = R.concat(vBytes, R.concat(midBytes, sequenceBytes));
    var packed2 = web3Utils.bytesToHex(packed2Bytes);
    return {
        proxyReq: [r, s, packed2, _ballotId, voteData],
        extra: extra
    };
};
/**
 * Verify a signed vote to be submitted via proxy as generated by `mkSignedBallotForProxy`
 *
 * @param {ProxyVote} proxyVote The ProxyVote object
 * @param {*} [opts={}] Not used currently; for future options
 * @returns {{verified: bool, address: EthAddress}}
 */
export var verifySignedBallotForProxy = function (proxyVote, opts) {
    if (opts === void 0) { opts = {}; }
    var _a = proxyVote.proxyReq, r = _a[0], s = _a[1], packed2 = _a[2], ballotId = _a[3], voteData = _a[4], extra = proxyVote.extra;
    var p2Bytes = web3Utils.hexToBytes(packed2);
    var v = web3Utils.bytesToHex(p2Bytes.slice(0, 1));
    var seqNum = web3Utils.bytesToHex(p2Bytes.slice(27, 32));
    var messageHash = web3Utils.soliditySha3({ t: 'bytes31', v: web3Utils.bytesToHex(p2Bytes.slice(1)) }, { t: 'bytes32', v: ballotId }, { t: 'bytes32', v: voteData }, { t: 'bytes', v: extra });
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
export var genRange3VoteData = function (votesArray) {
    assert.equal(R.all(function (v) { return (v | 0) === v; }, votesArray), true, 'All array elements must be defined and integers.');
    assert.equal(R.all(function (v) { return -3 <= v && v <= 3; }, votesArray), true, 'Votes must be in range -3 to 3.');
    assert.equal(votesArray.length <= 85, true, 'Too many votes; maximum capacity of 32 bytes is 85 individual items.');
    // Generate list of binary encoded votes. Read bottom to top.
    var binaryVotes = R.compose(
    // pad to 3 bits
    R.map(function (vBin) { return R.join('', R.repeat('0', 3 - vBin.length)) + vBin; }), 
    // convert votes to binary
    R.map(function (v) { return v.toString(2); }), 
    // offset votes to be in range 0,6
    R.map(function (v) { return v + 3; }))(votesArray);
    // check we have converted votes to bitstring representation of length 3
    assert.equal(R.all(function (bVote) { return bVote.length == 3; }, binaryVotes), true, 'Assertion failed: all binary-encoded votes should be 3 bits long');
    // create the binary voteData
    var rawBinVotes = R.join('', binaryVotes);
    // and pad it with 0s to length 256 (32 bytes total)
    var binVoteData = rawBinVotes + R.join('', R.repeat('0', 32 * 8 - rawBinVotes.length));
    assert.equal(binVoteData.length, 256, 'Assertion failed: generated voteData bit string does not have length 256');
    // Convert to bytes
    var voteBytes = R.map(function (bStr) { return parseInt(bStr, 2); }, R.splitEvery(8, binVoteData));
    // check bytes are in range
    assert.equal(R.all(function (vByte) { return 0 <= vByte && vByte <= 255; }, voteBytes), true, 'Assertion failed: voteBytes (byte array) had a byte out of bounds (<0 or >255)');
    // generate final hex
    var voteData = web3Utils.bytesToHex(voteBytes);
    assert.equal(voteData.length, 66, 'Assertion failed: final hex was not 66 characters long (32 bytes)');
    return voteData;
};
/**
 * Prepares a transaction for sending with the users web3 browser
 *
 * @param {object} txInfo
 *  Object literal containing the information required to generate the web3 transaction.
 *       @param {string} bbFarm
 *       Ethereum address where the vote needs to be cast
 *       @param {string} ballotId
 *       The id of the ballot
 *       @param {string} userAddress
 *       Ethereum address of the user - 'from'
 *       @param {string} voteData
 *       The data containing the users vote
 *
 * @returns {object}
 *  Returns an object with all fields required to cast the transaction
 */
export var prepareWeb3BBVoteTx = function (_a, _b) {
    var txInfo = _a.txInfo;
    var svNetwork = _b.svNetwork;
    return __awaiter(_this, void 0, void 0, function () {
        var bbFarm, ballotId, userAddress, voteData, web3, BBFarmContract, submitVote, gasEstimate, abiValue, gasPrice, web3Tx;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    bbFarm = txInfo.bbFarm, ballotId = txInfo.ballotId, userAddress = txInfo.userAddress, voteData = txInfo.voteData;
                    web3 = svNetwork.web3;
                    assert.equal(web3Utils.isAddress(bbFarm), true, 'BBFarm address supplied is not a valid ethereum address.');
                    assert.equal(web3Utils.isAddress(userAddress), true, 'User address supplied is not a valid ethereum address.');
                    assert.equal(voteData.length, 66, 'Assertion failed: final hex was not 66 characters long (32 bytes)');
                    BBFarmContract = new web3.eth.Contract(BBFarmAbi, bbFarm);
                    submitVote = BBFarmContract.methods.submitVote(ballotId, voteData, '0x');
                    return [4 /*yield*/, submitVote.estimateGas()];
                case 1:
                    gasEstimate = _c.sent();
                    return [4 /*yield*/, submitVote.encodeABI()];
                case 2:
                    abiValue = _c.sent();
                    return [4 /*yield*/, Light.getCurrentGasPrice()];
                case 3:
                    gasPrice = _c.sent();
                    web3Tx = {
                        to: bbFarm,
                        data: abiValue,
                        gas: web3.utils.toHex(Math.round(gasEstimate * 1.05)),
                        gasPrice: gasPrice.average * 1000000000,
                        from: userAddress
                    };
                    return [2 /*return*/, web3Tx];
            }
        });
    });
};
export var castProxyVote = function (request, svConfig) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        assert.equal(web3Utils.isBN(request.ballotId), true, 'Ballot id is not a BN');
        assert.equal(request.proxyReq.length == 5, true, 'Proxy vote req does not contain the correct number of parameters');
        assert.equal(request.hasOwnProperty('extra') && request.hasOwnProperty('democHash'), true, 'Request does not contain extra and democ hash data');
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var svApiUrl = svConfig.svApiUrl;
                var proxyVotePath = '/sv/light/submitProxyVote';
                var requestUrl = "" + svApiUrl + proxyVotePath;
                axios
                    .post(requestUrl, request)
                    .then(function (response) {
                    var data = response.data;
                    resolve(data);
                })
                    .catch(function (error) {
                    console.log('error :', error.response);
                    reject(error);
                });
            })];
    });
}); };
// export const createEd25519SelfDelegation = async (delegation) => {
//   return true
// }
//# sourceMappingURL=ballotBox.js.map