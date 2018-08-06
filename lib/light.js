"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const NH = require("eth-ens-namehash");
const bs58 = require("bs58");
const web3Utils = require("web3-utils");
const StellarBase = require("stellar-base");
const assert = require("assert");
const t = require("io-ts");
const Web3 = require('web3');
const detectNetwork = require('web3-detect-network');
const svConst = require("./const");
const svUtils = require("./utils");
const API = require("./api");
const runtimeTypes_1 = require("./runtimeTypes");
const crypto_1 = require("./crypto");
// Lovely ABIs
// Note - have changed this from import to require as the import was not working on the nod
const ResolverAbi = require('./smart_contracts/SV_ENS_Resolver.abi.json');
const IndexAbi = require('./smart_contracts/SVLightIndex.abi.json');
const BackendAbi = require('./smart_contracts/SVLightIndexBackend.abi.json');
const BBFarmAbi = require('./smart_contracts/BBFarm.abi.json');
const PaymentsAbi = require('./smart_contracts/SVPayments.abi.json');
const AuxAbi = require('./smart_contracts/AuxAbi.abi.json');
const AuctionAbi = require('./smart_contracts/CommAuctionIface.abi.json');
const ERC20Abi = require('./smart_contracts/ERC20.abi.json');
const UnsafeEd25519DelegationAbi = require('./smart_contracts/UnsafeEd25519Delegation.abi.json');
/**
 * Return contract instances and web3 needed for SvLight usage
 * @param {EthNetConf} netConf Config file for all current network
 * @returns {Promise<SvNetwork>} The SvNetwork object based on `netConf`
 */
exports.initializeSvLight = (netConf) => __awaiter(this, void 0, void 0, function* () {
    const { indexEnsName, ensResolver, webSocketsProvider, httpProvider, auxContract } = netConf;
    const provider = new Web3.providers.WebsocketProvider(webSocketsProvider);
    const web3 = new Web3(provider);
    svUtils.debugLog('initializeSvLight', `Web3 loaded: ${!!web3}`);
    const resolver = new web3.eth.Contract(ResolverAbi, ensResolver);
    const indexAddress = yield exports.resolveEnsAddress({ resolver }, indexEnsName);
    const index = new web3.eth.Contract(IndexAbi, indexAddress);
    const backendAddress = yield index.methods.getBackend().call();
    const backend = new web3.eth.Contract(BackendAbi, backendAddress);
    const aux = new web3.eth.Contract(AuxAbi, auxContract);
    const payments = new web3.eth.Contract(PaymentsAbi, yield index.methods.getPayments().call());
    return {
        netConf,
        web3,
        resolver,
        index,
        backend,
        aux,
        payments
    };
});
/**
 * Initialise a Web3 instance based on the window's web3.currentProvider
 * @returns {Promise<WindowWeb3Init>} Object containing the web3 instance and metadata
 */
exports.initializeWindowWeb3 = () => __awaiter(this, void 0, void 0, function* () {
    // note: on the following line having (<any>window) instead of (window as any) breaks esdoc
    const windowWeb3 = window.web3;
    const detected = typeof windowWeb3 !== 'undefined';
    if (!detected) {
        return { detected: false, loaded: true };
    }
    const network = yield detectNetwork(windowWeb3.currentProvider);
    const netHasIndex = svUtils.doesNetHaveIndex(network.id, network.id);
    const networkStatus = { id: network.id, type: network.type, hasIndex: netHasIndex };
    const web3 = new Web3(windowWeb3.currentProvider);
    return { detected, loaded: true, networkStatus, web3 };
});
/**
 * Resolve an ENS name to an address
 * @param {{resolver: any}} contracts containing a `resolver` field w/ a web3 instance of a Resolver contract
 * @param {Promise<string>} ensName
 */
exports.resolveEnsAddress = ({ resolver }, ensName) => __awaiter(this, void 0, void 0, function* () {
    const addr = yield resolver.methods.addr(NH.hash(ensName)).call();
    return addr;
});
/**
 * Attempts to retrieve a ballotSpec from ipfs and falls back to archive
 * @param {string} archiveUrl - the http archive url
 * @param {Bytes64} ballotSpecHash - the hash of the url
 * @returns {Promise<string>} the raw string of the ballot spec
 */
