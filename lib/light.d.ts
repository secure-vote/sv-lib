import { WindowWeb3Init, EthNetConf, SvNetwork } from './types';
/**
 * Return contract instances and web3 needed for SvLight usage
 * @param {EthNetConf} netConf Config file for all current network
 * @returns {Promise<SvNetwork>} The SvNetwork object based on `netConf`
 */
export declare const initializeSvLight: (netConf: EthNetConf) => Promise<SvNetwork>;
/**
 * Initialise a Web3 instance based on the window's web3.currentProvider
 * @returns {Promise<WindowWeb3Init>} Object containing the web3 instance and metadata
 */
export declare const initializeWindowWeb3: () => Promise<WindowWeb3Init>;
/**
 * Resolve an ENS name to an address
 * @param {{resolver: any}} contracts containing a `resolver` field w/ a web3 instance of a Resolver contract
 * @param {Promise<string>} ensName
 */
export declare const resolveEnsAddress: ({ resolver }: {
    resolver: any;
}, ensName: any) => Promise<string>;
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
    delegationAddress: string;
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
/**
 * Verify a BallotSpec's hash
 *
 * @param {*} rawBallotSpecString The raw string/bytes before JSON.parse
 * @param {*} expectedSpecHash The expected hash as Eth Hex
 *
 * @returns {boolean} Whether the ballotSpec matched the expected hash
 */
export declare const checkBallotHashBSpec: (rawBallotSpecString: any, expectedSpecHash: any) => boolean;
export declare const checkBallotHashGBallot: (ballotObject: any) => boolean;
export declare const getSingularCleanAbi: (requestedAbiName: any, methodName: any) => any;
export declare const stellarPkToHex: (pubKey: string) => string;
/**
 * Get all ed25519 self delegations from a network.
 * @param {string} stellarPK
 * @param {SvNetwork} svNetwork
 * @returns {Promise<any>}
 */
export declare const getUnsafeEd25519Delegations: (stellarPK: string, svNetwork: any) => Promise<any>;
/**
 * Generate a packed Ed25519Delegation instruction for use with the smart contract or API
 * @param address An ethereum address to delegate to
 * @param nonce A nonce in hex that is 3 bytes (6 characters as hex)
 * @returns {Bytes32} The hex string (with 0x prefix) of the delegation instruction
 */
export declare const prepareEd25519Delegation: (address: string, nonce?: string) => string;
/**
 * Create a tx object for an ed25519 delegation
 * @param svNetwork
 * @param dlgtRequest
 * @param pubKey
 * @param signature
 * @param privKey
 * @returns {EthTx}
 */
export declare const createEd25519DelegationTransaction: (svNetwork: any, dlgtRequest: string, pubKey: string, signature: string, privKey: string) => {
    to: any;
    value: number;
    gas: number;
    data: any;
};
/**
 * Verify an ed25519 self-delegation
 * @param dlgtRequest eth hex string of the dlgt request
 * @param pubKey stellar pubkey
 * @param signature 64 byte signature as eth hex
 * @returns {boolean}
 */
export declare const ed25519DelegationIsValid: (dlgtRequest: string, pubKey: string, signature: string) => any;
/**
 *
 * @param ethNetConf
 * @param dlgtRequest
 * @param stellarPK
 * @param _signature
 * @param opts
 */
export declare const submitEd25519Delegation: (ethNetConf: EthNetConf, dlgtRequest: string, stellarPK: string, _signature: string, opts?: any) => Promise<any>;
