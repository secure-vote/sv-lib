import * as L from '../src/light'
import * as U from '../src/utils'
import * as C from '../src/const'
import { EthNetConf } from '../src/types'

import * as R from 'ramda'
import { ApiError } from '../src/errors'
import { AssertionError } from 'assert'

test('prepareEd25519Delegation works', () => {
    expect(L.prepareEd25519Delegation(C.zeroAddr, 'ffffff')).toBe('0x53562d45442d455448ffffff0000000000000000000000000000000000000000')
})

test('submitEd25519Delegation works', async () => {
    jest.setTimeout(10000)
    const svNetwork = C.getNetwork(42, 42)

    const testGood = {
        req: '0x53562d45442d455448d1c0fc4e5a3df47b3c46836cbd883b53098c9b5edf269a',
        pk: 'GCFEX6MYIIHNY26CHTUVOTQWNUAQ3RWOKC2DBYW2MHLYYWAUR2HGWQLX',
        sig:
            '8c060ba60acad6594058e19e8d386adc4d4e142c3c44c140b4f15a331218abf9a5a11ef5022386a2174968f88f93fc246814b1097fb793d06b376d3452157104'
    }
    const testTooLong = R.mapObjIndexed((v, k) => (k == 'pk' ? v + 'X5' : v + 'ff'), testGood)
    const testBadReqHdr = { ...testGood, req: '0x00' + testGood.req.slice(4) }

    // this should throw early due to empty EthNetConf
    await expect(L.submitEd25519Delegation({} as EthNetConf, testGood.req, testGood.pk, testGood.sig)).rejects.toThrow()

    const runBadTest = async (tObj, ErrType) =>
        await expect(L.submitEd25519Delegation(svNetwork, tObj.req, tObj.pk, tObj.sig, { broadcast: false })).rejects.toThrow(ErrType)
    await runBadTest(testTooLong, AssertionError)
    await runBadTest(testBadReqHdr, ApiError)
})

test('ABIs are imported', async () => {
    const net = C.getNetwork(42, 42)
    const svNet = await L.initializeSvLight(net)
    expect(svNet.index.methods).toBeDefined()
})
