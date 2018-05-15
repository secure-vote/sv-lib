
const R = require('ramda');
const BN = require('bn.js');
const assert = require('assert');


/**
 * This will take an Ethereum hex string (or a normal hex string) and
 * output a normal hex string (no '0x' header) or throw an error on a
 * bad hex string.
 *
 * @param {string} hex
 *
 * @returns {string}
 *  the hex string.
 */
export const cleanEthHex = hex => {
    if (hex === "0x0") {
        return "00";
    }

    // hex must be even - only exception above
    if (hex.length % 2 !== 0) {
        throw Error(`Bad hex string: ${hex}`);
    }

    // this covers the case hex=="0x" => ""
    if (hex.slice(0, 2) === "0x") {
        return hex.slice(2);
    }

    return hex;
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
export const mkPacked = (start, end, submissionBits) => {
    const s = new BN(start)
    const e = new BN(end)
    const sb = new BN(submissionBits)
    return sb.shln(64).add(s).shln(64).add(e);
}


/**
 * This combines flags into
 * @param {Array<number>} toCombine
 *  Array of all submission flags to combine. See SV.ballotBox.flags for flag options.
 *  All flags must be a power of 2 (which indicates they occupy a single bit in the number when combining).
 * @returns {number}
 *  A 16 bit integer of combined flags.
 */
export const mkSubmissionBits = (toCombine) => {
    const toRet = R.reduce((acc, i) => acc | i, 0, toCombine);
    assert.equal(R.all(i => typeof i == "number", toCombine), true, `Bad input to mkSubmissionBits. Input is required to be an array of numbers. Instead got: ${toCombine}`);
    assert.equal(R.all(i => i === i | 0, toCombine), true, `Bad input to mkSubmissionBits. Input was not an array of integers. Instead got: ${toCombine}`);
    assert.equal(toRet, R.sum(toCombine), `Bad input provided to mkSubmissionBits. Logical OR and sum sanity check failed. Input was: ${toCombine}`);
    assert.equal(toRet < 2**16, true, `Submission bits must fit into a 16 bit integer (i.e. less than 2^16). Result was: ${toRet}`);
    return toRet;
}


// this is from the bech32 spec (Bitcoin)
const B32_ALPHA = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
const toAlphabet = arr => {
    ret = "";
    for (let i = 0; i < arr.length; i++) {
        ret += B32_ALPHA.charAt(arr[i]);
    }
    return ret;
}


/**
 * This will convert a hex string to Base32 in the bech32 format WITHOUT a checksum.
 *
 * @param {string} hex
 *  The hex string to convert to Base32 - can be an EthHex or plain hex string.
 *
 * @returns {string}
 *  The Base32 version of the hex string.
 */
export const hexToBase32 = hex => {
    const _hex = cleanEthHex(hex);

    const buf = Buffer.from(_hex, 'hex');
    const digits = [0];
    let digitlength = 1;

    let carry;
    for (let i = 0; i < buf.length; ++i) {
        carry = buf[i];
        for (let j = 0; j < digitlength; ++j) {
            carry += digits[j] * 256;
            digits[j] = carry % 32;
            carry = (carry / 32) | 0;
        }

        while (carry > 0) {
            digits[digitlength] = carry % 32;
            digitlength++;
            carry = (carry / 32) | 0;
        }
    }

    return toAlphabet(R.reverse(digits.slice(0,digitlength)));
}
