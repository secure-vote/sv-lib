"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const errors_1 = require("./errors");
exports.processApiError = (err) => {
    if (err.response && err.response.status === 400 && err.response.data.error) {
        throw new errors_1.ApiError(err.response.data.error);
    }
    throw err;
};
exports.extractData = function (req) { return req.data; };
/**
 * Generate the submitEd25519Delegation API URL
 * @param {EthNetConf} netConf
 * @returns {string} The URL for this method
 */
exports.submitEd25519DelegationUrl = (netConf) => `${netConf.svApiUrl}/sv/light/submitEd25519Delegation`;
exports.postEd25519Delegation = (netConf, postData) => __awaiter(this, void 0, void 0, function* () {
    return (yield axios_1.default
        .post(exports.submitEd25519DelegationUrl(netConf), postData)
        .then(exports.extractData)
        .catch(exports.processApiError));
});
//# sourceMappingURL=api.js.map