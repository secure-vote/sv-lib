import { HexString, Bytes32, EthAddress, StellarAddress } from './runtimeTypes'

export type ProxyVote = {
    // these should be `bytes32` hexstrings
    proxyReq: [string, string, string, string, string]
    // this is a `bytes` hexstring
    extra: string
}

export type WindowWeb3Init = {
    detected: boolean
    loaded: boolean
    web3?: any
    networkStatus?: {
        id: number
        type: string
        hasIndex: boolean
    }
}

export type EthNetConf = {
    indexEnsName: string
    auxContract: string
    httpProvider: string
    webSocketsProvider: string
    delegationEnsName: string
    ensResolver: string
    ens: string
    etherscanLink: string
    name: string
    archiveUrl: string
    archivePushUrl: string
    lookupAddress: string
    unsafeEd25519DelegationAddr: string
    svApiUrl: string
}

export type SvNetwork = {
    netConf: EthNetConf
    web3: any
    resolver: any
    index: any
    backend: any
    aux: any
    payments: any
}

export type BallotSpecV2 = {
    ballotVersion: number
    ballotInner: {
        ballotTitle: string
        shortDesc: string
        longDesc: string
        discussionLink?: string
        encyptionPK?: string
        subGroup?: any
    }
    optionsVersion: number
    optionsInner?: {
        options?: any
        aux?: any
    }
    subgroupVersion: number
    subgroupInner?: {
        tokenId: string
        networkId: [number, number]
        delegationSc: string
        signature: string
        proposerPk: string
        sigType: string
    }
}

export type GlobalBallot = {
    data: BallotSpecV2
    rawBallotSpecString: string
    ballotId: string
    ballotOwner: string
    bbFarmAddress: string
    deprecated: boolean
    startTime: string
    endTime: string
    extraData: string
    hasVoted: boolean
    nVotesCast: string
    secKey: string
    specHash: string
    submissionBits: string
}

export type EthTx = { to: string; value: number; gas: number | HexString; data: string }

export type Ed25519DelegationResp = {to: EthAddress, from: StellarAddress, txid: Bytes32}
