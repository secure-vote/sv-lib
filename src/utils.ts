const R = require('ramda')
const BN = require('bn.js')
const assert = require('assert')

const bb = require('./ballotBox')

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
    throw Error(`Bad hex string: ${hex}`)
  }

  // this covers the case hex=="0x" => ""
  if (hex.slice(0, 2) === '0x') {
    return hex.slice(2)
  }

  return hex
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
