import * as t from 'io-ts';
import { ProxyVote, EthNetConf, SvNetwork } from './types';
/**
 * This object tracks the flags used for SV ballot boxes. They determine the submission
 * methods and whether ballots are tracked as binding, official, or testing.
 *
 * For more info see docs.secure.vote
 */
export declare const flags: {
    USE_ETH: number;
    USE_SIGNED: number;
    USE_NO_ENC: number;
    USE_ENC: number;
    IS_BINDING: number;
    IS_OFFICIAL: number;
    USE_TESTING: number;
};
/**
 * Creates a packed copy of start and end times with submissionBits
 *
 * @param {number} start
 *  Start time in seconds since epoch
 * @param {number} end
 *  End time in seconds since epoch
 * @param {number} submissionBits
 *  Submission bits - can be created using mkSubmissionBits
 * @returns {BN}
 *  Returns a `bn.js` BigNum of the packed values.
 *  Format: [submissionBits(16)][startTime(64)][endTime(64)]
 */
export declare const mkPacked: (start: any, end: any, submissionBits: any) => any;
/**
 * This combines flags into a finished submissionBits. It also does some validation.
 * @param {number[]} toCombine
 *  Array of all submission flags to combine. See SV.ballotBox.flags for flag options.
 *  All flags must be a power of 2 (which indicates they occupy a single bit in the number when combining).
 * @returns {number}
 *  A 16 bit integer of combined flags.
 */
export declare const mkSubmissionBits: (...toCombine: any[]) => number;
/**
 * Take the arguments and produce web3 data fitting the `submitProxyVote` method.
 * @param {string} ballotId
 *  a BN.js or Hex ballotId
 * @param {number} sequence
 *  the sequence number to use (0 < sequence < 2^32)
 * @param {string} voteData
 *  the vote data to use, should be 32 bytes hex encoded
 * @param {string} extra
 *  any extra data included with the vote (such as curve25519 pubkeys)
 * @param {string} privateKey
 *  the privkey used to sign
 * @param {object?} opts
 *  options:
 *   - skipSequenceSizeCheck: boolean (will not throw if sequence is >= 2^32)
 * @returns {object}
 *  { proxyReq (bytes32[5]), extra (bytes) } in the required format for `submitProxyVote`
 */
export declare const mkSignedBallotForProxy: (ballotId: any, sequence: any, voteData: any, extra: any, privateKey: any, opts?: any) => ProxyVote;
/**
 * Verify a signed vote to be submitted via proxy as generated by `mkSignedBallotForProxy`
 *
 * @param {ProxyVote} proxyVote The ProxyVote object
 * @param {*} [opts={}] Not used currently; for future options
 * @returns {{verified: bool, address: EthAddress}}
 */
export declare const verifySignedBallotForProxy: (proxyVote: ProxyVote, opts?: any) => {
    verified: boolean;
    address: any;
};
/**
 * Prepares voteData for a Range3 ballot from an array of votes
 *
 * @param {array} votesArray
 *  Takes an array of numbers which represent the votes to be transformed
 *  Format: [1, 2, -1]
 *
 * @returns {string}
 *  Returns an eth hex string of the vote data
 */
export declare const genRange3VoteData: (votesArray: number[]) => any;
/**
 * Prepares a transaction for sending with the users web3 browser
 *
 * @param {object} txInfo
 *  Object literal containing the information required to generate the web3 transaction.
 * @param {object} svNetwork
 *  config object containing svNetwork
 *
 * @returns {object}
 *  Returns an object with all fields required to cast the transaction
 */
export declare const prepareWeb3BBVoteTx: ({ txInfo }: {
    txInfo: any;
}, { svNetwork }: {
    svNetwork: any;
}) => Promise<{
    to: any;
    data: any;
    gas: any;
}>;
export declare const castProxyVote: (request: any, netConf: EthNetConf) => Promise<any>;
export declare const deployProxyBallot: (netConf: EthNetConf, proxyProposalReq: t.TypeOfProps<{
    ballotSpec: t.StringType;
    democHash: t.RefinementType<t.RefinementType<t.StringType, string, string, t.mixed>, string, string, t.mixed>;
    startTime: t.RefinementType<t.RefinementType<t.NumberType, number, number, t.mixed>, number, number, t.mixed>;
    endTime: t.RefinementType<t.RefinementType<t.NumberType, number, number, t.mixed>, number, number, t.mixed>;
    networkName: t.RefinementType<t.StringType, string, string, t.mixed>;
}>) => Promise<import("axios").AxiosResponse<any>>;
/**
 * Attempts to deploy the a raw ballot spec to IPFS and the ballot archive
 * @param {string} archivePushUrl - Url for the ballot to be deployed to
 * @param {string} rawBallotSpecString - the stringified ballot spec
 *
 * @returns {string} if successful, will return the ballot hash as a string
 */
export declare const deployBallotSpec: (archivePushUrl: string, rawBallotSpecString: string) => Promise<string>;
/**
 * Retrieves the sequence number for a proxy voting address on a particular ballot
 * @param {SvNetwork} svNetwork
 * @param {Bytes32} ballotId
 * @param {EthAddress} voterAddress - the voting PK of the voter
 *
 * @returns {number} the sequence number for the voter to use
 */
export declare const getProxySequenceNumber: (svNetwork: SvNetwork, ballotId: string, voterAddress: string) => Promise<number>;
/**
 * Takes the network details string returned by the BBFarm contract and returns network specific values
 * @param {Bytes32} networkDetails [32b unallocated][32b chainId][32b networkId][160b bbFarm addr on foreign network]
 *
 * @returns {object} containing the chainId, networkId and address of the remote BBFarm
 */
export declare const explodeForeignNetDetails: (networkDetails: string) => {
    chainId: number;
    networkId: number;
    remoteBBFarmAddress: string;
};
