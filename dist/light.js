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
const ENS = require('eth-ens-namehash');
const Constants = require('./const');
const axios = require('axios');
const bs58 = require('bs58');
const sha256 = require('sha256');
// Lovely ABIs
const ResolverAbi = require('./smart_contracts/SV_ENS_Resolver.abi.json');
const IndexAbi = require('./smart_contracts/SVLightIndex.abi.json');
const BackendAbi = require('./smart_contracts/SVLightIndexBackend.abi.json');
const BBFarmAbi = require('./smart_contracts/BBFarm.abi.json');
const PaymentsAbi = require('./smart_contracts/SVPayments.abi.json');
const AuxAbi = require('./smart_contracts/AuxAbi.abi.json');
const AuctionAbi = require('./smart_contracts/CommAuctionIface.abi.json');
const ERC20Abi = require('./smart_contracts/ERC20.abi.json');
exports.initializeSvLight = (svConfig) => __awaiter(this, void 0, void 0, function* () {
    const { indexContractName, ensResolver, httpProvider, auxContract } = svConfig;
    const Web3 = require('web3');
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    const resolver = new web3.eth.Contract(ResolverAbi, ensResolver);
    // const indexAddress =
    // console.log('indexAddress :', indexAddress);
    const index = new web3.eth.Contract(IndexAbi, yield exports.resolveEnsAddress({ resolver }, indexContractName));
    const backendAddress = yield exports.getBackendAddress({ index });
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
exports.resolveEnsAddress = ({ resolver }, ensName) => __awaiter(this, void 0, void 0, function* () {
    return yield resolver.methods.addr(ENS.hash(ensName)).call();
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
    // console.log('bbFarmAndBallotId :', bbFarmAndBallotId);
    const { id, bbFarmAddress } = bbFarmAndBallotId;
    const userEthAddress = '0x0000000000000000000000000000000000000000';
    const ethBallotDetails = yield aux.methods.getBallotDetails(id, bbFarmAddress, userEthAddress).call();
    const ballotSpec = yield exports.getBallotSpec(archiveUrl, ethBallotDetails.specHash);
    // console.log('ballotSpec :', ballotSpec);
    // .then(x => console.log('Then called', x))
    // .catch(x => console.log('Caught error', x));
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
    return axios.get(archiveUrl + ballotSpecHash + '.json');
});
exports.getBallotObjectFromIpfs = (ballotSpecHash) => __awaiter(this, void 0, void 0, function* () {
    const ipfsUrl = 'https://ipfs.infura.io/api/v0/block/get?arg=';
    const cidHex = '1220' + ballotSpecHash.substr(2);
    const bytes = Buffer.from(cidHex, 'hex');
    const cid = bs58.encode(bytes);
    return yield axios.get(ipfsUrl + cid);
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
        paymentsAddress: yield index.methods.getPayments().call(),
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
    const gasStationInfo = yield axios.get('https://ethgasstation.info/json/ethgasAPI.json');
    const { data } = gasStationInfo;
    return {
        safeLow: data.safeLow / 10,
        average: data.average / 10,
        fast: data.fast / 10,
        fastest: data.fastest / 10,
    };
});
// Checks the ballot hash against the ballot content
exports.checkBallotHashBSpec = (ballotSpec, assertSpecHash) => {
    let contentHash = '0x' + sha256(JSON.stringify(ballotSpec, null, 2));
    if (assertSpecHash === contentHash) {
        return true;
    }
    else {
        return false;
    }
};
// Checks the ballot hash against a ballot global ballot object
// Does this by destructuring the specHash and data out of it
exports.checkBallotHashGBallot = (ballotObject) => {
    const { data, specHash } = ballotObject;
    return exports.checkBallotHashBSpec(data, specHash);
};
