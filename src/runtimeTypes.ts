import * as t from 'io-ts'
import { isAddress } from 'web3-utils'

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


export const TimestampRT = t.refinement(t.Integer, i => 1500000000 <= i && i <= 2 ** 40, 'Timestamp')
export type Timestamp = t.TypeOf<typeof TimestampRT>

export const validNetworkNames = ["mainnet", "testnet"]
export const NetworkNameRT = t.refinement(t.string, s => validNetworkNames.includes(s), 'NetworkName')
export type NetworkName = t.TypeOf<typeof NetworkNameRT>

export const EthAddressRT = t.refinement(t.string, a => isAddress(a), 'Ethereum Address')
export type EthAddress = t.TypeOf<typeof EthAddressRT>

export const StellarAddressRT = t.refinement(t.string, () => true, "Stellar Address")
export type StellarAddress = t.TypeOf<typeof StellarAddressRT>
