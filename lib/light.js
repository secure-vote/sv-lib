var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const NH = require('eth-ens-namehash');
import axios from 'axios';
const bs58 = require('bs58');
const sha256 = require('sha256');
import * as SvConsts from './const';
import * as SvUtils from './utils';
import * as StellarBase from 'stellar-base';
import * as assert from 'assert';
import * as web3Utils from 'web3-utils';
// Lovely ABIs
import ResolverAbi from './smart_contracts/SV_ENS_Resolver.abi.json';
import IndexAbi from './smart_contracts/SVLightIndex.abi.json';
import BackendAbi from './smart_contracts/SVLightIndexBackend.abi.json';
import BBFarmAbi from './smart_contracts/BBFarm.abi.json';
import PaymentsAbi from './smart_contracts/SVPayments.abi.json';
import AuxAbi from './smart_contracts/AuxAbi.abi.json';
import AuctionAbi from './smart_contracts/CommAuctionIface.abi.json';
import ERC20Abi from './smart_contracts/ERC20.abi.json';
import UnsafeEd25519DelegationAbi from './smart_contracts/UnsafeEd25519Delegation.abi.json';
export const initializeSvLight = (svConfig) => __awaiter(this, void 0, void 0, function* () {
    const { indexContractName, ensResolver, httpProvider, auxContract } = svConfig;
    const Web3 = require('web3');
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const resolver = new web3.eth.Contract(ResolverAbi, ensResolver);
    // const indexAddress =
    // console.log('indexAddress :', indexAddress);
    const index = new web3.eth.Contract(IndexAbi, yield resolveEnsAddress({ resolver }, indexContractName));
    const backendAddress = yield getBackendAddress({ index });
    const backend = new web3.eth.Contract(BackendAbi, backendAddress);
    const aux = new web3.eth.Contract(AuxAbi, auxContract);
    const payments = new web3.eth.Contract(PaymentsAbi, yield index.methods.getPayments().call());
    return {
        svConfig,
        web3,
        resolver,
        index,
        backend,
        aux,
        payments
    };
});
export const initializeWindowWeb3 = () => __awaiter(this, void 0, void 0, function* () {
    const Web3 = require('web3');
    const detectNetwork = require('web3-detect-network');
    const windowWeb3 = window.web3;
    const _detected = typeof windowWeb3 !== 'undefined';
    if (!_detected) {
        return { detected: false, loaded: true };
    }
    const network = yield detectNetwork(windowWeb3.currentProvider);
    const _supported = network.id == 1 || network.id == 42;
    const networkStatus = {
        id: network.id,
        type: network.type,
        supported: _supported
    };
    if (_detected && _supported) {
        // Web3 exists and is on a supported network
        const web3Instance = new Web3(windowWeb3.currentProvider);
        return {
            detected: true,
            loaded: true,
            network: networkStatus,
            web3: web3Instance
        };
    }
    else if (_detected) {
        // Web3 is detected, but on an unsupported or unknown network
        return {
            network: networkStatus,
            detected: true,
            loaded: true
        };
    }
    else {
        // Web3 not detected at all.
        return {
            detected: false,
            loaded: true
        };
    }
});
export const resolveEnsAddress = ({ resolver }, ensName) => __awaiter(this, void 0, void 0, function* () {
    return yield resolver.methods.addr(NH.hash(ensName)).call();
});
export const getBackendAddress = ({ index }) => __awaiter(this, void 0, void 0, function* () {
    return yield index.methods.getBackend().call();
});
export const getDemocInfo = ({ backend, democHash }) => __awaiter(this, void 0, void 0, function* () {
    return yield backend.methods.getDInfo(democHash).call();
});
export const getDemocNthBallot = ({ svNetwork }, democBallotInfo) => __awaiter(this, void 0, void 0, function* () {
    // Destructure and set the variables that are needed
    const { index, backend, aux, svConfig } = svNetwork;
    const { democHash, nthBallot } = democBallotInfo;
    const indexAddress = index._address;
    const backendAddress = backend._address;
    const archiveUrl = { svConfig };
    const bbFarmAndBallotId = yield aux.methods.getBBFarmAddressAndBallotId(backendAddress, indexAddress, democHash, nthBallot).call();
    // console.log('bbFarmAndBallotId :', bbFarmAndBallotId);
    const { id, bbFarmAddress } = bbFarmAndBallotId;
    const userEthAddress = '0x0000000000000000000000000000000000000000';
    const ethBallotDetails = yield aux.methods.getBallotDetails(id, bbFarmAddress, userEthAddress).call();
    const ballotSpec = yield getBallotSpec(archiveUrl, ethBallotDetails.specHash);
    // console.log('ballotSpec :', ballotSpec);
    // .then(x => console.log('Then called', x))
    // .catch(x => console.log('Caught error', x));
    const ballotObject = Object.assign({}, bbFarmAndBallotId, ethBallotDetails, { data: Object.assign({}, ballotSpec.data) });
    return ballotObject;
});
export const getBallotSpec = (archiveUrl, ballotSpecHash) => __awaiter(this, void 0, void 0, function* () {
    // TODO refactor to be a bit more elegant
    return new Promise((res, rej) => {
        let done = false;
        const doRes = obj => {
            if (!done) {
                done = true;
                res(obj);
            }
        };
        getBallotObjectFromIpfs(ballotSpecHash).then(doRes);
        setTimeout(() => {
            if (!done) {
                getBallotObjectFromS3(archiveUrl, ballotSpecHash)
                    .then(doRes)
                    .catch(rej);
            }
        }, 3500);
    });
});
export const getBallotObjectFromS3 = (archiveUrl, ballotSpecHash) => __awaiter(this, void 0, void 0, function* () {
    return axios.get(archiveUrl + ballotSpecHash + '.json');
});
export const getBallotObjectFromIpfs = (ballotSpecHash) => __awaiter(this, void 0, void 0, function* () {
    const ipfsUrl = 'https://ipfs.infura.io/api/v0/block/get?arg=';
    const cidHex = '1220' + ballotSpecHash.substr(2);
    const bytes = Buffer.from(cidHex, 'hex');
    const cid = bs58.encode(bytes);
    return yield axios.get(ipfsUrl + cid);
});
// Take the svNetwork object and a democHash, will return all of the ballots from the democracy in an array
export const getDemocBallots = ({ svNetwork, democHash }) => __awaiter(this, void 0, void 0, function* () {
    const { backend } = svNetwork;
    const democInfo = yield getDemocInfo({ backend, democHash });
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
        ballotsArray[i] = yield getDemocNthBallot({ svNetwork }, { democHash: democHash, nthBallot: i });
    }
    return ballotsArray;
});
/** Takes in the svNetwork object and returns all relevant addresses */
export const getContractAddresses = ({ svNetwork }) => __awaiter(this, void 0, void 0, function* () {
    const { index, resolver, backend, aux, svConfig } = svNetwork;
    const { delegationContractName, lookupAddress } = svConfig;
    return {
        indexAddress: index._address,
        backendAddress: backend._address,
        auxAddress: aux._address,
        lookupAddress: lookupAddress,
        resolverAddress: resolver._address,
        communityAuctionAddress: yield index.methods.getCommAuction().call(),
        delegationAddress: yield resolveEnsAddress({ resolver }, delegationContractName),
        paymentsAddress: yield index.methods.getPayments().call()
    };
});
export const weiToCents = ({ payments }, wei) => __awaiter(this, void 0, void 0, function* () {
    return yield payments.methods.weiToCents(wei).call();
});
export const getCommunityBallotPrice = ({ payments }, democHash) => __awaiter(this, void 0, void 0, function* () {
    return yield payments.methods.getNextPrice(democHash).call();
});
export const checkIfAddressIsEditor = ({ svNetwork }, { userAddress, democHash }) => __awaiter(this, void 0, void 0, function* () {
    const { backend } = svNetwork;
    return yield backend.methods.isDEditor(democHash, userAddress).call();
});
// Checks the current ethereum gas price and returns a couple of values
export const getCurrentGasPrice = () => __awaiter(this, void 0, void 0, function* () {
    const gasStationInfo = yield axios.get('https://ethgasstation.info/json/ethgasAPI.json');
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
export const checkBallotHashBSpec = (rawBallotSpecString, expectedSpecHash) => {
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
export const checkBallotHashGBallot = ballotObject => {
    const { data, specHash } = ballotObject;
    return checkBallotHashBSpec(data, specHash);
};
// Takes the name of an abi and a method name
// Returns a new ABI array with only the requested method
export const getSingularCleanAbi = (requestedAbiName, methodName) => {
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
export const stellarPkToHex = (pubKey) => {
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
 *
 * @param pubKey
 * @param svNetwork
 */
export const getUnsafeEd25519Delegations = (pubKey, svNetwork) => __awaiter(this, void 0, void 0, function* () {
    // TODO - Some assertions and stuff..
    const { web3, svConfig } = svNetwork;
    const { unsafeEd25519DelegationAddr } = svConfig;
    const Ed25519Del = new web3.eth.Contract(UnsafeEd25519DelegationAbi, unsafeEd25519DelegationAddr);
    const hexPubKey = stellarPkToHex(pubKey);
    const delegations = yield Ed25519Del.methods
        .getAllForPubKey(stellarPkToHex(pubKey))
        .call()
        .catch(error => {
        console.log('error :', error);
        throw error;
    });
    console.log('Fresh:', delegations);
    return delegations;
});
/**
 * Generate a packed Ed25519Delegation instruction for use with the smart contract or API
 * @param address An ethereum address to delegate to
 * @param nonce A nonce in hex that is 3 bytes (6 characters as hex)
 * @returns {Bytes32} The hex string (with 0x prefix) of the delegation instruction
 */
export const prepareEd25519Delegation = (address, nonce) => {
    // Delegate prefix (SV-ED-ETH)
    const prefix = SvUtils.cleanEthHex(web3Utils.toHex(SvConsts.Ed25519DelegatePrefix));
    const _nonce = nonce && web3Utils.isHex(nonce) ? nonce : SvUtils.genRandomHex(3);
    const trimmedAddress = SvUtils.cleanEthHex(address);
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
 * @returns {to: string, value: number, gas: number, data: string}
 */
export const createEd25519DelegationTransaction = (svNetwork, dlgtRequest, pubKey, signature, privKey) => {
    const { web3, svConfig } = svNetwork;
    const { unsafeEd25519DelegationAddr } = svConfig;
    // Initialise the contract
    const Ed25519Del = new web3.eth.Contract(UnsafeEd25519DelegationAbi, unsafeEd25519DelegationAddr);
    // Split the 64 bytes of the signature into an array containging 2x bytes32
    const sig1 = `0x${signature.slice(0, 64)}`;
    const sig2 = `0x${signature.slice(64)}`;
    const addDelegation = Ed25519Del.methods.addUntrustedSelfDelegation(dlgtRequest, stellarPkToHex(pubKey), [sig1, sig2]);
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
export const ed25519DelegationIsValid = (dlgtRequest, pubKey, signature) => {
    const _sig = SvUtils.cleanEthHex(signature);
    console.log('_sig :', _sig);
    assert.equal(_sig.length, 128, 'Invalid signature, should be a 64 byte hex string');
    // Create the keypair from the public key
    const kp = StellarBase.Keypair.fromPublicKey(pubKey);
    // Create a buffer from the signature
    const sigBuffer = Buffer.from(SvUtils.hexToUint8Array(_sig));
    // Verify the request against the signature
    return kp.verify(dlgtRequest, sigBuffer);
};
export const submitEd25519Delegation = (SvNetwork, dlgtRequest, pubKey, signature) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        assert.equal(signature.length, 128, 'Invalid signature, should be a 64 byte string');
        assert.equal(dlgtRequest.length, 66, 'Invalid dlgtRequest, should be 32 byte hex string');
        assert.equal(SvNetwork.hasOwnProperty('svConfig'), true, 'Invalid request, SvNetwork should have the property svConfig');
        assert.equal(pubKey.length, 56, 'Invalid pubKey - must be 28 bytes');
        // Todo - eventually use SvNetwork to determine what needs to go with the request
        const { svConfig } = SvNetwork;
        console.log('svConfig :', svConfig);
        const { svApiUrl } = svConfig;
        const delegationRequest = {
            signature: '0x' + signature,
            publickey: pubKey,
            packed: dlgtRequest,
            subgroupVersion: 1
        };
        const requestUrl = `${svApiUrl}/sv/light/submitEd25519Delegation`;
        axios.post(requestUrl, delegationRequest)
            .then(response => {
            const { data } = response;
            resolve(data);
        })
            .catch(error => {
            reject(error.response.data.error);
        });
    });
});
//# sourceMappingURL=light.js.map