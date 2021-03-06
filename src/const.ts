import { EthNetError } from './errors'
import { EthNetConf } from './types'

export const zeroAddr = '0x0000000000000000000000000000000000000000'
export const zeroHash = '0x0000000000000000000000000000000000000000000000000000000000000000'

const _raw_networkVars: { [netName: string]: EthNetConf } = {
    kovan: {
        indexEnsName: 'index.kov.sv',
        auxContract: '0x8d9d49f602e1e95b8dca42af1766963c3e4f7565',
        httpProvider: 'https://kovan.eth.secure.vote/sv-lib',
        webSocketsProvider: 'wss://kovan.eth.secure.vote:8546/sv-lib',
        delegationEnsName: 'delegation-2018-06-19.kov.sv',
        ensResolver: '0xc8c73829348cb15da4b0785a110017464fb8af51',
        ens: '0xd6F4f22eeC158c434b17d01f62f5dF33b108Ae93',
        etherscanLink: 'https://kovan.etherscan.io/',
        name: 'Kovan',
        archiveUrl: 'https://archive.test.secure.vote/',
        archivePushUrl: 'https://archive.test.push.secure.vote/',
        lookupAddress: '0x216265865e46D4c6FE506877EfAAE7dd7Ae2faCE',
        svApiUrl: 'https://dev.api.secure.vote',
        unsafeEd25519DelegationAddr: '0x005645072d7c244476e3099619a6089245b6a958'
    },
    mainnet: {
        indexEnsName: 'index.tokenvote.eth',
        auxContract: '0x91f34190ffcd934115bb2bd04c29e89362989121',
        httpProvider: 'https://mainnet.eth.secure.vote/sv-lib',
        webSocketsProvider: 'wss://mainnet.eth.secure.vote:8546/sv-lib',
        delegationEnsName: 'delegate.secvote.eth',
        ensResolver: '0x5FfC014343cd971B7eb70732021E26C35B744cc4',
        ens: '0x314159265dd8dbb310642f98f50c066173c1259b',
        etherscanLink: 'https://etherscan.io/',
        name: 'Mainnet',
        archiveUrl: 'https://archive.secure.vote/',
        archivePushUrl: 'https://archive.push.secure.vote/',
        lookupAddress: '0x216265865e46D4c6FE506877EfAAE7dd7Ae2faCE',
        svApiUrl: '',
        unsafeEd25519DelegationAddr: ''
    },
    ropsten: {
        indexEnsName: '',
        auxContract: '',
        httpProvider: 'https://ropsten.eth.secure.vote/sv-lib',
        webSocketsProvider: 'wss://ropsten.eth.secure.vote:8546/sv-lib',
        delegationEnsName: '',
        ensResolver: '',
        ens: '',
        etherscanLink: 'https://ropsten.etherscan.io/',
        name: 'Ropsten',
        archiveUrl: 'https://archive.test.secure.vote/',
        archivePushUrl: 'https://archive.test.push.secure.vote/',
        lookupAddress: '',
        svApiUrl: '',
        unsafeEd25519DelegationAddr: ''
    },
    classic: {
        indexEnsName: '',
        auxContract: '',
        httpProvider: 'https://classic.eth.secure.vote/sv-lib',
        webSocketsProvider: 'wss://classic.eth.secure.vote:8546/sv-lib',
        delegationEnsName: '',
        ensResolver: '',
        ens: '',
        etherscanLink: 'https://gastracker.io/', // eth classic block explorer
        name: 'Classic',
        archiveUrl: 'https://archive.secure.vote/',
        archivePushUrl: 'https://archive.push.secure.vote/',
        lookupAddress: '',
        svApiUrl: '',
        unsafeEd25519DelegationAddr: ''
    }
}

export const networkVars = new Proxy(_raw_networkVars, {
    get: (obj, prop: string) => {
        console.warn('Warning: const.networkVars is deprecated; please use const.getNetwork(..)')
        return obj[prop]
    }
})

export const networkName = networkId => {
    console.warn('Warning: const.networkName(..) is deprecated. Please use const.getNetwork(..).name')

    switch (networkId) {
        case 1:
            return 'Mainnet'
        case 2:
            return 'Morden'
        case 3:
            return 'Ropsten'
        case 4:
            return 'Rinkeby'
        case 42:
            return 'Kovan'
        default:
            return 'Unknown'
    }
}

export const getNetwork = (networkId: number, chainId: number): EthNetConf => {
    switch (networkId) {
        case 1:
            if (chainId === 1) return _raw_networkVars.mainnet
            if (chainId === 61) return _raw_networkVars.classic
            break
        case 3:
            return _raw_networkVars.ropsten
        case 42:
            return _raw_networkVars.kovan
        default:
            break
    }
    throw new EthNetError(`Cannot find network with net_id ${networkId} and chainId ${chainId}`)
}

export const Ed25519DelegatePrefix = 'SV-ED-ETH'
