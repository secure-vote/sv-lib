import * as t from 'io-ts';
export const HexString = t.refinement(t.string, v => v.slice(0, 2) === '0x' && v.slice(2).replace(/[0-9a-fA-F]*/, '').length === 0 && v.length % 2 === 0, 'HexString');
export const Bytes32 = t.refinement(HexString, v => v.length === 32 * 2 + 2, 'Bytes32');
export const Bytes64 = t.refinement(HexString, v => v.length === 64 * 2 + 2, 'Bytes64');
//# sourceMappingURL=runtimeTypes.js.map