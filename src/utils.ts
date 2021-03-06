import { getNetwork } from './const'
import * as R from 'ramda'
import { PathReporter } from 'io-ts/lib/PathReporter'

import { HexString, HexStringRT } from './runtimeTypes'
import * as web3Utils from 'web3-utils'
import { HexError, DecodeError } from './errors'
import * as t from 'io-ts'

export const checkDecode = <S, E extends Error>(validationRes: t.Validation<S>, mkErr?: ((s: string) => E)): void => {
    if (validationRes.isLeft()) {
        const msg = PathReporter.report(validationRes).join('\n')
        throw mkErr ? mkErr(msg) : new DecodeError(msg)
    }
}


export const now = (): number => {
    return new Date().getTime() / 1000
}


export const debugLog = (funcName: string, msg: string | Error | number | any) => {
    if (process && process.env && process.env.DEBUG) {
        console.log(`${now()} - ${funcName}:`, msg);
    }
}


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
export const cleanEthHex = (hex: string) => {
    if (hex === '0x0') {
        return '00'
    }

    // hex must be even - only exception above
    if (hex.length % 2 !== 0) {
        throw new HexError(`Bad hex string: ${hex}`)
    }

    // this covers the case hex=="0x" => ""
    if (hex.slice(0, 2) === '0x') {
        return hex.slice(2)
    }

    return hex
}

export const toEthHex = (hex: string) => {
    if (hex.length % 2 == 0 && web3Utils.isHexStrict(hex)) return hex
    const _hex = '0x' + hex
    checkDecode(HexStringRT.decode(_hex), msg => new HexError(msg))
    return _hex
}

/**
 * This compares ethereum addresses (taking into account case, etc)
 *
 * @param {string} addr1
 * @param {string} addr2
 *
 * @returns {bool}
 */
export const ethAddrEq = (addr1: string, addr2: string) => {
    const _clean = a => module.exports.cleanEthHex(a).toLowerCase()
    // throw a length check in there to ensure we have valid addresses
    return _clean(addr1) === _clean(addr2) && addr1.length === 42
}

// this is from the bech32 spec (Bitcoin)
const B32_ALPHA = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l'
const toAlphabet = (arr: number[]) => {
    var ret = ''
    for (let i = 0; i < arr.length; i++) {
        ret += B32_ALPHA.charAt(arr[i])
    }
    return ret
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
export const hexToBase32 = (hex: string) => {
    const _hex = cleanEthHex(hex)

    const buf = Buffer.from(_hex, 'hex')
    const digits = [0]
    let digitlength = 1

    let carry
    for (let i = 0; i < buf.length; ++i) {
        carry = buf[i]
        for (let j = 0; j < digitlength; ++j) {
            carry += digits[j] * 256
            digits[j] = carry % 32
            carry = (carry / 32) | 0
        }

        while (carry > 0) {
            digits[digitlength] = carry % 32
            digitlength++
            carry = (carry / 32) | 0
        }
    }

    return toAlphabet(R.reverse(digits.slice(0, digitlength)))
}

/**
 * Turn a hexstring (with or without prefix) to a Uint8Array
 *
 * @param {string} hex
 * @returns {Uint8Array}
 */
export const hexToUint8Array = (hex: string) => {
    const _hex = hex.slice(0, 2) === '0x' ? hex.slice(2) : hex
    checkDecode(HexStringRT.decode('0x' + _hex))

    var view = new Uint8Array(_hex.length / 2)

    for (var i = 0; i < _hex.length / 2; i++) {
        view[i] = parseInt(_hex.substring(2 * i, 2 * i + 2), 16)
    }

    return view
}

/**
 * Generate a random hexstring with the requested number of bytes (note: this works around a bug in
 * web3-utils in-browser, so these are not considered cryptographically secure; there might be some
 * bias in the distribution of bytes - particularly a statistical lack of 0s)
 *
 * @param {number} nBytes number of bytes to generate; returned hexString will be nBytes*2+2 in length
 * @returns {HexString}
 */
export const genRandomHex = (nBytes: number): HexString => web3Utils.randomHex(nBytes + 32).slice(0, nBytes * 2 + 2)

/**
 * Return bool based on whether a network has an index contract
 * @param {number} networkId
 * @param {number} chainId
 * @returns {boolean}
 */
export const doesNetHaveIndex = (networkId, chainId) => getNetwork(networkId, chainId).indexEnsName.length > 0
