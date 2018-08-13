"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const t = require("io-ts");
const web3_utils_1 = require("web3-utils");
exports.HexStringRT = t.refinement(t.string, v => v.slice(0, 2) === '0x' && v.slice(2).replace(/[0-9a-fA-F]*/, '').length === 0 && v.length % 2 === 0, 'HexString');
exports.Bytes32RT = t.refinement(exports.HexStringRT, v => v.length === 32 * 2 + 2, 'Bytes32');
exports.Bytes64RT = t.refinement(exports.HexStringRT, v => v.length === 64 * 2 + 2, 'Bytes64');
exports.TimestampRT = t.refinement(t.Integer, i => 1500000000 <= i && i <= Math.pow(2, 40), 'Timestamp');
exports.validNetworkNames = ["mainnet", "testnet"];
exports.NetworkNameRT = t.refinement(t.string, s => s in exports.validNetworkNames, 'NetworkName');
exports.EthAddressRT = t.refinement(t.string, a => web3_utils_1.isAddress(a), 'Ethereum Address');
exports.StellarAddressRT = t.refinement(t.string, () => true, "Stellar Address");
//# sourceMappingURL=runtimeTypes.js.map