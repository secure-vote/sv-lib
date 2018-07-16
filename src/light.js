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

const initializeSvLight = async svConfig => {
  const { indexContractName, ensResolver, httpProvider, auxContract } = svConfig;

  const Web3 = require('web3');
  const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));

  const resolver = new web3.eth.Contract(ResolverAbi, ensResolver);

  // const indexAddress =
  // console.log('indexAddress :', indexAddress);
  const index = new web3.eth.Contract(IndexAbi, await resolveEnsAddress({ resolver }, indexContractName));
  const backendAddress = await getBackendAddress({ index });
  const backend = new web3.eth.Contract(BackendAbi, backendAddress);
  const aux = new web3.eth.Contract(AuxAbi, auxContract);
  const payments = new web3.eth.Contract(PaymentsAbi, await index.methods.getPayments().call())

  return {
    svConfig,
    web3,
    resolver,
    index,
    backend,
    aux, 
    payments
  };
};

const resolveEnsAddress = async ({ resolver }, ensName) => {
  return await resolver.methods.addr(ENS.hash(ensName)).call();
};

const getBackendAddress = async ({ index }) => {
  return await index.methods.getBackend().call();
};

const getDemocInfo = async ({ backend, democHash }) => {
  return await backend.methods.getDInfo(democHash).call();
};

const getDemocNthBallot = async ({ svNetwork }, democBallotInfo) => {
  // Destructure and set the variables that are needed
  const { index, backend, aux, svConfig } = svNetwork;
  const { democHash, nthBallot } = democBallotInfo;
  const indexAddress = index._address;
  const backendAddress = backend._address;
  const archiveUrl = { svConfig };

  const bbFarmAndBallotId = await aux.methods.getBBFarmAddressAndBallotId(backendAddress, indexAddress, democHash, nthBallot).call();
  // console.log('bbFarmAndBallotId :', bbFarmAndBallotId);

  const { id, bbFarmAddress } = bbFarmAndBallotId;
  const userEthAddress = '0x0000000000000000000000000000000000000000';
  const ethBallotDetails = await aux.methods.getBallotDetails(id, bbFarmAddress, userEthAddress).call();

  const ballotSpec = await getBallotSpec(archiveUrl, ethBallotDetails.specHash);
  // console.log('ballotSpec :', ballotSpec);
  // .then(x => console.log('Then called', x))
  // .catch(x => console.log('Caught error', x));

  const ballotObject = { ...bbFarmAndBallotId, ...ethBallotDetails, data: { ...ballotSpec.data } };

  return ballotObject;
};

const getBallotSpec = async (archiveUrl, ballotSpecHash) => {
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
          .catch(error => {
            rej(new Error(error));
          });
      }
    }, 3500);
  });
};

const getBallotObjectFromS3 = async (archiveUrl, ballotSpecHash) => {
  return axios.get(archiveUrl + ballotSpecHash + '.json');
};

const getBallotObjectFromIpfs = async ballotSpecHash => {
  const ipfsUrl = 'https://ipfs.infura.io/api/v0/block/get?arg=';
  const cidHex = '1220' + ballotSpecHash.substr(2);
  const bytes = Buffer.from(cidHex, 'hex');
  const cid = bs58.encode(bytes);
  return await axios.get(ipfsUrl + cid);
};

// Take the svNetwork object and a democHash, will return all of the ballots from the democracy in an array
const getDemocBallots = async ({ svNetwork, democHash }) => {
  const { backend } = svNetwork;
  const democInfo = await getDemocInfo({ backend, democHash });

  // Throw an error if the democ info is not correct
  const {erc20, owner} = democInfo 
  if (owner === '0x0000000000000000000000000000000000000000') {
    throw new Error('Democracy Hash does not resolve to a democracy')
  }

  // TODO - Work out where / how to push an errored ballot
  // Loop through and get all the ballots
  const numBallots = democInfo.nBallots;
  const ballotsArray = [];
  for (let i = 0; i < numBallots; i++) {
    ballotsArray[i] = await getDemocNthBallot({ svNetwork }, { democHash: democHash, nthBallot: i });
  }

  return ballotsArray;
};

// Takes in the svNetwork object and returns all relevant addresses
const getContractAddresses = async ({svNetwork}) => {
  const {index, resolver, backend, aux, svConfig} = svNetwork
  const { delegationContractName, lookupAddress } = svConfig

  return {
    indexAddress: index._address,
    backendAddress: backend._address,
    auxAddress: aux._address,
    lookupAddress: lookupAddress,
    resolverAddress: resolver._address, 
    communityAuctionAddress: await index.methods.getCommAuction().call(),
    delegationAddress: await resolveEnsAddress({ resolver }, delegationContractName),
    paymentsAddress: await index.methods.getPayments().call(),
  }
}

const weiToCents = async ({payments}, wei) => {
  return await payments.methods.weiToCents(wei).call()
}

const getCommunityBallotPrice = async ({payments}, democHash) => {
  return await payments.methods.getNextPrice(democHash).call()
}

const checkIfAddressIsEditor = async ({ svNetwork }, { userAddress, democHash }) => {
  const {backend} = svNetwork
  return await backend.methods.isDEditor(democHash, userAddress).call();
};

// Checks the current ethereum gas price and returns a couple of values
const getCurrentGasPrice = async () => {
  const gasStationInfo = await axios.get('https://ethgasstation.info/json/ethgasAPI.json')
  const {data} = gasStationInfo

  return {
    safeLow: data.safeLow / 10,
    average: data.average / 10, 
    fast: data.fast / 10, 
    fastest: data.fastest / 10,
  }
}
// Checks the ballot hash against the ballot content
const checkBallotHashBSpec = (ballotSpec, assertSpecHash) => {
    let contentHash = '0x' + sha256(JSON.stringify(ballotSpec, null, 2));
    if (assertSpecHash === contentHash) {
      return true;
    } else {
      return false;
    }
}

// Checks the ballot hash against a ballot global ballot object
// Does this by destructuring the specHash and data out of it
const checkBallotHashGBallot = (ballotObject) => {
  const {data, specHash} = ballotObject
  return checkBallotHashBSpec(data, specHash)
}

module.exports = {
  checkBallotHashGBallot,
  checkBallotHashBSpec, 
  checkIfAddressIsEditor, 
  getCommunityBallotPrice,
  getCurrentGasPrice,
  weiToCents,
  getContractAddresses,
  initializeSvLight,
  getDemocBallots,
  getDemocNthBallot,
  getDemocInfo,
  getBackendAddress,
  resolveEnsAddress
};
