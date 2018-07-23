import NH from 'eth-ens-namehash'
import axios from 'axios'
import * as bs58 from 'bs58'
import sha256 from 'sha256'
import * as SvConsts from './const'
import * as SvUtils from './utils'
import * as StellarBase from 'stellar-base'
import * as assert from 'assert'
import * as detectNetwork from 'web3-detect-network'

// Lovely ABIs
import ResolverAbi from './smart_contracts/SV_ENS_Resolver.abi.json'
import IndexAbi from './smart_contracts/SVLightIndex.abi.json'
import BackendAbi from './smart_contracts/SVLightIndexBackend.abi.json'
import BBFarmAbi from './smart_contracts/BBFarm.abi.json'
import PaymentsAbi from './smart_contracts/SVPayments.abi.json'
import AuxAbi from './smart_contracts/AuxAbi.abi.json'
import AuctionAbi from './smart_contracts/CommAuctionIface.abi.json'
import ERC20Abi from './smart_contracts/ERC20.abi.json'
import UnsafeEd25519DelegationAbi from './smart_contracts/UnsafeEd25519Delegation.abi.json'

export const initializeSvLight = async svConfig => {
    const {
        indexContractName,
        ensResolver,
        httpProvider,
        auxContract
    } = svConfig

    const Web3 = require('web3')

    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider))
    const resolver = new web3.eth.Contract(ResolverAbi, ensResolver)

    // const indexAddress =
    // console.log('indexAddress :', indexAddress);
    const index = new web3.eth.Contract(
        IndexAbi,
        await resolveEnsAddress({ resolver }, indexContractName)
    )
    const backendAddress = await getBackendAddress({ index })
    const backend = new web3.eth.Contract(BackendAbi, backendAddress)
    const aux = new web3.eth.Contract(AuxAbi, auxContract)
    const payments = new web3.eth.Contract(
        PaymentsAbi,
        await index.methods.getPayments().call()
    )

    return {
        svConfig,
        web3,
        resolver,
        index,
        backend,
        aux,
        payments
    }
}

export const initializeWindowWeb3 = async () => {
    const Web3 = require('web3')
    const detectNetwork = require('web3-detect-network')
    const windowWeb3 = (<any>window).web3
    const _detected = typeof windowWeb3 !== 'undefined'
    if (!_detected) {
        return { detected: false, loaded: true }
    }
    const network = await detectNetwork(windowWeb3.currentProvider)
    const _supported = network.id == 1 || network.id == 42
    const networkStatus = {
        id: network.id,
        type: network.type,
        supported: _supported
    }
    if (_detected && _supported) {
        // Web3 exists and is on a supported network
        const web3Instance = new Web3(windowWeb3.currentProvider)
        return {
            detected: true,
            loaded: true,
            network: networkStatus,
            web3: web3Instance
        }
    } else if (_detected) {
        // Web3 is detected, but on an unsupported or unknown network
        return {
            network: networkStatus,
            detected: true,
            loaded: true
        }
    } else {
        // Web3 not detected at all.
        return {
            detected: false,
            loaded: true
        }
    }
}

export const resolveEnsAddress = async ({ resolver }, ensName) => {
    return await resolver.methods.addr(NH.hash(ensName)).call()
}

export const getBackendAddress = async ({ index }) => {
    return await index.methods.getBackend().call()
}

export const getDemocInfo = async ({ backend, democHash }) => {
    return await backend.methods.getDInfo(democHash).call()
}

export const getDemocNthBallot = async ({ svNetwork }, democBallotInfo) => {
    // Destructure and set the variables that are needed
    const { index, backend, aux, svConfig } = svNetwork
    const { democHash, nthBallot } = democBallotInfo
    const indexAddress = index._address
    const backendAddress = backend._address
    const archiveUrl = { svConfig }

    const bbFarmAndBallotId = await aux.methods
        .getBBFarmAddressAndBallotId(
            backendAddress,
            indexAddress,
            democHash,
            nthBallot
        )
        .call()
    // console.log('bbFarmAndBallotId :', bbFarmAndBallotId);

    const { id, bbFarmAddress } = bbFarmAndBallotId
    const userEthAddress = '0x0000000000000000000000000000000000000000'
    const ethBallotDetails = await aux.methods
        .getBallotDetails(id, bbFarmAddress, userEthAddress)
        .call()

    const ballotSpec = await getBallotSpec(
        archiveUrl,
        ethBallotDetails.specHash
    )
    // console.log('ballotSpec :', ballotSpec);
    // .then(x => console.log('Then called', x))
    // .catch(x => console.log('Caught error', x));

    const ballotObject = {
        ...bbFarmAndBallotId,
        ...ethBallotDetails,
        data: { ...ballotSpec.data }
    }

    return ballotObject
}

