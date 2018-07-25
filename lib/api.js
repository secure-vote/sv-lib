export class ApiError extends Error {
}
export const processApiError = err => { throw (err.response.status === 400 ? new ApiError(err.response.data.error) : err); };
export const extractData = ({ data }) => data;
/**
 * Generate the submitEd25519Delegation API URL
 * @param {EthNetConf} ethNetConf
 * @returns {string} The URL for this method
 */
export const submitEd25519DelegationUrl = ({ svApiUrl }) => `${svApiUrl}/sv/light/submitEd25519Delegation`;
//# sourceMappingURL=api.js.map