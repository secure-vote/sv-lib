module.exports = {
  zeroAddr: '0x0000000000000000000000000000000000000000',
  zeroHash: '0x0000000000000000000000000000000000000000000000000000000000000000',

  networkVars: {
    kovan: {
      indexContractName: 'index.kov.sv',
      auxContract: '0x0d31706febd1b8177c722fe39432f3e47143ccd9',
      httpProvider: 'https://kovan.eth.secure.vote/tokenvote-dev',
      delegationContractName: 'delegation-2018-06-19.kov.sv',
      ensResolver: '0xc8c73829348cb15da4b0785a110017464fb8af51',
      ens: '0xd6F4f22eeC158c434b17d01f62f5dF33b108Ae93',
      etherscanLink: 'https://kovan.etherscan.io/',
      name: 'Kovan',
      archiveUrl: 'https://archive.test.secure.vote/',
      archivePushUrl: 'https://archive.test.push.secure.vote/'
    },
    mainnet: {
      indexContractName: 'index.tokenvote.eth',
      auxContract: '0xff553fe4183f27e2165299b3fc0ae8c3b5c07084',
      httpProvider: 'https://mainnet.eth.secure.vote/tokenvote',
      delegationContractName: 'delegate.secvote.eth',
      ensResolver: '0x5FfC014343cd971B7eb70732021E26C35B744cc4',
      ens: '0x314159265dd8dbb310642f98f50c066173c1259b',
      etherscanLink: 'https://etherscan.io/',
      name: 'Mainnet',
      archiveUrl: 'https://archive.secure.vote/',
      archivePushUrl: 'https://archive.push.secure.vote/'
    }
  }
};
