export declare const initializeSvLight: (svConfig: any) => Promise<{
    svConfig: any;
    web3: any;
    resolver: any;
    index: any;
    backend: any;
    aux: any;
    payments: any;
}>;
export declare const resolveEnsAddress: ({ resolver }: {
    resolver: any;
}, ensName: any) => Promise<any>;
export declare const getBackendAddress: ({ index }: {
    index: any;
}) => Promise<any>;
export declare const getDemocInfo: ({ backend, democHash }: {
    backend: any;
    democHash: any;
}) => Promise<any>;
export declare const getDemocNthBallot: ({ svNetwork }: {
    svNetwork: any;
}, democBallotInfo: any) => Promise<any>;
export declare const getBallotSpec: (archiveUrl: any, ballotSpecHash: any) => Promise<{
    data: any;
}>;
export declare const getBallotObjectFromS3: (archiveUrl: any, ballotSpecHash: any) => Promise<import("axios").AxiosResponse<any>>;
export declare const getBallotObjectFromIpfs: (ballotSpecHash: any) => Promise<import("axios").AxiosResponse<any>>;
export declare const getDemocBallots: ({ svNetwork, democHash }: {
    svNetwork: any;
    democHash: any;
}) => Promise<any[]>;
/** Takes in the svNetwork object and returns all relevant addresses */
export declare const getContractAddresses: ({ svNetwork }: {
    svNetwork: any;
}) => Promise<{
    indexAddress: any;
    backendAddress: any;
    auxAddress: any;
    lookupAddress: any;
    resolverAddress: any;
    communityAuctionAddress: any;
    delegationAddress: any;
    paymentsAddress: any;
}>;
export declare const weiToCents: ({ payments }: {
    payments: any;
}, wei: any) => Promise<any>;
export declare const getCommunityBallotPrice: ({ payments }: {
    payments: any;
}, democHash: any) => Promise<any>;
export declare const checkIfAddressIsEditor: ({ svNetwork }: {
    svNetwork: any;
}, { userAddress, democHash }: {
    userAddress: any;
    democHash: any;
}) => Promise<any>;
export declare const getCurrentGasPrice: () => Promise<{
    safeLow: number;
    average: number;
    fast: number;
    fastest: number;
}>;
export declare const checkBallotHashBSpec: (ballotSpec: any, assertSpecHash: any) => boolean;
export declare const checkBallotHashGBallot: (ballotObject: any) => boolean;
export declare const getSingularCleanAbi: (requestedAbiName: any, methodName: any) => any;
export declare const getUnsafeEd25519delegations: (pubKey: string, svNetwork: any) => Promise<any>;
export declare const prepareEd25519Delegation: (sk: string, svNetwork: any) => string;
export declare const createEd25519DelegationTransaction: (svNetwork: any, delRequest: string, pubKey: string, signature: string) => Promise<{}>;
export declare const verifyEd25519Delegation: (delRequest: string, pubKey: string, signature: string) => any;
