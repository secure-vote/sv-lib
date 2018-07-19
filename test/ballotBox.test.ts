const bb = require('../src/ballotBox')
const _const = require('../src/const')
const Account = require('eth-lib/lib/account')

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

  const proxyVote = bb.mkSignedBallotForProxy(...proxyVoteParams)

  console.log('Proxy Vote generated:', JSON.stringify(proxyVote, null, 2))
  console.log('Proxy Vote params:', JSON.stringify(proxyVoteParams, null, 2))
  console.log('Address:', address)

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
