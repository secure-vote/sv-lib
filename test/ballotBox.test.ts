const BN = require('bn.js')
import * as Account from 'eth-lib/lib/account'

import * as _const from '../src/const'
import * as bb from '../src/ballotBox'

test('mkPacked works as expected', () => {
  const p1 = bb.mkPacked(1, 2, 7)
  expect(p1).toEqual(new BN('0700000000000000010000000000000002', 16))

  const p2 = bb.mkPacked(
    0x33445566,
    0xaabbccdd,
    bb.mkSubmissionBits(
      bb.flags.USE_ENC,
      bb.flags.USE_TESTING,
      bb.flags.USE_ETH
    )
  )
  expect(p2).toEqual(new BN('8009000000003344556600000000aabbccdd', 16))
})

test('create and verify proxy ballots', () => {
  const privKey =
    '0x0100000000000000000000000000000000000000000000000000000000000000'
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

  expect(verificationResp.address.toLowerCase()).toEqual(address.toLowerCase())
  expect(verificationResp.verified).toEqual(true)
})

test('generates correct range3 voteData', () => {
  // trivial case
  expect(bb.genRange3VoteData([])).toEqual(_const.zeroHash)

  // format for binary-no votes
  expect(bb.genRange3VoteData([-1])).toEqual(
    '0x4000000000000000000000000000000000000000000000000000000000000000'
  )

  // format for binary-yes votes
  expect(bb.genRange3VoteData([1])).toEqual(
    '0x8000000000000000000000000000000000000000000000000000000000000000'
  )

  // more complex examples

  // raw vote bits: 000 001 010 011 100 101 110
  expect(bb.genRange3VoteData([-3, -2, -1, 0, 1, 2, 3])).toEqual(
    '0x0539700000000000000000000000000000000000000000000000000000000000'
  )

  // 000 000 010
  expect(bb.genRange3VoteData([-3, -3, -1])).toEqual(
    '0x0100000000000000000000000000000000000000000000000000000000000000'
  )

  // 000 000 010 000 000 100
  expect(bb.genRange3VoteData([-3, -3, -1, -3, -3, 1])).toEqual(
    '0x0101000000000000000000000000000000000000000000000000000000000000'
  )

  // 000 000 100
  expect(bb.genRange3VoteData([-3, -3, 1])).toEqual(
    '0x0200000000000000000000000000000000000000000000000000000000000000'
  )
})