exports.getBallotSpec = (archiveUrl, ballotSpecHash) => {
    // TODO refactor to be a bit more elegant
    return new Promise((res, rej) => {
        let done = false;
        const doRes = obj => {
            if (!done) {
                done = true;
                res(obj);
            }
        };
        _getBallotObjectFromIpfs(ballotSpecHash).then(doRes);
        setTimeout(() => {
            if (!done) {
                _getBallotObjectFromS3(archiveUrl, ballotSpecHash)
                    .then(doRes)
                    .catch(rej);
            }
        }, 3500);
    });
};
/**
 * Attempts to retrieve a ballotSpec from S3
 * @param {string} archiveUrl - the url for the http archive
 * @param {Bytes32} ballotSpecHash - the hash of the ballot spec
 * @returns {Promise<string>} the raw string of the ballot spec
 */
const _getBallotObjectFromS3 = (archiveUrl, ballotSpecHash) => __awaiter(this, void 0, void 0, function* () {
    const requestUrl = `${archiveUrl}${ballotSpecHash}.json`;
    const { data } = yield axios_1.default.get(requestUrl, {
        // We need to specify this transformResponse in order to avoid axios's default of parsing JSON
        transformResponse: res => {
            return res;
        },
        responseType: 'text'
    });
    return data;
});
/**
 * Attempts to retrieve a ballotSpec from ipfs
 * @param {Bytes32} ballotSpecHash - the hash of the ballot spec
 * @returns {Promise<string>} the raw string of the ballot spec
 */
const _getBallotObjectFromIpfs = (ballotSpecHash) => __awaiter(this, void 0, void 0, function* () {
    const ipfsUrl = 'https://ipfs.infura.io/api/v0/block/get?arg=';
    const cidHex = '1220' + ballotSpecHash.substr(2);
    const bytes = Buffer.from(cidHex, 'hex');
    const cid = bs58.encode(bytes);
    const requestUrl = ipfsUrl + cid;
    const { data } = yield axios_1.default.get(requestUrl, {
        // We need to specify this transformResponse in order to avoid axios's default of parsing JSON
        transformResponse: res => {
            return res;
        },
        responseType: 'text'
    });
    return data;
});
const GetDemocNthBallotRT = t.type({
    democHash: runtimeTypes_1.Bytes32RT,
    nthBallot: t.Integer,
    userEthAddress: runtimeTypes_1.EthAddressRT
});
/**
 * Attempts to retrieve a ballotSpec from ipfs and falls back to archive
 * @param {SvNetwork} svNetwork
 * @param {GetDemocNthBallot} democBallotInfo - object containing the information about what ballot to retrieve
 * @returns {Promise<GlobalBallot>} global ballot object containing all required ballot information
 */
exports.getDemocNthBallot = (svNetwork, democBallotInfo) => __awaiter(this, void 0, void 0, function* () {
    // Destructure and set the variables that are needed
    const { index, aux, netConf } = svNetwork;
    const { democHash, nthBallot, userEthAddress } = democBallotInfo;
    const { archiveUrl } = netConf;
    const bbFarmAndBallotId = yield aux.methods.getBBFarmAddressAndBallotId(index._address, democHash, nthBallot).call();
    const { ballotId, bbFarmAddress } = bbFarmAndBallotId;
    const ethBallotDetails = yield aux.methods.getBallotDetails(ballotId, bbFarmAddress, userEthAddress).call();
    const rawBallotSpecString = yield exports.getBallotSpec(archiveUrl, ethBallotDetails.specHash);
    return Object.assign({}, bbFarmAndBallotId, ethBallotDetails, { rawBallotSpecString, data: JSON.parse(rawBallotSpecString) });
});
/**
 * Returns an array of all ballots from a democracy
 * @param {SvNetwork} svNetwork
 * @param {Bytes32} democHash - the hash of the ballot spec
 * @param {EthAddress} userEthAddress the user's address
 * @returns {Promise<GlobalBallot[]>} -------- todo --------------
 */