export const getBallotSpec = async (
    archiveUrl,
    ballotSpecHash
): Promise<{ data: any }> => {
    // TODO refactor to be a bit more elegant
    return new Promise<{ data: any }>((res, rej) => {
        let done = false
        const doRes = obj => {
            if (!done) {
                done = true
                res(obj)
            }
        }
        getBallotObjectFromIpfs(ballotSpecHash).then(doRes)
        setTimeout(() => {
            if (!done) {
                getBallotObjectFromS3(archiveUrl, ballotSpecHash)
                    .then(doRes)
                    .catch(rej)
            }
        }, 3500)
    })
}

export const getBallotObjectFromS3 = async (archiveUrl, ballotSpecHash) => {
    return axios.get(archiveUrl + ballotSpecHash + '.json')
}

export const getBallotObjectFromIpfs = async ballotSpecHash => {
    const ipfsUrl = 'https://ipfs.infura.io/api/v0/block/get?arg='
    const cidHex = '1220' + ballotSpecHash.substr(2)
    const bytes = Buffer.from(cidHex, 'hex')
    const cid = bs58.encode(bytes)
    return await axios.get(ipfsUrl + cid)
}

// Take the svNetwork object and a democHash, will return all of the ballots from the democracy in an array
export const getDemocBallots = async ({ svNetwork, democHash }) => {
    const { backend } = svNetwork
    const democInfo = await getDemocInfo({ backend, democHash })

    // Throw an error if the democ info is not correct
    const { erc20, owner } = democInfo
    if (owner === '0x0000000000000000000000000000000000000000') {
        throw new Error('Democracy Hash does not resolve to a democracy')
    }

    // TODO - Work out where / how to push an errored ballot
    // Loop through and get all the ballots
    const numBallots = democInfo.nBallots
    const ballotsArray = []
    for (let i = 0; i < numBallots; i++) {
        ballotsArray[i] = await getDemocNthBallot(
            { svNetwork },
            { democHash: democHash, nthBallot: i }
        )
    }

    return ballotsArray
}

/** Takes in the svNetwork object and returns all relevant addresses */
export const getContractAddresses = async ({ svNetwork }) => {
    const { index, resolver, backend, aux, svConfig } = svNetwork
    const { delegationContractName, lookupAddress } = svConfig

    return {
        indexAddress: index._address,
        backendAddress: backend._address,
        auxAddress: aux._address,
        lookupAddress: lookupAddress,
        resolverAddress: resolver._address,
        communityAuctionAddress: await index.methods.getCommAuction().call(),
        delegationAddress: await resolveEnsAddress(
            { resolver },
            delegationContractName
        ),
        paymentsAddress: await index.methods.getPayments().call()
    }
}

export const weiToCents = async ({ payments }, wei) => {
    return await payments.methods.weiToCents(wei).call()
}

export const getCommunityBallotPrice = async ({ payments }, democHash) => {
    return await payments.methods.getNextPrice(democHash).call()
}

export const checkIfAddressIsEditor = async (
    { svNetwork },
    { userAddress, democHash }
) => {
    const { backend } = svNetwork
    return await backend.methods.isDEditor(democHash, userAddress).call()
}

// Checks the current ethereum gas price and returns a couple of values
export const getCurrentGasPrice = async () => {
    const gasStationInfo = await axios.get(
        'https://ethgasstation.info/json/ethgasAPI.json'
    )
    const { data } = gasStationInfo

    return {
        safeLow: data.safeLow / 10,
        average: data.average / 10,
        fast: data.fast / 10,
        fastest: data.fastest / 10
    }
}
// Checks the ballot hash against the ballot content
export const checkBallotHashBSpec = (ballotSpec, assertSpecHash) => {
    let contentHash = '0x' + sha256(JSON.stringify(ballotSpec, null, 2))
    if (assertSpecHash === contentHash) {
        return true
    } else {
        return false
    }
}

// Checks the ballot hash against a ballot global ballot object
// Does this by destructuring the specHash and data out of it
export const checkBallotHashGBallot = ballotObject => {
    const { data, specHash } = ballotObject
    return checkBallotHashBSpec(data, specHash)
}

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
    }

    const selectedAbi = abiList[requestedAbiName]
    const methodObject = selectedAbi.filter(abi => abi.name == methodName)
    return methodObject
}

