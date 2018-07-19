export var zeroAddr = "0x0000000000000000000000000000000000000000";
export var zeroHash = "0x0000000000000000000000000000000000000000000000000000000000000000";
var _raw_networkVars = {
    kovan: {
        indexContractName: "index.kov.sv",
        auxContract: "0x0d31706febd1b8177c722fe39432f3e47143ccd9",
        httpProvider: "https://kovan.eth.secure.vote/tokenvote-dev",
        delegationContractName: "delegation-2018-06-19.kov.sv",
        ensResolver: "0xc8c73829348cb15da4b0785a110017464fb8af51",
        ens: "0xd6F4f22eeC158c434b17d01f62f5dF33b108Ae93",
        etherscanLink: "https://kovan.etherscan.io/",
        name: "Kovan",
        archiveUrl: "https://archive.test.secure.vote/",
        archivePushUrl: "https://archive.test.push.secure.vote/",
        lookupAddress: "0x216265865e46D4c6FE506877EfAAE7dd7Ae2faCE"
    },
    mainnet: {
        indexContractName: "index.tokenvote.eth",
        auxContract: "0xff553fe4183f27e2165299b3fc0ae8c3b5c07084",
        httpProvider: "https://mainnet.eth.secure.vote/tokenvote",
        delegationContractName: "delegate.secvote.eth",
        ensResolver: "0x5FfC014343cd971B7eb70732021E26C35B744cc4",
        ens: "0x314159265dd8dbb310642f98f50c066173c1259b",
        etherscanLink: "https://etherscan.io/",
        name: "Mainnet",
        archiveUrl: "https://archive.secure.vote/",
        archivePushUrl: "https://archive.push.secure.vote/",
        lookupAddress: "0x216265865e46D4c6FE506877EfAAE7dd7Ae2faCE"
    },
    ropsten: {
        indexContractName: "",
        auxContract: "",
        httpProvider: "https://ropsten.eth.secure.vote/tokenvote-dev",
        delegationContractName: "",
        ensResolver: "",
        ens: "",
        etherscanLink: "https://ropsten.etherscan.io/",
        name: "Ropsten",
        archiveUrl: "https://archive.test.secure.vote/",
        archivePushUrl: "https://archive.test.push.secure.vote/",
        lookupAddress: ""
    },
    classic: {
        indexContractName: "",
        auxContract: "",
        httpProvider: "https://classic.eth.secure.vote/tokenvote-dev",
        delegationContractName: "",
        ensResolver: "",
        ens: "",
        etherscanLink: "https://gastracker.io/",
        name: "Classic",
        archiveUrl: "https://archive.secure.vote/",
        archivePushUrl: "https://archive.push.secure.vote/",
        lookupAddress: ""
    },
};
export var networkVars = new Proxy(_raw_networkVars, {
    get: function (obj, prop) {
        console.warn("Warning: const.networkVars is deprecated; please use const.getNetwork(..)");
        return obj[prop];
    }
});
export var networkName = function (networkId) {
    console.warn("Warning: const.networkName(..) is deprecated. Please use const.getNetwork(..).name");
    switch (networkId) {
        case 1:
            return "Mainnet";
        case 2:
            return "Morden";
        case 3:
            return "Ropsten";
        case 4:
            return "Rinkeby";
        case 42:
            return "Kovan";
        default:
            return "Unknown";
    }
};
export var getNetwork = function (networkId, chainId) {
    switch (networkId) {
        case 1:
            if (chainId === 1)
                return _raw_networkVars.mainnet;
            if (chainId === 61)
                return _raw_networkVars.classic;
            break;
        case 3:
            return _raw_networkVars.ropsten;
        case 42:
            return _raw_networkVars.kovan;
        default:
            break;
    }
    throw Error("Cannot find network with net_id " + networkId + " and chainId " + chainId);
};
//# sourceMappingURL=const.js.map