exports.getDemocBallots = (svNetwork, democHash, userEthAddress) => __awaiter(this, void 0, void 0, function* () {
    const { backend } = svNetwork;
    const democInfo = yield backend.methods.getDInfo(democHash).call();
    if (democInfo.erc20 == svConst.zeroAddr) {
        console.warn(`getDemocBallots: Democracy ${democHash} has no associated ERC20. Is this the correct democracy hash?`);
    }
    // TODO - Work out where / how to push an errored ballot
    // Loop through and get all the ballots
    const numBallots = democInfo.nBallots;
    const ballotsArray = [];
    for (let i = 0; i < numBallots; i++) {
        ballotsArray[i] = yield exports.getDemocNthBallot(svNetwork, { democHash: democHash, nthBallot: i, userEthAddress });
    }
    return ballotsArray;
});
/**
 *
 * @param {SvNetwork} svNetwork
 * @param {Bytes32} democHash of the democracy we want to get the ballots from
 * @param {string} tokenId the id of the token subgroup we want to retrieve
 * @param {EthAddress} userEthAddress the user's address
 * @returns {Promise<GlobalBallot[]>} ---------- todo --------------
 */
exports.getFilterDemocBallots = (svNetwork, democHash, tokenId, userEthAddress) => __awaiter(this, void 0, void 0, function* () {
    const allDemocBallots = yield exports.getDemocBallots(svNetwork, democHash, userEthAddress);
    // Check each ballot for valid signature
    const verifiedBallots = [];
    const unverifiedBallots = [];
    for (let i = 0; i < allDemocBallots.length; i++) {
        const currentBallot = allDemocBallots[i];
        const { rawBallotSpecString } = currentBallot;
        if (exports.isEd25519SignedBallotValid(rawBallotSpecString)) {
            verifiedBallots.push(currentBallot);
        }
        else {
            unverifiedBallots.push(currentBallot); // We don't currently return this
        }
    }
    return verifiedBallots.filter(ballot => ballot.data.subgroupInner.tokenId === tokenId);
});
/**
 * Check if a raw ballotSpec contains a valid signature for a subgroup
 * @param {string} rawBallotSpecString raw string of the ballot spec retrieved from ipfs
 * @returns {boolean} boolean value representing if the signature valid
 */
exports.isEd25519SignedBallotValid = (rawBallotSpecString) => {
    const unszSpec = JSON.parse(rawBallotSpecString);
    if (!unszSpec.subgroupInner.signature || !unszSpec.subgroupInner.proposerPk)
        return false;
    const { signature, proposerPk } = unszSpec.subgroupInner;
    try {
        svUtils.checkDecode(runtimeTypes_1.Bytes64RT.decode(signature));
        svUtils.checkDecode(runtimeTypes_1.StellarAddressRT.decode(proposerPk));
    }
    catch (e) {
        return false;
    }
    const preppedBSpec = rawBallotSpecString.replace(signature, '**SIG_1**');
    return crypto_1.ed25519SignatureIsValid(preppedBSpec, proposerPk, signature);
};
/** Takes in the svNetwork object and returns all relevant addresses */
exports.getContractAddresses = ({ svNetwork }) => __awaiter(this, void 0, void 0, function* () {
    const { index, resolver, backend, aux, netConf } = svNetwork;
    const { delegationEnsName, lookupAddress } = netConf;
    return {
        indexAddress: index._address,
        backendAddress: backend._address,
        auxAddress: aux._address,
        lookupAddress: lookupAddress,
        resolverAddress: resolver._address,
        communityAuctionAddress: yield index.methods.getCommAuction().call(),
        delegationAddress: yield exports.resolveEnsAddress({ resolver }, delegationEnsName),
        paymentsAddress: yield index.methods.getPayments().call()
    };
});
exports.weiToCents = ({ payments }, wei) => __awaiter(this, void 0, void 0, function* () {
    return yield payments.methods.weiToCents(wei).call();
});
exports.getCommunityBallotPrice = ({ payments }, democHash) => __awaiter(this, void 0, void 0, function* () {
    return yield payments.methods.getNextPrice(democHash).call();
});
exports.checkIfAddressIsEditor = ({ svNetwork }, { userAddress, democHash }) => __awaiter(this, void 0, void 0, function* () {
    const { backend } = svNetwork;
    return yield backend.methods.isDEditor(democHash, userAddress).call();
});
// Checks the current ethereum gas price and returns a couple of values
exports.getCurrentGasPrice = () => __awaiter(this, void 0, void 0, function* () {
    const gasStationInfo = yield axios_1.default.get('https://ethgasstation.info/json/ethgasAPI.json');
    const { data } = gasStationInfo;
    return {
        safeLow: data.safeLow / 10,
        average: data.average / 10,
        fast: data.fast / 10,
        fastest: data.fastest / 10
    };
});
/**
 * Verify a BallotSpec's hash
 *
 * @param {*} rawBallotSpecString The raw string/bytes before JSON.parse
 * @param {*} expectedSpecHash The expected hash as Eth Hex
 *
 * @returns {boolean} Whether the ballotSpec matched the expected hash
 */
