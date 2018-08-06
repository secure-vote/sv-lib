"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Account = require("eth-lib/lib/account");
const StellarBase = require("stellar-base");
const Hash = require("eth-lib/lib/hash");
const web3Utils = require("web3-utils");
const sha256 = require('sha256');
const utils_1 = require("./utils");
const assert = require("assert");
const Web3 = require('web3');
/**
 * Like web3.eth.accounts.hashMessage without the envelope.
 *
 * @param {*} data
 *  A message to hash - if it is hex it'll be UTF8 decoded.
 *
 * @returns {*}
 *  The hashed message (using keccak256)
 */
exports.hashMsgRaw = (data) => {
    const msg = web3Utils.isHexStrict(data) ? web3Utils.hexToBytes(data) : data;
    const msgBuffer = Buffer.from(msg);
    return Hash.keccak256s(msgBuffer);
};
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
exports.ethSignHash = (messageHash, privateKey) => {
    // near identical to web3-eth-accounts (web3 v1)
    // the main difference is we don't envelop the data.
    const signature = Account.sign(messageHash, privateKey);
    const vrs = Account.decodeSignature(signature);
    return {
        messageHash,
        v: vrs[0],
        r: vrs[1],
        s: vrs[2],
        signature
    };
};
exports.ethVerifySig = (messageHash, [v, r, s]) => {
    utils_1.debugLog('ethVerifySig', `verifying messageHash: ${messageHash}`);
    const address = Account.recover(messageHash, Account.encodeSignature([v, r, s]));
    return {
        verified: true,
        address
    };
};
exports.sha256HashString = (stringToHash) => {
    return utils_1.toEthHex(sha256(stringToHash));
};
/**
 * Verify a ed25519 signature
 * @param signedData eth hex string of the dlgt request
 * @param pubKey stellar pubkey
 * @param signature 64 byte signature as eth hex
 * @returns {boolean}
 */
exports.ed25519SignatureIsValid = (signedData, pubKey, signature) => {
    const _sig = utils_1.cleanEthHex(signature);
    assert.equal(_sig.length, 128, 'Invalid signature, should be a 64 byte hex string');
    // Create the keypair from the public key
    const kp = StellarBase.Keypair.fromPublicKey(pubKey);
    // Create a buffer from the signature
    const sigBuffer = Buffer.from(utils_1.hexToUint8Array(_sig));
    // Verify the request against the signature
    return kp.verify(signedData, sigBuffer);
};
//# sourceMappingURL=crypto.js.map