import { HexString, Bytes32, EthAddress, StellarAddress } from './runtimeTypes';
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
    webSocketsProvider: string;
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
    events: {
        getBlockPeriodic: any;
    };
};
export declare type BallotSpecV2 = {
    ballotVersion: number;
    ballotInner: {
        ballotTitle: string;
        shortDesc: string;
        longDesc: string;
        discussionLink?: string;
        encyptionPK?: string;
        subGroup?: any;
    };
    optionsVersion: number;
    optionsInner?: {
        options?: any;
        aux?: any;
    };
    subgroupVersion: number;
    subgroupInner?: {
        tokenId: string;
        networkId: [number, number];
        delegationSc: string;
        signature: string;
        proposerPk: string;
        sigType: string;
    };
};
export declare type GlobalBallot = {
    data: BallotSpecV2;
    rawBallotSpecString: string;
    ballotId: string;
    ballotOwner: string;
    bbFarmAddress: string;
    deprecated: boolean;
    startTime: string;
    endTime: string;
    extraData: string;
    hasVoted: boolean;
    nVotesCast: string;
    secKey: string;
    specHash: string;
    submissionBits: string;
};
export declare type EthTx = {
    to: string;
    value: number;
    gas: number | HexString;
    data: string;
};
export declare type Ed25519DelegationResp = {
    to: EthAddress;
    from: StellarAddress;
    txid: Bytes32;
};