exports.checkBallotHashBSpec = (rawBallotSpecString, expectedSpecHash) => {
    throw Error('Unimplemented (check code for details)');
    // NOTE: This function is unsafe - JSON does not have deterministic key order
    // a ballotSpec object is not suitable to verify the hash; you need the _raw_
    // string before it is parsed to JSON
    // Original function
    // let contentHash = '0x' + sha256(JSON.stringify(ballotSpec, null, 2))
    // if (assertSpecHash === contentHash) {
    //   return true
    // } else {
    //   return false
    // }
};
// Checks the ballot hash against a ballot global ballot object
// Does this by destructuring the specHash and data out of it
exports.checkBallotHashGBallot = ballotObject => {
    const { data, specHash } = ballotObject;
    return exports.checkBallotHashBSpec(data, specHash);
};
// Takes the name of an abi and a method name
// Returns a new ABI array with only the requested method
exports.getSingularCleanAbi = (requestedAbiName, methodName) => {
    const abiList = {
        ResolverAbi: ResolverAbi,
        IndexAbi: IndexAbi,
        BackendAbi: BackendAbi,
        BBFarmAbi: BBFarmAbi,
        PaymentsAbi: PaymentsAbi,
        AuxAbi: AuxAbi,
        AuctionAbi: AuctionAbi,
        ERC20Abi: ERC20Abi
    };
    const selectedAbi = abiList[requestedAbiName];
    const methodObject = selectedAbi.filter(abi => abi.name == methodName);
    return methodObject;
};
exports.stellarPkToHex = (pubKey) => {
    // Get the hex pub key
    let rawPubKey, hexPubKey;
    if (web3Utils.isHex(pubKey)) {
        hexPubKey = web3Utils.isHexStrict(pubKey) ? pubKey : '0x' + pubKey;
    }
    else {
        const kp = StellarBase.Keypair.fromPublicKey(pubKey);
        const rawPubKey = kp.rawPublicKey();
        hexPubKey = '0x' + rawPubKey.toString('hex');
    }
    return hexPubKey;
};
/**
 * Get all ed25519 self delegations from a network.
 * @param {string} stellarPK
 * @param {SvNetwork} svNetwork
 * @returns {Promise<any>}
 */
exports.getUnsafeEd25519Delegations = (stellarPK, svNetwork) => __awaiter(this, void 0, void 0, function* () {
    // TODO - Some assertions and stuff..
    const { web3, netConf } = svNetwork;
    const { unsafeEd25519DelegationAddr } = netConf;
    const Ed25519Del = new web3.eth.Contract(UnsafeEd25519DelegationAbi, unsafeEd25519DelegationAddr);
    const delegations = yield Ed25519Del.methods
        .getAllForPubKey(exports.stellarPkToHex(stellarPK))
        .call()
        .catch(error => {
        throw error;
    });
    return delegations;
});
/**
 * Generate a packed Ed25519Delegation instruction for use with the smart contract or API
 * @param address An ethereum address to delegate to
 * @param nonce A nonce in hex that is 3 bytes (6 characters as hex)
 * @returns {Bytes32} The hex string (with 0x prefix) of the delegation instruction
 */
