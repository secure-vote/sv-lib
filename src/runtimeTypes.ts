import * as t from 'io-ts'

export const HexStringRT = t.refinement(
    t.string,
    v => v.slice(0, 2) === '0x' && v.slice(2).replace(/[0-9a-fA-F]*/, '').length === 0 && v.length % 2 === 0,
    'HexString'
)
export type HexString = t.TypeOf<typeof HexStringRT>

export const Bytes32RT = t.refinement(HexStringRT, v => v.length === 32 * 2 + 2, 'Bytes32')
export type Bytes32 = t.TypeOf<typeof Bytes32RT>

export const Bytes64RT = t.refinement(HexStringRT, v => v.length === 64 * 2 + 2, 'Bytes64')
export type Bytes64 = t.TypeOf<typeof Bytes64RT>
