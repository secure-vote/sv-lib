import { HexStringRT } from './../src/runtimeTypes'
import { EthNetError, HexError } from './../src/errors'
import * as u from '../src/utils'
import * as R from 'ramda'

test('hex to uint8', () => {
    expect(u.hexToUint8Array('')).toEqual(new Uint8Array([]))
    expect(u.hexToUint8Array('01')).toEqual(new Uint8Array([1]))
    expect(u.hexToUint8Array('ff')).toEqual(new Uint8Array([255]))
    expect(u.hexToUint8Array('1337')).toEqual(new Uint8Array([0x13, 0x37]))
    expect(u.hexToUint8Array('0x')).toEqual(new Uint8Array([]))
    expect(u.hexToUint8Array('0x01')).toEqual(new Uint8Array([1]))
    expect(u.hexToUint8Array('0xff')).toEqual(new Uint8Array([0xff]))
    expect(u.hexToUint8Array('0x1337')).toEqual(new Uint8Array([0x13, 0x37]))

    // prettier-ignore
    expect(u.hexToUint8Array('0xd733f86fba82cc45ea7055d0bef76af6ddcd0e40996840362995f0da764a627b'))
        .toEqual(new Uint8Array([215,51,248,111,186,130,204,69,234,112,85,208,190,247,106,246,221,205,14,64,153,104,64,54,41,149,240,218,118,74,98,123]))
})

test('netHasIndex works', () => {
    expect(u.doesNetHaveIndex(1, 1)).toBe(true)
    expect(u.doesNetHaveIndex(42, 42)).toBe(true)
    expect(u.doesNetHaveIndex(1, 61)).toBe(false)
    expect(() => u.doesNetHaveIndex(999555, 999555)).toThrow(EthNetError)
})

test('genRandomHex works', () => {
    R.map(i => {
        expect(u.genRandomHex(i).length).toBe(i * 2 + 2)
    }, R.range(0, 1000))
})

test('toEthHex works', () => {
    expect(u.toEthHex('')).toBe('0x')
    expect(u.toEthHex('0x')).toBe('0x')
    expect(u.toEthHex('ff')).toBe('0xff')
    expect(u.toEthHex('0xFF')).toBe('0xFF')
    expect(u.toEthHex('1337abcdef0101')).toBe('0x1337abcdef0101')

    const randBytes = u.genRandomHex(128)
    expect(u.toEthHex(randBytes)).toBe(randBytes)

    expect(() => u.toEthHex('0x0')).toThrow(HexError)
    expect(() => u.toEthHex('0x0g')).toThrow(HexError)
    expect(() => u.toEthHex('123')).toThrow(HexError)
    expect(() => u.toEthHex('0')).toThrow(HexError)
})
