const Account = require('eth-lib/lib/account');
const Hash = require("eth-lib/lib/hash");
const web3Utils = require('web3-utils');

/**
 * Like web3.eth.accounts.hashMessage without the envelope.
 *
 * @param {string} data
 *  A message to hash - if it is hex it'll be UTF8 decoded.
 *
 * @returns {string}
 *  The hashed message (using keccak256)
 */
const hashMsgRaw = data => {
    const msg = web3Utils.isHexStrict(data) ? web3Utils.hexToBytes(data) : data;
    const msgBuffer = Buffer.from(msg);
    return Hash.keccak256s(msgBuffer);
}


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
const ethSignHash = (messageHash, privateKey) => {
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
    }
}

module.exports = {
    hashMsgRaw,
    ethSignHash,
}