exports.prepareEd25519Delegation = (address, nonce) => {
    // msg prefix (prevents attacks via malicious signature requests)
    const prefix = svUtils.cleanEthHex(web3Utils.toHex(svConst.Ed25519DelegatePrefix));
    assert.equal(prefix.length, 9 * 2, 'Invalid prefix (${prefix}). It must be exactly 9 bytes');
    const _nonce = nonce && web3Utils.isHex(nonce) ? nonce : svUtils.genRandomHex(3);
    const trimmedNonce = svUtils.cleanEthHex(_nonce);
    assert.equal(trimmedNonce.length, 6, `Invalid nonce (${trimmedNonce}). It must be exactly 3 bytes (6 hex characters)`);
    const trimmedAddress = svUtils.cleanEthHex(address);
    const dlgtPacked = `0x${prefix}${trimmedNonce}${trimmedAddress}`.toLowerCase();
    assert.equal(dlgtPacked.length, 2 + 64, 'dlgtPacked was not 32 bytes / 64 chars long. This should never happen.');
    return dlgtPacked;
};
/**
 * Create a tx object for an ed25519 delegation
 * @param svNetwork
 * @param dlgtRequest
 * @param pubKey
 * @param signature
 * @param privKey
 * @returns {EthTx}
 */
exports.createEd25519DelegationTransaction = (svNetwork, dlgtRequest, pubKey, signature, privKey) => {
    const { web3, netConf } = svNetwork;
    const { unsafeEd25519DelegationAddr } = netConf;
    // Initialise the contract
    const Ed25519Del = new web3.eth.Contract(UnsafeEd25519DelegationAbi, unsafeEd25519DelegationAddr);
    // Split the 64 bytes of the signature into an array containging 2x bytes32
    const sig1 = `0x${signature.slice(0, 64)}`;
    const sig2 = `0x${signature.slice(64)}`;
    const addDelegation = Ed25519Del.methods.addUntrustedSelfDelegation(dlgtRequest, exports.stellarPkToHex(pubKey), [sig1, sig2]);
    const txData = addDelegation.encodeABI();
    return {
        to: unsafeEd25519DelegationAddr,
        value: 0,
        gas: 500000,
        data: txData
    };
};
/**
 * Verify an ed25519 self-delegation
 * @param dlgtRequest eth hex string of the dlgt request
 * @param pubKey stellar pubkey
 * @param signature 64 byte signature as eth hex
 * @returns {boolean}
 * This function has been deprecated in favour of more general ed25519SignatureIsValid function in /crypto
 */
exports.ed25519DelegationIsValid = (dlgtRequest, pubKey, signature) => {
    return crypto_1.ed25519SignatureIsValid(dlgtRequest, pubKey, signature);
};
/**
 *
 * @param ethNetConf
 * @param dlgtRequest
 * @param stellarPK
 * @param _signature
 * @param opts
 */
exports.submitEd25519Delegation = (ethNetConf, dlgtRequest, stellarPK, _signature, opts) => __awaiter(this, void 0, void 0, function* () {
    const signature = svUtils.toEthHex(_signature);
    assert.equal(signature.length, 64 * 2 + 2, 'Invalid signature, should be a 64 byte string');
    assert.equal(dlgtRequest.length, 32 * 2 + 2, 'Invalid dlgtRequest, should be 32 byte hex string');
    assert.equal(stellarPK.length, 56, 'Invalid pubKey - must be Stellar base32 encoded PK - length 56');
    // Todo - eventually use SvNetwork to determine what needs to go with the request
    const { svApiUrl } = ethNetConf;
    const delegationRequest = {
        signature: signature,
        publickey: stellarPK,
        packed: dlgtRequest,
        subgroupVersion: 1,
        broadcast: opts && opts.broadcast === false ? false : true
    };
    return yield API.postEd25519Delegation(ethNetConf, delegationRequest);
});
exports.signTx = (web3, txData, privKey) => __awaiter(this, void 0, void 0, function* () {
    return yield web3.eth.accounts.signTransaction(txData, privKey);
});
exports.publishSignedTx = (web3, rawTx) => __awaiter(this, void 0, void 0, function* () {
    return yield web3.eth.sendSignedTransaction(rawTx).then(r => r.transactionHash);
});
//# sourceMappingURL=light.js.map