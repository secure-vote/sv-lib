export declare type ProxyVote = {
    proxyReq: [string, string, string, string, string];
    extra: string;
};
export declare type WindowWeb3Init = {
    detected: boolean;
    loaded: boolean;
    web3?: any;
    networkStatus?: {
        id: number;
        type: string;
        hasIndex: boolean;
    };
};
export declare type EthNetConf = {
    indexEnsName: string;
    auxContract: string;
    httpProvider: string;
    delegationEnsName: string;
    ensResolver: string;
    ens: string;
    etherscanLink: string;
    name: string;
    archiveUrl: string;
    archivePushUrl: string;
    lookupAddress: string;
    unsafeEd25519DelegationAddr: string;
    svApiUrl: string;
};
export declare type SvNetwork = {
    netConf: EthNetConf;
    web3: any;
    resolver: any;
    index: any;
    backend: any;
    aux: any;
    payments: any;
};
