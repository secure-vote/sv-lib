import * as t from 'io-ts';
export declare const checkDecode: <S, E extends Error>(validationRes: import("fp-ts/lib/Either").Either<t.ValidationError[], S>, mkErr?: (s: string) => E) => void;
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
export declare const cleanEthHex: (hex: string) => string;
export declare const toEthHex: (hex: string) => string;
/**
 * This compares ethereum addresses (taking into account case, etc)
 *
 * @param {string} addr1
 * @param {string} addr2
 *
 * @returns {bool}
 */
export declare const ethAddrEq: (addr1: string, addr2: string) => boolean;
/**
 * This will convert a hex string to Base32 in the bech32 format WITHOUT a checksum.
 *
 * @param {string} hex
 *  The hex string to convert to Base32 - can be an EthHex or plain hex string.
 *
 * @returns {string}
 *  The Base32 version of the hex string.
 */
export declare const hexToBase32: (hex: string) => string;
/**
 * Turn a hexstring (with or without prefix) to a Uint8Array
 *
 * @param {string} hex
 * @returns {Uint8Array}
 */
export declare const hexToUint8Array: (hex: string) => Uint8Array;
/**
 * Generate a random hexstring with the requested number of bytes (note: this works around a bug in
 * web3-utils in-browser, so these are not considered cryptographically secure; there might be some
 * bias in the distribution of bytes - particularly a statistical lack of 0s)
 *
 * @param {number} nBytes number of bytes to generate; returned hexString will be nBytes*2+2 in length
 * @returns {HexString}
 */
export declare const genRandomHex: (nBytes: number) => string;
/**
 * Return bool based on whether a network has an index contract
 * @param {number} networkId
 * @param {number} chainId
 * @returns {boolean}
 */
export declare const doesNetHaveIndex: (networkId: any, chainId: any) => boolean;
