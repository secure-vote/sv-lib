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
const NH = require('eth-ens-namehash');
const axios_1 = require("axios");
const bs58 = require('bs58');
const sha256 = require('sha256');
const Web3 = require('web3');
const detectNetwork = require('web3-detect-network');
const web3Utils = require("web3-utils");
const StellarBase = require("stellar-base");
const assert = require("assert");
const svConst = require("./const");
const svUtils = require("./utils");
const API = require("./api");
// Lovely ABIs
const SV_ENS_Resolver_abi_json_1 = require("./smart_contracts/SV_ENS_Resolver.abi.json");
const SVLightIndex_abi_json_1 = require("./smart_contracts/SVLightIndex.abi.json");
const SVLightIndexBackend_abi_json_1 = require("./smart_contracts/SVLightIndexBackend.abi.json");
const BBFarm_abi_json_1 = require("./smart_contracts/BBFarm.abi.json");
const SVPayments_abi_json_1 = require("./smart_contracts/SVPayments.abi.json");
const AuxAbi_abi_json_1 = require("./smart_contracts/AuxAbi.abi.json");
const CommAuctionIface_abi_json_1 = require("./smart_contracts/CommAuctionIface.abi.json");
const ERC20_abi_json_1 = require("./smart_contracts/ERC20.abi.json");
const UnsafeEd25519Delegation_abi_json_1 = require("./smart_contracts/UnsafeEd25519Delegation.abi.json");
/**
 * Return contract instances and web3 needed for SvLight usage
 * @param {EthNetConf} netConf Config file for all current network
 * @returns {Promise<SvNetwork>} The SvNetwork object based on `netConf`
 */
