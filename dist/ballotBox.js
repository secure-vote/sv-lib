"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require('ramda');
var BN = require('bn.js');
var assert = require('assert');
var web3Utils = require('web3-utils');
var svCrypto = require('./crypto');
var Account = require('eth-lib/lib/account');
/**
 * This object tracks the flags used for SV ballot boxes. They determine the submission
 * methods and whether ballots are tracked as binding, official, or testing.
 *
 * For more info see docs.secure.vote
 */
exports.flags = {
    // flags on submission methods
    USE_ETH: Math.pow(2, 0),
    USE_SIGNED: Math.pow(2, 1),
    USE_NO_ENC: Math.pow(2, 2),
    USE_ENC: Math.pow(2, 3),
    // other ballot settings
    IS_BINDING: Math.pow(2, 13),
    IS_OFFICIAL: Math.pow(2, 14),
    USE_TESTING: Math.pow(2, 15),
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
exports.mkPacked = function (start, end, submissionBits) {
    var s = new BN(start);
    var e = new BN(end);
    var sb = new BN(submissionBits);
    return sb.shln(64).add(s).shln(64).add(e);
};
/**
 * This combines flags into a finished submissionBits. It also does some validation.
 * @param {*} toCombine
 *  Array of all submission flags to combine. See SV.ballotBox.flags for flag options.
 *  All flags must be a power of 2 (which indicates they occupy a single bit in the number when combining).
 * @returns {number}
 *  A 16 bit integer of combined flags.
 */
exports.mkSubmissionBits = function () {
    var toCombine = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        toCombine[_i] = arguments[_i];
    }
    if (Array.isArray(toCombine[0]) && typeof toCombine[0][0] == "number") {
        console.warn("Warning: mkSubmissionBits does not take an Array<number> anymore.");
        toCombine = toCombine[0];
    }
    var toRet = R.reduce(function (acc, i) { return acc | i; }, 0, toCombine);
    assert.equal(R.all(function (i) { return typeof i == "number"; }, toCombine), true, "Bad input to mkSubmissionBits. Input is required to be an array of numbers. Instead got: " + toCombine);
    assert.equal(R.all(function (i) { return i === i | 0; }, toCombine), true, "Bad input to mkSubmissionBits. Input was not an array of integers. Instead got: " + toCombine);
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
exports.mkSignedBallotForProxy = function (ballotId, sequence, voteData, extra, privateKey, opts) {
    if (opts === void 0) { opts = {}; }
    if (opts.skipSequenceSizeCheck !== true)
        assert.equal(0 < sequence && sequence < Math.pow(2, 32), true, "sequence number out of bounds");
    assert.equal(web3Utils.isHexStrict(ballotId) || web3Utils.isBN(ballotId), true, "ballotId incorrect format (either not a BN or not hex)");
    assert.equal(web3Utils.isHexStrict(voteData), true, "vote data is not hex (strict)");
    assert.equal(web3Utils.isHexStrict(extra), true, "extra param is not hex (strict)");
    var _ballotId = web3Utils.isBN(ballotId) ? web3Utils.padLeft(web3Utils.toHex(ballotId), 64) : ballotId;
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
        proxyReq: [r,
            s,
            packed2,
            _ballotId,
            voteData
        ],
        extra: extra
    };
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
exports.genRange3VoteData = function (votesArray) {
    assert.equal(R.all(function (v) { return (v | 0) === v; }, votesArray), true, "All array elements must be defined and integers.");
    assert.equal(R.all(function (v) { return -3 <= v && v <= 3; }, votesArray), true, "Votes must be in range -3 to 3.");
    assert.equal(votesArray.length <= 85, true, "Too many votes; maximum capacity of 32 bytes is 85 individual items.");
    // Generate list of binary encoded votes. Read bottom to top.
    var binaryVotes = R.compose(
    // pad to 3 bits
    R.map(function (vBin) { return R.join('', R.repeat('0', 3 - vBin.length)) + vBin; }), 
    // convert votes to binary
    R.map(function (v) { return v.toString(2); }), 
    // offset votes to be in range 0,6
    R.map(function (v) { return v + 3; }))(votesArray);
    // check we have converted votes to bitstring representation of length 3
    assert.equal(R.all(function (bVote) { return bVote.length == 3; }, binaryVotes), true, "Assertion failed: all binary-encoded votes should be 3 bits long");
    // create the binary voteData
    var rawBinVotes = R.join('', binaryVotes);
    // and pad it with 0s to length 256 (32 bytes total)
    var binVoteData = rawBinVotes + R.join('', R.repeat('0', 32 * 8 - rawBinVotes.length));
    assert.equal(binVoteData.length, 256, "Assertion failed: generated voteData bit string does not have length 256");
    // Convert to bytes
    var voteBytes = R.map(function (bStr) { return parseInt(bStr, 2); }, R.splitEvery(8, binVoteData));
    // check bytes are in range
    assert.equal(R.all(function (vByte) { return 0 <= vByte && vByte <= 255; }, voteBytes), true, "Assertion failed: voteBytes (byte array) had a byte out of bounds (<0 or >255)");
    // generate final hex
    var voteData = web3Utils.bytesToHex(voteBytes);
    assert.equal(voteData.length, 66, "Assertion failed: final hex was not 66 characters long (32 bytes)");
    return voteData;
};
