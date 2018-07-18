const bb = require('./ballotBox')
const _const = require('./const')


test('generates correct range3 voteData', () => {
    // trivial case
    expect(bb.genRange3VoteData([])).toEqual(_const.zeroHash)

    // format for binary-no votes
    expect(bb.genRange3VoteData([-1])).toEqual("0x4000000000000000000000000000000000000000000000000000000000000000")

    // format for binary-yes votes
    expect(bb.genRange3VoteData([1])).toEqual("0x8000000000000000000000000000000000000000000000000000000000000000")

    // more complex examples

    // raw vote bits: 000 001 010 011 100 101 110
    expect(bb.genRange3VoteData([-3,-2,-1,0,1,2,3])).toEqual("0x0539700000000000000000000000000000000000000000000000000000000000")

    // 000 000 010
    expect(bb.genRange3VoteData([-3,-3,-1])).toEqual("0x0100000000000000000000000000000000000000000000000000000000000000")

    // 000 000 010 000 000 100
    expect(bb.genRange3VoteData([-3,-3,-1,-3,-3,1])).toEqual("0x0101000000000000000000000000000000000000000000000000000000000000")

    // 000 000 100
    expect(bb.genRange3VoteData([-3,-3,1])).toEqual("0x0200000000000000000000000000000000000000000000000000000000000000")
})
