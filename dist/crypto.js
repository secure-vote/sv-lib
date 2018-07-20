"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Account = require("eth-lib/lib/account");
var Hash = require("eth-lib/lib/hash");
var web3Utils = require("web3-utils");
/**
 * Like web3.eth.accounts.hashMessage without the envelope.
 *
 * @param {*} data
 *  A message to hash - if it is hex it'll be UTF8 decoded.
 *
 * @returns {*}
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
 * @param {*} messageHash
 *  Hash of a message, as returned by `web3.utils.soliditySha3` or similar.
 * @param {*} privateKey
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
exports.ethVerifySig = function (messageHash, _a) {
    var v = _a[0], r = _a[1], s = _a[2];
    var address = Account.recover(messageHash, Account.encodeSignature([v, r, s]));
    return {
        verified: true,
        address: address
    };
};
//# sourceMappingURL=crypto.js.map