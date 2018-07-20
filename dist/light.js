"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var eth_ens_namehash_1 = require("eth-ens-namehash");
var axios_1 = require("axios");
var bs58 = require("bs58");
var sha256_1 = require("sha256");
var SvConsts = require("./const");
var SvUtils = require("./utils");
var StellarBase = require("stellar-base");
var assert = require("assert");
// Lovely ABIs
var SV_ENS_Resolver_abi_json_1 = require("./smart_contracts/SV_ENS_Resolver.abi.json");
var SVLightIndex_abi_json_1 = require("./smart_contracts/SVLightIndex.abi.json");
var SVLightIndexBackend_abi_json_1 = require("./smart_contracts/SVLightIndexBackend.abi.json");
var BBFarm_abi_json_1 = require("./smart_contracts/BBFarm.abi.json");
var SVPayments_abi_json_1 = require("./smart_contracts/SVPayments.abi.json");
var AuxAbi_abi_json_1 = require("./smart_contracts/AuxAbi.abi.json");
var CommAuctionIface_abi_json_1 = require("./smart_contracts/CommAuctionIface.abi.json");
var ERC20_abi_json_1 = require("./smart_contracts/ERC20.abi.json");
var UnsafeEd25519Delegation_abi_json_1 = require("./smart_contracts/UnsafeEd25519Delegation.abi.json");
exports.initializeSvLight = function (svConfig) { return __awaiter(_this, void 0, void 0, function () {
    var indexContractName, ensResolver, httpProvider, auxContract, Web3, web3, resolver, index, _a, _b, _c, backendAddress, backend, aux, payments, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                indexContractName = svConfig.indexContractName, ensResolver = svConfig.ensResolver, httpProvider = svConfig.httpProvider, auxContract = svConfig.auxContract;
                Web3 = require('web3');
                web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
                resolver = new web3.eth.Contract(SV_ENS_Resolver_abi_json_1.default, ensResolver);
                _b = (_a = web3.eth.Contract).bind;
                _c = [void 0, SVLightIndex_abi_json_1.default];
                return [4 /*yield*/, exports.resolveEnsAddress({ resolver: resolver }, indexContractName)];
            case 1:
                index = new (_b.apply(_a, _c.concat([_g.sent()])))();
                return [4 /*yield*/, exports.getBackendAddress({ index: index })];
            case 2:
                backendAddress = _g.sent();
                backend = new web3.eth.Contract(SVLightIndexBackend_abi_json_1.default, backendAddress);
                aux = new web3.eth.Contract(AuxAbi_abi_json_1.default, auxContract);
                _e = (_d = web3.eth.Contract).bind;
                _f = [void 0, SVPayments_abi_json_1.default];
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
exports.resolveEnsAddress = function (_a, ensName) {
    var resolver = _a.resolver;
    return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, resolver.methods.addr(eth_ens_namehash_1.default.hash(ensName)).call()];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
exports.getBackendAddress = function (_a) {
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
exports.getDemocInfo = function (_a) {
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
exports.getDemocNthBallot = function (_a, democBallotInfo) {
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
                    return [4 /*yield*/, exports.getBallotSpec(archiveUrl, ethBallotDetails.specHash)
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
exports.getBallotSpec = function (archiveUrl, ballotSpecHash) { return __awaiter(_this, void 0, void 0, function () {
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
                exports.getBallotObjectFromIpfs(ballotSpecHash).then(doRes);
                setTimeout(function () {
                    if (!done) {
                        exports.getBallotObjectFromS3(archiveUrl, ballotSpecHash)
                            .then(doRes)
                            .catch(rej);
                    }
                }, 3500);
            })];
    });
}); };
exports.getBallotObjectFromS3 = function (archiveUrl, ballotSpecHash) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, axios_1.default.get(archiveUrl + ballotSpecHash + '.json')];
    });
}); };
exports.getBallotObjectFromIpfs = function (ballotSpecHash) { return __awaiter(_this, void 0, void 0, function () {
    var ipfsUrl, cidHex, bytes, cid;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ipfsUrl = 'https://ipfs.infura.io/api/v0/block/get?arg=';
                cidHex = '1220' + ballotSpecHash.substr(2);
                bytes = Buffer.from(cidHex, 'hex');
                cid = bs58.encode(bytes);
                return [4 /*yield*/, axios_1.default.get(ipfsUrl + cid)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
// Take the svNetwork object and a democHash, will return all of the ballots from the democracy in an array
exports.getDemocBallots = function (_a) {
    var svNetwork = _a.svNetwork, democHash = _a.democHash;
    return __awaiter(_this, void 0, void 0, function () {
        var backend, democInfo, erc20, owner, numBallots, ballotsArray, i, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    backend = svNetwork.backend;
                    return [4 /*yield*/, exports.getDemocInfo({ backend: backend, democHash: democHash })
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
                    return [4 /*yield*/, exports.getDemocNthBallot({ svNetwork: svNetwork }, { democHash: democHash, nthBallot: i })];
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
exports.getContractAddresses = function (_a) {
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
                    return [4 /*yield*/, exports.resolveEnsAddress({ resolver: resolver }, delegationContractName)];
                case 2:
                    _b.delegationAddress = _c.sent();
                    return [4 /*yield*/, index.methods.getPayments().call()];
                case 3: return [2 /*return*/, (_b.paymentsAddress = _c.sent(),
                        _b)];
            }
        });
    });
};
exports.weiToCents = function (_a, wei) {
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
exports.getCommunityBallotPrice = function (_a, democHash) {
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
exports.checkIfAddressIsEditor = function (_a, _b) {
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
exports.getCurrentGasPrice = function () { return __awaiter(_this, void 0, void 0, function () {
    var gasStationInfo, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default.get('https://ethgasstation.info/json/ethgasAPI.json')];
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
exports.checkBallotHashBSpec = function (ballotSpec, assertSpecHash) {
    var contentHash = '0x' + sha256_1.default(JSON.stringify(ballotSpec, null, 2));
    if (assertSpecHash === contentHash) {
        return true;
    }
    else {
        return false;
    }
};
// Checks the ballot hash against a ballot global ballot object
// Does this by destructuring the specHash and data out of it
exports.checkBallotHashGBallot = function (ballotObject) {
    var data = ballotObject.data, specHash = ballotObject.specHash;
    return exports.checkBallotHashBSpec(data, specHash);
};
// Takes the name of an abi and a method name
// Returns a new ABI array with only the requested method
exports.getSingularCleanAbi = function (requestedAbiName, methodName) {
    var abiList = {
        ResolverAbi: SV_ENS_Resolver_abi_json_1.default,
        IndexAbi: SVLightIndex_abi_json_1.default,
        BackendAbi: SVLightIndexBackend_abi_json_1.default,
        BBFarmAbi: BBFarm_abi_json_1.default,
        PaymentsAbi: SVPayments_abi_json_1.default,
        AuxAbi: AuxAbi_abi_json_1.default,
        AuctionAbi: CommAuctionIface_abi_json_1.default,
        ERC20Abi: ERC20_abi_json_1.default
    };
    var selectedAbi = abiList[requestedAbiName];
    var methodObject = selectedAbi.filter(function (abi) { return abi.name == methodName; });
    return methodObject;
};
// Returns the Ed25519 delegations
// pubKey is in normal format
exports.getUnsafeEd25519delegations = function (pubKey, svNetwork) { return __awaiter(_this, void 0, void 0, function () {
    var web3, svConfig, unsafeEd25519DelegationAddr, kp, rawPubKey, hexPubKey, Ed25519Del, delegations;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                web3 = svNetwork.web3, svConfig = svNetwork.svConfig;
                unsafeEd25519DelegationAddr = svConfig.unsafeEd25519DelegationAddr;
                kp = StellarBase.Keypair.fromPublicKey(pubKey);
                rawPubKey = kp.rawPublicKey();
                hexPubKey = '0x' + rawPubKey.toString('hex');
                Ed25519Del = new web3.eth.Contract(UnsafeEd25519Delegation_abi_json_1.default, unsafeEd25519DelegationAddr);
                return [4 /*yield*/, Ed25519Del.methods
                        .getAllForPubKey(hexPubKey)
                        .call()
                        .catch(function (error) {
                        throw error;
                    })];
            case 1:
                delegations = _a.sent();
                console.log('Fresh:', delegations);
                return [2 /*return*/, delegations];
        }
    });
}); };
exports.prepareEd25519Delegation = function (sk, svNetwork) {
    var web3 = svNetwork.web3;
    var account = web3.eth.accounts.privateKeyToAccount(sk);
    var address = account.address;
    // Delegate prefix (SV-ED-ETH)
    var prefix = web3.utils.toHex(SvConsts.Ed25519DelegatePrefix);
    var nonce = null;
    do {
        nonce = web3.utils.randomHex(3).substr(2, 6);
    } while (nonce.length !== 6);
    console.log('nonce :', nonce);
    var trimmedAddress = SvUtils.cleanEthHex(address).toLowerCase();
    return "" + prefix + nonce + trimmedAddress;
};
exports.createEd25519DelegationTransaction = function (svNetwork, delRequest, pubKey, signature) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var web3 = svNetwork.web3, svConfig = svNetwork.svConfig;
                var unsafeEd25519DelegationAddr = svConfig.unsafeEd25519DelegationAddr;
                // Initialise the contract
                var Ed25519Del = new web3.eth.Contract(UnsafeEd25519Delegation_abi_json_1.default, unsafeEd25519DelegationAddr);
                // Get the hex of the public key
                var kp = StellarBase.Keypair.fromPublicKey(pubKey);
                var rawPubKey = kp.rawPublicKey();
                var hexPubKey = '0x' + rawPubKey.toString('hex');
                // All characters of the delegation turned into lower case
                // Due to inconsistency of case data returned from Ethereum
                var lowerCaseDelRequest = delRequest.toLowerCase();
                // Split the 64 bytes of the signature into an array containging 2x bytes32
                var sig1 = "0x" + signature.substring(0, 64);
                var sig2 = "0x" + signature.substring(64);
                var sigArray = [sig1, sig2];
                var addDelegation = Ed25519Del.methods.addUntrustedSelfDelegation(lowerCaseDelRequest, hexPubKey, sigArray);
                var txData = addDelegation.encodeABI();
                // Signed with testing kovan private key, no funds, not a real account by any terms (0x1337FB304Fee2F386527839Af9892101c7925623)
                web3.eth.accounts
                    .signTransaction({
                    to: unsafeEd25519DelegationAddr,
                    value: '0',
                    gas: 2000000,
                    data: txData
                }, '0xc497fac6b7d9e8dded3d0cb04d3926070969514d8d8a94f5641dcaecccb865e8')
                    .then(function (x) {
                    var rawTransaction = x.rawTransaction;
                    web3.eth
                        .sendSignedTransaction(rawTransaction)
                        .on('receipt', function (receipt) {
                        var transactionHash = receipt.transactionHash;
                        resolve(transactionHash);
                    })
                        .catch(function (error) { return reject(error); });
                })
                    .catch(function (error) { return reject(error); });
            })];
    });
}); };
exports.verifyEd25519Delegation = function (delRequest, pubKey, signature) {
    assert.equal(signature.length, 128, 'Invalid signature, should be 64 byte hex strings');
    // Create the keypair from the public key
    var kp = StellarBase.Keypair.fromPublicKey(pubKey);
    // Create a buffer from the signature
    var sigArray = SvUtils.hexToUint8Array(signature);
    var sigBuffer = Buffer.from(sigArray);
    // Verify the request against the signature
    return kp.verify(delRequest, sigBuffer);
};
//# sourceMappingURL=light.js.map