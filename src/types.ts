import { HexString } from './runtimeTypes'

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

export type EthTx = { to: string; value: number; gas: number | HexString; data: string }
