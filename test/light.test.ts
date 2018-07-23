import * as L from '../src/light'
import * as U from '../src/utils'
import * as C from '../src/const'

test('prepareEd25519Delegation works', () => {
    expect(L.prepareEd25519Delegation(C.zeroAddr, 'ffffff')).toBe('0x53562d45442d455448ffffff0000000000000000000000000000000000000000')
})

test('submitEd25519Delegation works', async () => {
    const SvNetwork = {
        svConfig: {
            svApiUrl: 'https://api.secure.vote'
        }
    }
    const tReq = '0x53562d45442d455448d1c0fc4e5a3df47b3c46836cbd883b53098c9b5edf269a'
    const tPk = 'GCFEX6MYIIHNY26CHTUVOTQWNUAQ3RWOKC2DBYW2MHLYYWAUR2HGWQLX'
    const tSig =
        '8c060ba60acad6594058e19e8d386adc4d4e142c3c44c140b4f15a331218abf9a5a11ef5022386a2174968f88f93fc246814b1097fb793d06b376d3452157104'

    const tReqLong = '000x53562d45442d455448ffffff0000000000000000000000000000000000000000'
    const tPkLong = '00GCFEX6MYIIHNY26CHTUVOTQWNUAQ3RWOKC2DBYW2MHLYYWAUR2HGWQLXs'
    const tSigLong =
        '008c060ba60acad6594058e19e8d386adc4d4e142c3c44c140b4f15a331218abf9a5a11ef5022386a2174968f88f93fc246814b1097fb793d06b376d3452157104'

    await expect(L.submitEd25519Delegation({}, tReqLong, tPk, tSig)).rejects.toThrow()
    await expect(L.submitEd25519Delegation(SvNetwork, tReqLong, tPk, tSig)).rejects.toThrow()
    await expect(L.submitEd25519Delegation(SvNetwork, tReq, tPkLong, tSig)).rejects.toThrow()
    await expect(L.submitEd25519Delegation(SvNetwork, tReq, tPkLong, tSigLong)).rejects.toThrow()
})
