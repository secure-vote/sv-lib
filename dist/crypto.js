"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Account = require('eth-lib/lib/account');
var Hash = require("eth-lib/lib/hash");
var web3Utils = require('web3-utils');
/**
 * Like web3.eth.accounts.hashMessage without the envelope.
 *
 * @param {string} data
 *  A message to hash - if it is hex it'll be UTF8 decoded.
 *
 * @returns {string}
 *  The hashed message (using keccak256)
 */
exports.hashMsgRaw = function (data) {
    var msg = web3Utils.isHexStrict(data) ? web3Utils.hexToBytes(data) : data;
    var msgBuffer = Buffer.from(msg);
    return Hash.keccak256s(msgBuffer);
};
/**
 * Sign a message such that it can be verified with `ecrecover`.
 * Similar to `web3.eth.accounts.sign` except that we sign the hash directly.
 *
 * @param {string} messageHash
 *  Hash of a message, as returned by `web3.utils.soliditySha3` or similar.
 * @param {string} privateKey
 *  Privkey to sign with.
 *
 * @returns {{messageHash: string, r: string, s: string, v: string}}
 */
exports.ethSignHash = function (messageHash, privateKey) {
    // near identical to web3-eth-accounts (web3 v1)
    // the main difference is we don't envelop the data.
    var signature = Account.sign(messageHash, privateKey);
    var vrs = Account.decodeSignature(signature);
    return {
        messageHash: messageHash,
        v: vrs[0],
        r: vrs[1],
        s: vrs[2],
        signature: signature
    };
};
