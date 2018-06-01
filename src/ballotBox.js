const R = require('ramda')
const BN = require('bn.js')
const assert = require('assert')
const web3Utils = require('web3-utils')
const svCrypto = require('./crypto')
const Account = require('eth-lib/lib/account')

/**
 * This object tracks the flags used for SV ballot boxes. They determine the submission
 * methods and whether ballots are tracked as binding, official, or testing.
 *
 * For more info see docs.secure.vote
 */
module.exports.flags = {
    // flags on submission methods
    USE_ETH: 2**0,
    USE_SIGNED: 2**1,
    USE_NO_ENC: 2**2,
    USE_ENC: 2**3,

    // other ballot settings
    IS_BINDING: 2**13,
    IS_OFFICIAL: 2**14,
    USE_TESTING: 2**15,
}


/**
 * Creates a packed copy of start and end times with submissionBits
 *
 * @param {number} start
 *  Start time in seconds since epoch
 * @param {number} end
 *  End time in seconds since epoch
 * @param {number} submissionBits
 *  Submission bits - can be created using mkSubmissionBits
 * @returns {BigNum}
 *  Returns a `bn.js` BigNum of the packed values.
 *  Format: [submissionBits(16)][startTime(64)][endTime(64)]
 */
module.exports.mkPacked = (start, end, submissionBits) => {
    const s = new BN(start)
    const e = new BN(end)
    const sb = new BN(submissionBits)
    return sb.shln(64).add(s).shln(64).add(e);
}


/**
 * This combines flags into a finished submissionBits. It also does some validation.
 * @param {*} toCombine
 *  Array of all submission flags to combine. See SV.ballotBox.flags for flag options.
 *  All flags must be a power of 2 (which indicates they occupy a single bit in the number when combining).
 * @returns {number}
 *  A 16 bit integer of combined flags.
 */
module.exports.mkSubmissionBits = (...toCombine) => {
    if (Array.isArray(toCombine[0]) && typeof toCombine[0][0] == "number") {
        console.warn("Warning: mkSubmissionBits does not take an Array<number> anymore.")
        toCombine = toCombine[0];
    }

    const toRet = R.reduce((acc, i) => acc | i, 0, toCombine);
    assert.equal(R.all(i => typeof i == "number", toCombine), true, `Bad input to mkSubmissionBits. Input is required to be an array of numbers. Instead got: ${toCombine}`);
    assert.equal(R.all(i => i === i | 0, toCombine), true, `Bad input to mkSubmissionBits. Input was not an array of integers. Instead got: ${toCombine}`);
    assert.equal(toRet, R.sum(toCombine), `Bad input provided to mkSubmissionBits. Logical OR and sum sanity check failed. Input was: ${toCombine}`);
    assert.equal(toRet < 2**16, true, `Submission bits must fit into a 16 bit integer (i.e. less than 2^16). Result was: ${toRet}`);
    return toRet;
}


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
 * @returns {Object}
 *  { proxyReq (bytes32[5]), extra (bytes) } in the required format for `submitProxyVote`
 */
module.exports.mkSignedBallotForProxy = (ballotId, sequence, voteData, extra, privateKey) => {
    assert.equal(0 < sequence && sequence < 2**32, true, "sequence number out of bounds")
    assert.equal(web3Utils.isHexStrict(ballotId) || web3Utils.isBN(ballotId), true, "ballotId incorrect format (either not a BN or not hex)")
    assert.equal(web3Utils.isHexStrict(voteData), true, "vote data is not hex (strict)")
    assert.equal(web3Utils.isHexStrict(extra), true, "extra param is not hex (strict)")

    const _ballotId = web3Utils.isBN(ballotId) ? web3Utils.padLeft(web3Utils.toHex(ballotId), 64) : ballotId

    assert.equal(_ballotId.length, 66, 'ballotId incorrect length')
    assert.equal(voteData.length, 66, 'voteData incorrect length')

    const sequenceHex = web3Utils.padLeft(web3Utils.toHex(sequence), 8)

    const messageHash = web3Utils.soliditySha3( {t: 'bytes31', v: web3Utils.padLeft(sequenceHex, '62')}
                                              , {t: 'bytes32', v: _ballotId}
                                              , {t: 'bytes32', v: voteData}
                                              , {t: 'bytes', v: extra}
                                              )

    const {v,r,s} = svCrypto.ethSignHash(messageHash, privateKey)

    const vBytes = web3Utils.hexToBytes(v)
    const midBytes = web3Utils.hexToBytes(web3Utils.padRight('0x', 54))
    const sequenceBytes = web3Utils.hexToBytes(sequenceHex)
    const packed2Bytes = R.concat(vBytes, R.concat(midBytes, sequenceBytes))
    const packed2 = web3Utils.bytesToHex(packed2Bytes)

    return {
        proxyReq:
            [ r
            , s
            , packed2
            , _ballotId
            , voteData
            ],
        extra
    }
}
