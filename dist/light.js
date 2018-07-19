var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
import * as NH from 'eth-ens-namehash';
import axios from 'axios';
import * as bs58 from 'bs58';
import sha256 from 'sha256';
// Lovely ABIs
import ResolverAbi from './smart_contracts/SV_ENS_Resolver.abi.json';
import IndexAbi from './smart_contracts/SVLightIndex.abi.json';
import BackendAbi from './smart_contracts/SVLightIndexBackend.abi.json';
import PaymentsAbi from './smart_contracts/SVPayments.abi.json';
import AuxAbi from './smart_contracts/AuxAbi.abi.json';
// import * as ERC20Abi from './smart_contracts/ERC20.abi.json'
export var initializeSvLight = function (svConfig) { return __awaiter(_this, void 0, void 0, function () {
    var indexContractName, ensResolver, httpProvider, auxContract, Web3, web3, resolver, index, _a, _b, _c, backendAddress, backend, aux, payments, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                indexContractName = svConfig.indexContractName, ensResolver = svConfig.ensResolver, httpProvider = svConfig.httpProvider, auxContract = svConfig.auxContract;
                Web3 = require('web3');
                web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
                console.log('IndexAbi :', IndexAbi);
                resolver = new web3.eth.Contract(ResolverAbi, ensResolver);
                _b = (_a = web3.eth.Contract).bind;
                _c = [void 0, IndexAbi];
                return [4 /*yield*/, resolveEnsAddress({ resolver: resolver }, indexContractName)];
            case 1:
                index = new (_b.apply(_a, _c.concat([_g.sent()])))();
                return [4 /*yield*/, getBackendAddress({ index: index })];
            case 2:
                backendAddress = _g.sent();
                backend = new web3.eth.Contract(BackendAbi, backendAddress);
                aux = new web3.eth.Contract(AuxAbi, auxContract);
                _e = (_d = web3.eth.Contract).bind;
                _f = [void 0, PaymentsAbi];
                return [4 /*yield*/, index.methods.getPayments().call()];
            case 3:
                payments = new (_e.apply(_d, _f.concat([_g.sent()])))();
                return [2 /*return*/, {
                        svConfig: svConfig,
                        web3: web3,
                        resolver: resolver,
                        index: index,
                        backend: backend,
                        aux: aux,
                        payments: payments
                    }];
        }
    });
}); };
export var resolveEnsAddress = function (_a, ensName) {
    var resolver = _a.resolver;
    return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, resolver.methods.addr(NH.hash(ensName)).call()];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
export var getBackendAddress = function (_a) {
    var index = _a.index;
    return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, index.methods.getBackend().call()];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
export var getDemocInfo = function (_a) {
    var backend = _a.backend, democHash = _a.democHash;
    return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, backend.methods.getDInfo(democHash).call()];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