exports.initializeSvLight = (netConf) => __awaiter(this, void 0, void 0, function* () {
    const { indexEnsName, ensResolver, httpProvider, auxContract } = netConf;
    const Web3 = require('web3');
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const resolver = new web3.eth.Contract(SV_ENS_Resolver_abi_json_1.default, ensResolver);
    // const indexAddress =
    // console.log('indexAddress :', indexAddress);
    const index = new web3.eth.Contract(SVLightIndex_abi_json_1.default, yield exports.resolveEnsAddress({ resolver }, indexEnsName));
    const backendAddress = yield exports.getBackendAddress({ index });
    const backend = new web3.eth.Contract(SVLightIndexBackend_abi_json_1.default, backendAddress);
    const aux = new web3.eth.Contract(AuxAbi_abi_json_1.default, auxContract);
    const payments = new web3.eth.Contract(SVPayments_abi_json_1.default, yield index.methods.getPayments().call());
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
    return yield resolver.methods.addr(NH.hash(ensName)).call();
});
exports.getBackendAddress = ({ index }) => __awaiter(this, void 0, void 0, function* () {
    return yield index.methods.getBackend().call();
});
exports.getDemocInfo = ({ backend, democHash }) => __awaiter(this, void 0, void 0, function* () {
    return yield backend.methods.getDInfo(democHash).call();
});
exports.getDemocNthBallot = ({ svNetwork }, democBallotInfo) => __awaiter(this, void 0, void 0, function* () {
    // Destructure and set the variables that are needed
    const { index, backend, aux, svConfig } = svNetwork;
    const { democHash, nthBallot } = democBallotInfo;
    const indexAddress = index._address;
    const backendAddress = backend._address;
    const archiveUrl = { svConfig };
    const bbFarmAndBallotId = yield aux.methods.getBBFarmAddressAndBallotId(backendAddress, indexAddress, democHash, nthBallot).call();
    const { id, bbFarmAddress } = bbFarmAndBallotId;
    const userEthAddress = '0x0000000000000000000000000000000000000000';
    const ethBallotDetails = yield aux.methods.getBallotDetails(id, bbFarmAddress, userEthAddress).call();
    const ballotSpec = yield exports.getBallotSpec(archiveUrl, ethBallotDetails.specHash);
    const ballotObject = Object.assign({}, bbFarmAndBallotId, ethBallotDetails, { data: Object.assign({}, ballotSpec.data) });
    return ballotObject;
});
exports.getBallotSpec = (archiveUrl, ballotSpecHash) => __awaiter(this, void 0, void 0, function* () {
    // TODO refactor to be a bit more elegant
    return new Promise((res, rej) => {
        let done = false;
        const doRes = obj => {
            if (!done) {
                done = true;
                res(obj);
            }
        };
        exports.getBallotObjectFromIpfs(ballotSpecHash).then(doRes);
        setTimeout(() => {
            if (!done) {
                exports.getBallotObjectFromS3(archiveUrl, ballotSpecHash)
                    .then(doRes)
                    .catch(rej);
            }
        }, 3500);
    });
});
exports.getBallotObjectFromS3 = (archiveUrl, ballotSpecHash) => __awaiter(this, void 0, void 0, function* () {
    return axios_1.default.get(archiveUrl + ballotSpecHash + '.json');
});
exports.getBallotObjectFromIpfs = (ballotSpecHash) => __awaiter(this, void 0, void 0, function* () {
    const ipfsUrl = 'https://ipfs.infura.io/api/v0/block/get?arg=';
    const cidHex = '1220' + ballotSpecHash.substr(2);
    const bytes = Buffer.from(cidHex, 'hex');
    const cid = bs58.encode(bytes);
    return yield axios_1.default.get(ipfsUrl + cid);
});
// Take the svNetwork object and a democHash, will return all of the ballots from the democracy in an array
exports.getDemocBallots = ({ svNetwork, democHash }) => __awaiter(this, void 0, void 0, function* () {
    const { backend } = svNetwork;
    const democInfo = yield exports.getDemocInfo({ backend, democHash });
    // Throw an error if the democ info is not correct
    const { erc20, owner } = democInfo;
    if (owner === '0x0000000000000000000000000000000000000000') {
        throw new Error('Democracy Hash does not resolve to a democracy');
    }
    // TODO - Work out where / how to push an errored ballot
    // Loop through and get all the ballots
    const numBallots = democInfo.nBallots;
    const ballotsArray = [];
    for (let i = 0; i < numBallots; i++) {
        ballotsArray[i] = yield exports.getDemocNthBallot({ svNetwork }, { democHash: democHash, nthBallot: i });
    }
    return ballotsArray;
});
/** Takes in the svNetwork object and returns all relevant addresses */
exports.getContractAddresses = ({ svNetwork }) => __awaiter(this, void 0, void 0, function* () {
    const { index, resolver, backend, aux, svConfig } = svNetwork;
    const { delegationContractName, lookupAddress } = svConfig;
    return {
        indexAddress: index._address,
        backendAddress: backend._address,
        auxAddress: aux._address,
        lookupAddress: lookupAddress,
        resolverAddress: resolver._address,
        communityAuctionAddress: yield index.methods.getCommAuction().call(),
        delegationAddress: yield exports.resolveEnsAddress({ resolver }, delegationContractName),
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
        ResolverAbi: SV_ENS_Resolver_abi_json_1.default,
        IndexAbi: SVLightIndex_abi_json_1.default,
        BackendAbi: SVLightIndexBackend_abi_json_1.default,
        BBFarmAbi: BBFarm_abi_json_1.default,
        PaymentsAbi: SVPayments_abi_json_1.default,
        AuxAbi: AuxAbi_abi_json_1.default,
        AuctionAbi: CommAuctionIface_abi_json_1.default,
        ERC20Abi: ERC20_abi_json_1.default
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
    const { web3, svConfig } = svNetwork;
    const { unsafeEd25519DelegationAddr } = svConfig;
    const Ed25519Del = new web3.eth.Contract(UnsafeEd25519Delegation_abi_json_1.default, unsafeEd25519DelegationAddr);
    const delegations = yield Ed25519Del.methods
        .getAllForPubKey(exports.stellarPkToHex(stellarPK))
        .call()
        .catch(error => {
        console.log('error :', error);
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
    // Delegate prefix (SV-ED-ETH)
    const prefix = svUtils.cleanEthHex(web3Utils.toHex(svConst.Ed25519DelegatePrefix));
    const _nonce = nonce && web3Utils.isHex(nonce) ? nonce : svUtils.genRandomHex(3);
    const trimmedAddress = svUtils.cleanEthHex(address);
    const dlgtPacked = `0x${prefix}${_nonce}${trimmedAddress}`.toLowerCase();
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
    const { web3, svConfig } = svNetwork;
    const { unsafeEd25519DelegationAddr } = svConfig;
    // Initialise the contract
    const Ed25519Del = new web3.eth.Contract(UnsafeEd25519Delegation_abi_json_1.default, unsafeEd25519DelegationAddr);
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
 */
exports.ed25519DelegationIsValid = (dlgtRequest, pubKey, signature) => {
    const _sig = svUtils.cleanEthHex(signature);
    assert.equal(_sig.length, 128, 'Invalid signature, should be a 64 byte hex string');
    // Create the keypair from the public key
    const kp = StellarBase.Keypair.fromPublicKey(pubKey);
    // Create a buffer from the signature
    const sigBuffer = Buffer.from(svUtils.hexToUint8Array(_sig));
    // Verify the request against the signature
    return kp.verify(dlgtRequest, sigBuffer);
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
    const requestUrl = API.submitEd25519DelegationUrl(ethNetConf);
    return yield axios_1.default
        .post(requestUrl, delegationRequest)
        .then(API.extractData)
        .catch(API.processApiError);
});
//# sourceMappingURL=light.js.map