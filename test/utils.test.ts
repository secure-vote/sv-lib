import * as u from '../src/utils'

test('hex to uint8', () => {
    expect(u.hexToUint8Array('')).toEqual(new Uint8Array([]))
    expect(u.hexToUint8Array('01')).toEqual(new Uint8Array([1]))
    expect(u.hexToUint8Array('ff')).toEqual(new Uint8Array([255]))
    expect(u.hexToUint8Array('1337')).toEqual(new Uint8Array([0x13, 0x37]))
    expect(u.hexToUint8Array('0x')).toEqual(new Uint8Array([]))
    expect(u.hexToUint8Array('0x01')).toEqual(new Uint8Array([1]))
    expect(u.hexToUint8Array('0xff')).toEqual(new Uint8Array([0xff]))
    expect(u.hexToUint8Array('0x1337')).toEqual(new Uint8Array([0x13, 0x37]))

    expect(
        u.hexToUint8Array(
            '0xd733f86fba82cc45ea7055d0bef76af6ddcd0e40996840362995f0da764a627b'
        )
    ).toEqual(
        new Uint8Array([
            215,
            51,
            248,
            111,
            186,
            130,
            204,
            69,
            234,
            112,
            85,
            208,
            190,
            247,
            106,
            246,
            221,
            205,
            14,
            64,
            153,
            104,
            64,
            54,
            41,
            149,
            240,
            218,
            118,
            74,
            98,
            123
        ])
    )
})
