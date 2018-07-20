import * as L from '../src/light'
import * as U from '../src/utils'
import * as C from '../src/const'

test('prepareEd25519Delegation works', () => {
    expect(L.prepareEd25519Delegation(C.zeroAddr, 'ffffff')).toBe('0x53562d45442d455448ffffff0000000000000000000000000000000000000000')
})
