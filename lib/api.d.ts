export declare class ApiError extends Error {
}
export declare const processApiError: (err: any) => never;
export declare const extractData: ({ data }: {
    data: any;
}) => any;
/**
 * Generate the submitEd25519Delegation API URL
 * @param {EthNetConf} ethNetConf
 * @returns {string} The URL for this method
 */
export declare const submitEd25519DelegationUrl: ({ svApiUrl }: {
    svApiUrl: any;
}) => string;