// Returns the Ed25519 delegations
// pubKey is in normal format
export const getUnsafeEd25519delegations = async (
    pubKey: string,
    svNetwork: any
) => {
    // TODO - Some assertions and stuff..

    const { web3, svConfig } = svNetwork
    const { unsafeEd25519DelegationAddr } = svConfig

    // Get the hex pub key
    const kp = StellarBase.Keypair.fromPublicKey(pubKey)
    const rawPubKey = kp.rawPublicKey()
    const hexPubKey = '0x' + rawPubKey.toString('hex')

    const Ed25519Del = new web3.eth.Contract(
        UnsafeEd25519DelegationAbi,
        unsafeEd25519DelegationAddr
    )
    const delegations = await Ed25519Del.methods
        .getAllForPubKey(hexPubKey)
        .call()
        .catch(error => {
            throw error
        })

    console.log('Fresh:', delegations)

    return delegations
}

export const prepareEd25519Delegation = (sk: string, svNetwork: any) => {
    const { web3 } = svNetwork
    const account = web3.eth.accounts.privateKeyToAccount(sk)
    const address = account.address

    // Delegate prefix (SV-ED-ETH)
    const prefix = web3.utils.toHex(SvConsts.Ed25519DelegatePrefix)

    let nonce = null
    do {
        nonce = web3.utils.randomHex(3).substr(2, 6)
    } while (nonce.length !== 6)

    console.log('nonce :', nonce)
    const trimmedAddress = SvUtils.cleanEthHex(address).toLowerCase()

    return `${prefix}${nonce}${trimmedAddress}`
}

export const createEd25519DelegationTransaction = async (
    svNetwork: any,
    delRequest: string,
    pubKey: string,
    signature: string
) => {
    return new Promise((resolve, reject) => {
        const { web3, svConfig } = svNetwork
        const { unsafeEd25519DelegationAddr } = svConfig

        // Initialise the contract
        const Ed25519Del = new web3.eth.Contract(
            UnsafeEd25519DelegationAbi,
            unsafeEd25519DelegationAddr
        )

        // Get the hex of the public key
        const kp = StellarBase.Keypair.fromPublicKey(pubKey)
        const rawPubKey = kp.rawPublicKey()
        const hexPubKey = '0x' + rawPubKey.toString('hex')

        // All characters of the delegation turned into lower case
        // Due to inconsistency of case data returned from Ethereum
        const lowerCaseDelRequest = delRequest.toLowerCase()

        // Split the 64 bytes of the signature into an array containging 2x bytes32
        const sig1 = `0x${signature.substring(0, 64)}`
        const sig2 = `0x${signature.substring(64)}`
        const sigArray = [sig1, sig2]

        const addDelegation = Ed25519Del.methods.addUntrustedSelfDelegation(
            lowerCaseDelRequest,
            hexPubKey,
            sigArray
        )
        const txData = addDelegation.encodeABI()

        // Signed with testing kovan private key, no funds, not a real account by any terms (0x1337FB304Fee2F386527839Af9892101c7925623)
        web3.eth.accounts
            .signTransaction(
                {
                    to: unsafeEd25519DelegationAddr,
                    value: '0',
                    gas: 2000000,
                    data: txData
                },
                '0xc497fac6b7d9e8dded3d0cb04d3926070969514d8d8a94f5641dcaecccb865e8'
            )
            .then(x => {
                const { rawTransaction } = x
                web3.eth
                    .sendSignedTransaction(rawTransaction)
                    .on('receipt', receipt => {
                        const { transactionHash } = receipt
                        resolve(transactionHash)
                    })
                    .catch(error => reject(error))
            })
            .catch(error => reject(error))
    })
}

export const verifyEd25519Delegation = (
    delRequest: string,
    pubKey: string,
    signature: string
) => {
    assert.equal(
        signature.length,
        128,
        'Invalid signature, should be 64 byte hex strings'
    )

    // Create the keypair from the public key
    const kp = StellarBase.Keypair.fromPublicKey(pubKey)

    // Create a buffer from the signature
    const sigArray = SvUtils.hexToUint8Array(signature)
    const sigBuffer = Buffer.from(sigArray)

    // Verify the request against the signature
    return kp.verify(delRequest, sigBuffer)
}
