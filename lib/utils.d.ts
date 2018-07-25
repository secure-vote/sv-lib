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
export declare const genRandomHex: (nBytes: any) => any;
