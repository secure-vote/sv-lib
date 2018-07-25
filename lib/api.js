"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./errors");
exports.processApiError = err => {
    throw err.response.status === 400 ? new errors_1.ApiError(err.response.data.error) : err;
};
exports.extractData = ({ data }) => data;
/**
 * Generate the submitEd25519Delegation API URL
 * @param {EthNetConf} ethNetConf
 * @returns {string} The URL for this method
 */
exports.submitEd25519DelegationUrl = ({ svApiUrl }) => `${svApiUrl}/sv/light/submitEd25519Delegation`;
//# sourceMappingURL=api.js.map