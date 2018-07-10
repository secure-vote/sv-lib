const ENS = require('eth-ens-namehash');
const Constants = require('./const');
const axios = require('axios');
const bs58 = require('bs58');

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

  return {
    svConfig,
    web3,
    resolver,
    index,
    backend,
    aux
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
  console.log('bbFarmAndBallotId :', bbFarmAndBallotId);

  const { id, bbFarmAddress } = bbFarmAndBallotId;
  const userEthAddress = '0x0000000000000000000000000000000000000000';
  const ethBallotDetails = await aux.methods.getBallotDetails(id, bbFarmAddress, userEthAddress).call();

  const ballotSpec = await getBallotSpec(archiveUrl, ethBallotDetails.specHash);
  console.log('ballotSpec :', ballotSpec);
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

const getDemocBallots = async ({ svNetwork, democHash }) => {
  const { backend } = svNetwork;

  const democInfo = await getDemocInfo({ backend, democHash });
  const numBallots = democInfo.nBallots;

  // TODO - Work out where / how to push an errored ballot
  const ballotsArray = [];
  for (let i = 0; i < numBallots; i++) {
    ballotsArray[i] = await getDemocNthBallot({ svNetwork }, { democHash: democHash, nthBallot: i });
  }

  return ballotsArray;
};

module.exports = {
  initializeSvLight,
  getDemocBallots,
  getDemocNthBallot,
  getDemocInfo,
  getBackendAddress,
  resolveEnsAddress
};
