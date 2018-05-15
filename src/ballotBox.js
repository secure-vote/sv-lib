


/**
 * This object tracks the flags used for SV ballot boxes. They determine the submission
 * methods and whether ballots are tracked as binding, official, or testing.
 *
 * For more info see docs.secure.vote
 */
export const flags = {
    // flags on submission methods
    USE_ETH: 2**0,
    USE_SIGNED: 2**1,
    USE_NO_ENC: 2**2,
    USE_ENC: 2**3,

    // other ballot settings
    IS_BINDING: 2**13,
    IS_OFFICIAL: 2**14,
    USE_TESTING: 2**15,
}
