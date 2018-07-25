"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const t = require("io-ts");
exports.HexStringRT = t.refinement(t.string, v => v.slice(0, 2) === '0x' && v.slice(2).replace(/[0-9a-fA-F]*/, '').length === 0 && v.length % 2 === 0, 'HexString');
exports.Bytes32RT = t.refinement(exports.HexStringRT, v => v.length === 32 * 2 + 2, 'Bytes32');
exports.Bytes64RT = t.refinement(exports.HexStringRT, v => v.length === 64 * 2 + 2, 'Bytes64');
//# sourceMappingURL=runtimeTypes.js.map