# sv-lib

Library for supporting SecureVote Light apps

## Usage

`const SV = require('sv-lib');`

### `SV.utils`

`cleanEthHex`

Takes a string that should be hex, and removes the `0x` header if present.

`hexToBase32`

Takes a hex string and returns the base32 conversion using the alphabet from the `bech32` standard; though doesn't include a checksum.
This is used in serializing democracy hash prefixes.

**Note: does not conform to bech32 standard**

### `SV.ballotBox`

`flags`

An object with keys corresponding to the names for various flags. All flags are a power of 2 (so can be combined via bitwise OR).

`mkPacked`

Takes startTime, endTime, and submissionBits (should all be JS ints) and packs them for the SV Light Ballot Box.

`mkSubmissionBits`

Takes an array of flags (see SV.ballotBox.flags) and returns the submission bits. Also throws errors on badly constructed flags.

`mkSignedBallotForProxy`

Takes `ballotId`, `sequence`, `voteData`, `extra`, `privateKey`, and `opts = {}` and returns `{proxyReq, extra}` in the format required for `BBFarm.submitProxyVote(proxyReq, extra)`.

the `opts` param is optional.

### `SV.const`

Utility Constants:

* `zeroAddr` - address that's all zeros
* `zeroHash` - a `bytes32` string that's all zeros
