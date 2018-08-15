const BN = require('bn.js')
import * as Account from 'eth-lib/lib/account'

import * as _const from '../src/const'
import * as bb from '../src/ballotBox'
import { ethAddrEq } from '../src/utils';

test('mkPacked works as expected', () => {
    const p1 = bb.mkPacked(1, 2, 7)
    expect(p1).toEqual(new BN('0700000000000000010000000000000002', 16))

    const p2 = bb.mkPacked(0x33445566, 0xaabbccdd, bb.mkSubmissionBits(bb.flags.USE_ENC, bb.flags.USE_TESTING, bb.flags.USE_ETH))
    expect(p2).toEqual(new BN('8009000000003344556600000000aabbccdd', 16))
})

test('create and verify proxy ballots', () => {
    const privKey = '0x0100000000000000000000000000000000000000000000000000000000000000'
    const acct = Account.fromPrivate(privKey)
    const { address } = acct

    const proxyVoteParams = [
        '0x0000000000000000053970000000000000000000000000000000000000000000', // some ballot id
        1, // sequence num
        '0x4000000000000000000000000000000000000000000000000000000000000000', // some voteData
        '0x', // trivial extra
        privKey
    ]

    const proxyVote = bb.mkSignedBallotForProxy.apply(null, proxyVoteParams)

    if (process.env.DEBUG_PROXY_VOTE) {
        console.log('Proxy Vote generated:', JSON.stringify(proxyVote, null, 2))
        console.log('Proxy Vote params:', JSON.stringify(proxyVoteParams, null, 2))
        console.log('Address:', address)
    }

    const verificationResp = bb.verifySignedBallotForProxy(proxyVote)

    expect(ethAddrEq(verificationResp.address, address)).toBe(true)
    expect(verificationResp.verified).toEqual(true)
})

test('generates correct range3 voteData', () => {
    // trivial case
    expect(bb.genRange3VoteData([])).toEqual(_const.zeroHash)

    // format for binary-no votes
    expect(bb.genRange3VoteData([-1])).toEqual('0x4000000000000000000000000000000000000000000000000000000000000000')

    // format for binary-yes votes
    expect(bb.genRange3VoteData([1])).toEqual('0x8000000000000000000000000000000000000000000000000000000000000000')

    // more complex examples

    // raw vote bits: 000 001 010 011 100 101 110
    expect(bb.genRange3VoteData([-3, -2, -1, 0, 1, 2, 3])).toEqual('0x0539700000000000000000000000000000000000000000000000000000000000')

    // 000 000 010
    expect(bb.genRange3VoteData([-3, -3, -1])).toEqual('0x0100000000000000000000000000000000000000000000000000000000000000')

    // 000 000 010 000 000 100
    expect(bb.genRange3VoteData([-3, -3, -1, -3, -3, 1])).toEqual('0x0101000000000000000000000000000000000000000000000000000000000000')

    // 000 000 100
    expect(bb.genRange3VoteData([-3, -3, 1])).toEqual('0x0200000000000000000000000000000000000000000000000000000000000000')
})

test('ballot deploys correctly', async () => {
    jest.setTimeout(25000)

    const goodBSpecString =
        '{"ballotVersion":2,"ballotInner":{"ballotTitle":"Testing","shortDesc":"Testing","longDesc":"Testing","subgroup":null,"discussionLink":null,"encryptionPK":null},"optionsVersion":2,"optionsInner":{"options":null,"aux":null},"subgroupVersion":1,"subgroupInner":{"tokenId":"testing_id_3","networkId":[42,42],"delegationSc":"0x005645072d7c244476e3099619a6089245b6a958","signature":"**SIG_1**","sigType":"ed25519","proposerPk":"GBQLUYK4AWPXZT7TUHUM3QA4XL5XUHLWXIXZP3IJDLS4QD77UASNNKGX"}}'
    const incompleteBSpecString =
        '{"ballotVersion":2,"optionsVersion":2,"optionsInner":{"options":null,"aux":null},"subgroupVersion":1,"subgroupInner":{"tokenId":"testing_id_3","networkId":[42,42],"delegationSc":"0x005645072d7c244476e3099619a6089245b6a958","signature":"**SIG_1**","sigType":"ed25519","proposerPk":"GBQLUYK4AWPXZT7TUHUM3QA4XL5XUHLWXIXZP3IJDLS4QD77UASNNKGX"}}'
    const junkString = 'thisisarandomstring'
    const bSpecJson = JSON.parse(goodBSpecString)

    const testUrl = 'https://archive.test.push.secure.vote/'

    // constant hash for the above goodBSpecString -- if that changes this will need to change also
    await expect(bb.deployBallotSpec(testUrl, goodBSpecString)).resolves.toBe(
        '0xbefb05d4714e4822b8624a0e92af3103f8500fb3b54d2e44782e19f39e939291'
    )
    await expect(bb.deployBallotSpec(testUrl, incompleteBSpecString)).rejects.toThrow()
    await expect(bb.deployBallotSpec(testUrl, junkString)).rejects.toThrow()
    await expect(bb.deployBallotSpec(testUrl, bSpecJson)).rejects.toThrow()
})
