export declare const zeroAddr = "0x0000000000000000000000000000000000000000";
export declare const zeroHash = "0x0000000000000000000000000000000000000000000000000000000000000000";
declare type EthNetConf = {
    indexContractName: string;
    auxContract: string;
    httpProvider: string;
    delegationContractName: string;
    ensResolver: string;
    ens: string;
    etherscanLink: string;
    name: string;
    archiveUrl: string;
    archivePushUrl: string;
    lookupAddress: string;
};
export declare const networkVars: {
    [netName: string]: EthNetConf;
};
export declare const networkName: (networkId: any) => "Kovan" | "Mainnet" | "Ropsten" | "Morden" | "Rinkeby" | "Unknown";
export declare const getNetwork: (networkId: number, chainId: number) => EthNetConf;
export {};
