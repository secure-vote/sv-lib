/**
 * Like web3.eth.accounts.hashMessage without the envelope.
 *
 * @param {*} data
 *  A message to hash - if it is hex it'll be UTF8 decoded.
 *
 * @returns {*}
 *  The hashed message (using keccak256)
 */
export declare const hashMsgRaw: (data: string | number[]) => string;
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
export declare const ethSignHash: (messageHash: string, privateKey: string) => {
    messageHash: string;
    v: any;
    r: any;
    s: any;
    signature: any;
};
export declare const ethVerifySig: (messageHash: string, [v, r, s]: string[]) => {
    verified: boolean;
    address: any;
};
