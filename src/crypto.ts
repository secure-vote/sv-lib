import * as Account from 'eth-lib/lib/account'
import * as StellarBase from 'stellar-base'
import * as Hash from 'eth-lib/lib/hash'
import * as web3Utils from 'web3-utils'
import * as sha256 from 'sha256'
import { toEthHex, cleanEthHex, hexToUint8Array } from './utils'
import * as assert from 'assert'

/**
 * Like web3.eth.accounts.hashMessage without the envelope.
 *
 * @param {*} data
 *  A message to hash - if it is hex it'll be UTF8 decoded.
 *
 * @returns {*}
 *  The hashed message (using keccak256)
 */
export const hashMsgRaw = (data: string | number[]): string => {
    const msg = web3Utils.isHexStrict(data) ? web3Utils.hexToBytes(data) : data
    const msgBuffer = Buffer.from(msg)
    return Hash.keccak256s(msgBuffer)
}

/**
 * Sign a message such that it can be verified with `ecrecover`.
 * Similar to `web3.eth.accounts.sign` except that we sign the hash directly.
 *
 * @param {*} messageHash
 *  Hash of a message, as returned by `web3.utils.soliditySha3` or similar.
 * @param {*} privateKey
 *  Privkey to sign with.
 *
 * @returns {{messageHash: string, r: string, s: string, v: string}}
 */
export const ethSignHash = (messageHash: string, privateKey: string) => {
    // near identical to web3-eth-accounts (web3 v1)
    // the main difference is we don't envelop the data.
    const signature = Account.sign(messageHash, privateKey)
    const vrs = Account.decodeSignature(signature)
    return {
        messageHash,
        v: vrs[0],
        r: vrs[1],
        s: vrs[2],
        signature
    }
}

export /**
 *
 * Operates `ecrecover` over the provided signature
 *
 * @param {string} messageHash This should be an Ethereum HexString
 * @param {string[]} [v, r, s] Components for the secp256k1 signature
 * @returns {{verified: bool, address: EthAddress}}
 */
const ethVerifySig = (messageHash: string, [v, r, s]: string[]) => {
    const address = Account.recover(messageHash, Account.encodeSignature([v, r, s]))
    return {
        verified: true,
        address
    }
}

export const sha256HashString = (stringToHash: string) => {
    return toEthHex(sha256(stringToHash))
}

/**
 * Verify a ed25519 signature
 * @param signedData eth hex string of the dlgt request
 * @param pubKey stellar pubkey
 * @param signature 64 byte signature as eth hex
 * @returns {boolean}
 */
export const ed25519SignatureIsValid = (signedData: string, pubKey: string, signature: string) => {
    const _sig = cleanEthHex(signature)
    assert.equal(_sig.length, 128, 'Invalid signature, should be a 64 byte hex string')

    // Create the keypair from the public key
    const kp = StellarBase.Keypair.fromPublicKey(pubKey)

    // Create a buffer from the signature
    const sigBuffer = Buffer.from(hexToUint8Array(_sig))

    // Verify the request against the signature
    return kp.verify(signedData, sigBuffer)
}
