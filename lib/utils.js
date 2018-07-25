import * as R from 'ramda';
import { ThrowReporter } from 'io-ts/lib/ThrowReporter';
import { HexStringRT } from './runtimeTypes';
import * as web3Utils from 'web3-utils';
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
export const cleanEthHex = (hex) => {
    if (hex === '0x0') {
        return '00';
    }
    // hex must be even - only exception above
    if (hex.length % 2 !== 0) {
        throw Error(`Bad hex string: ${hex}`);
    }
    // this covers the case hex=="0x" => ""
    if (hex.slice(0, 2) === '0x') {
        return hex.slice(2);
    }
    return hex;
};
export const toEthHex = (hex) => {
    if (web3Utils.isHexStrict(hex))
        return hex;
    const _hex = '0x' + hex;
    ThrowReporter.report(HexStringRT.decode(_hex));
    return _hex;
};
/**
 * This compares ethereum addresses (taking into account case, etc)
 *
 * @param {string} addr1
 * @param {string} addr2
 *
 * @returns {bool}
 */
export const ethAddrEq = (addr1, addr2) => {
    const _clean = a => module.exports.cleanEthHex(a).toLowerCase();
    // throw a length check in there to ensure we have valid addresses
    return _clean(addr1) === _clean(addr2) && addr1.length === 42;
};
// this is from the bech32 spec (Bitcoin)
const B32_ALPHA = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
const toAlphabet = (arr) => {
    var ret = '';
    for (let i = 0; i < arr.length; i++) {
        ret += B32_ALPHA.charAt(arr[i]);
    }
    return ret;
};
/**
 * This will convert a hex string to Base32 in the bech32 format WITHOUT a checksum.
 *
 * @param {string} hex
 *  The hex string to convert to Base32 - can be an EthHex or plain hex string.
 *
 * @returns {string}
 *  The Base32 version of the hex string.
 */
export const hexToBase32 = (hex) => {
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
    return toAlphabet(R.reverse(digits.slice(0, digitlength)));
};
/**
 * Turn a hexstring (with or without prefix) to a Uint8Array
 *
 * @param {string} hex
 * @returns {Uint8Array}
 */
export const hexToUint8Array = (hex) => {
    const _hex = hex.slice(0, 2) === '0x' ? hex.slice(2) : hex;
    ThrowReporter.report(HexStringRT.decode('0x' + _hex));
    var view = new Uint8Array(_hex.length / 2);
    for (var i = 0; i < _hex.length / 2; i++) {
        view[i] = parseInt(_hex.substring(2 * i, 2 * i + 2), 16);
    }
    return view;
};
export const genRandomHex = nBytes => web3Utils.randomHex(nBytes + 32).slice(0, nBytes * 2 + 2);
//# sourceMappingURL=utils.js.map