export var getDemocNthBallot = function (_a, democBallotInfo) {
    var svNetwork = _a.svNetwork;
    return __awaiter(_this, void 0, void 0, function () {
        var index, backend, aux, svConfig, democHash, nthBallot, indexAddress, backendAddress, archiveUrl, bbFarmAndBallotId, id, bbFarmAddress, userEthAddress, ethBallotDetails, ballotSpec, ballotObject;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    index = svNetwork.index, backend = svNetwork.backend, aux = svNetwork.aux, svConfig = svNetwork.svConfig;
                    democHash = democBallotInfo.democHash, nthBallot = democBallotInfo.nthBallot;
                    indexAddress = index._address;
                    backendAddress = backend._address;
                    archiveUrl = { svConfig: svConfig };
                    return [4 /*yield*/, aux.methods
                            .getBBFarmAddressAndBallotId(backendAddress, indexAddress, democHash, nthBallot)
                            .call()
                        // console.log('bbFarmAndBallotId :', bbFarmAndBallotId);
                    ];
                case 1:
                    bbFarmAndBallotId = _b.sent();
                    id = bbFarmAndBallotId.id, bbFarmAddress = bbFarmAndBallotId.bbFarmAddress;
                    userEthAddress = '0x0000000000000000000000000000000000000000';
                    return [4 /*yield*/, aux.methods
                            .getBallotDetails(id, bbFarmAddress, userEthAddress)
                            .call()];
                case 2:
                    ethBallotDetails = _b.sent();
                    return [4 /*yield*/, getBallotSpec(archiveUrl, ethBallotDetails.specHash)
                        // console.log('ballotSpec :', ballotSpec);
                        // .then(x => console.log('Then called', x))
                        // .catch(x => console.log('Caught error', x));
                    ];
                case 3:
                    ballotSpec = _b.sent();
                    ballotObject = __assign({}, bbFarmAndBallotId, ethBallotDetails, { data: __assign({}, ballotSpec.data) });
                    return [2 /*return*/, ballotObject];
            }
        });
    });
};
export var getBallotSpec = function (archiveUrl, ballotSpecHash) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // TODO refactor to be a bit more elegant
        return [2 /*return*/, new Promise(function (res, rej) {
                var done = false;
                var doRes = function (obj) {
                    if (!done) {
                        done = true;
                        res(obj);
                    }
                };
                getBallotObjectFromIpfs(ballotSpecHash).then(doRes);
                setTimeout(function () {
                    if (!done) {
                        getBallotObjectFromS3(archiveUrl, ballotSpecHash)
                            .then(doRes)
                            .catch(rej);
                    }
                }, 3500);
            })];
    });
}); };
export var getBallotObjectFromS3 = function (archiveUrl, ballotSpecHash) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, axios.get(archiveUrl + ballotSpecHash + '.json')];
    });
}); };
export var getBallotObjectFromIpfs = function (ballotSpecHash) { return __awaiter(_this, void 0, void 0, function () {
    var ipfsUrl, cidHex, bytes, cid;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ipfsUrl = 'https://ipfs.infura.io/api/v0/block/get?arg=';
                cidHex = '1220' + ballotSpecHash.substr(2);
                bytes = Buffer.from(cidHex, 'hex');
                cid = bs58.encode(bytes);
                return [4 /*yield*/, axios.get(ipfsUrl + cid)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
// Take the svNetwork object and a democHash, will return all of the ballots from the democracy in an array
export var getDemocBallots = function (_a) {
    var svNetwork = _a.svNetwork, democHash = _a.democHash;
    return __awaiter(_this, void 0, void 0, function () {
        var backend, democInfo, erc20, owner, numBallots, ballotsArray, i, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    backend = svNetwork.backend;
                    return [4 /*yield*/, getDemocInfo({ backend: backend, democHash: democHash })
                        // Throw an error if the democ info is not correct
                    ];
                case 1:
                    democInfo = _d.sent();
                    erc20 = democInfo.erc20, owner = democInfo.owner;
                    if (owner === '0x0000000000000000000000000000000000000000') {
                        throw new Error('Democracy Hash does not resolve to a democracy');
                    }
                    numBallots = democInfo.nBallots;
                    ballotsArray = [];
                    i = 0;
                    _d.label = 2;
                case 2:
                    if (!(i < numBallots)) return [3 /*break*/, 5];
                    _b = ballotsArray;
                    _c = i;
                    return [4 /*yield*/, getDemocNthBallot({ svNetwork: svNetwork }, { democHash: democHash, nthBallot: i })];
                case 3:
                    _b[_c] = _d.sent();
                    _d.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, ballotsArray];
            }
        });
    });
};
/** Takes in the svNetwork object and returns all relevant addresses */
export var getContractAddresses = function (_a) {
    var svNetwork = _a.svNetwork;
    return __awaiter(_this, void 0, void 0, function () {
        var index, resolver, backend, aux, svConfig, delegationContractName, lookupAddress, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    index = svNetwork.index, resolver = svNetwork.resolver, backend = svNetwork.backend, aux = svNetwork.aux, svConfig = svNetwork.svConfig;
                    delegationContractName = svConfig.delegationContractName, lookupAddress = svConfig.lookupAddress;
                    _b = {
                        indexAddress: index._address,
                        backendAddress: backend._address,
                        auxAddress: aux._address,
                        lookupAddress: lookupAddress,
                        resolverAddress: resolver._address
                    };
                    return [4 /*yield*/, index.methods.getCommAuction().call()];
                case 1:
                    _b.communityAuctionAddress = _c.sent();
                    return [4 /*yield*/, resolveEnsAddress({ resolver: resolver }, delegationContractName)];
                case 2:
                    _b.delegationAddress = _c.sent();
                    return [4 /*yield*/, index.methods.getPayments().call()];
                case 3: return [2 /*return*/, (_b.paymentsAddress = _c.sent(),
                        _b)];
            }
        });
    });
};
export var weiToCents = function (_a, wei) {
    var payments = _a.payments;
    return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, payments.methods.weiToCents(wei).call()];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
export var getCommunityBallotPrice = function (_a, democHash) {
    var payments = _a.payments;
    return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, payments.methods.getNextPrice(democHash).call()];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
export var checkIfAddressIsEditor = function (_a, _b) {
    var svNetwork = _a.svNetwork;
    var userAddress = _b.userAddress, democHash = _b.democHash;
    return __awaiter(_this, void 0, void 0, function () {
        var backend;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    backend = svNetwork.backend;
                    return [4 /*yield*/, backend.methods.isDEditor(democHash, userAddress).call()];
                case 1: return [2 /*return*/, _c.sent()];
            }
        });
    });
};
// Checks the current ethereum gas price and returns a couple of values
export var getCurrentGasPrice = function () { return __awaiter(_this, void 0, void 0, function () {
    var gasStationInfo, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.get('https://ethgasstation.info/json/ethgasAPI.json')];
            case 1:
                gasStationInfo = _a.sent();
                data = gasStationInfo.data;
                return [2 /*return*/, {
                        safeLow: data.safeLow / 10,
                        average: data.average / 10,
                        fast: data.fast / 10,
                        fastest: data.fastest / 10
                    }];
        }
    });
}); };
// Checks the ballot hash against the ballot content
export var checkBallotHashBSpec = function (ballotSpec, assertSpecHash) {
    var contentHash = '0x' + sha256(JSON.stringify(ballotSpec, null, 2));
    if (assertSpecHash === contentHash) {
        return true;
    }
    else {
        return false;
    }
};
// Checks the ballot hash against a ballot global ballot object
// Does this by destructuring the specHash and data out of it
export var checkBallotHashGBallot = function (ballotObject) {
    var data = ballotObject.data, specHash = ballotObject.specHash;
    return checkBallotHashBSpec(data, specHash);
};
//# sourceMappingURL=light.js.map