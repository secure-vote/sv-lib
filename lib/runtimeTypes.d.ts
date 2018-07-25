import * as t from 'io-ts';
export declare const HexStringRT: t.RefinementType<t.StringType, string, string, t.mixed>;
export declare type HexString = t.TypeOf<typeof HexStringRT>;
export declare const Bytes32RT: t.RefinementType<t.RefinementType<t.StringType, string, string, t.mixed>, string, string, t.mixed>;
export declare type Bytes32 = t.TypeOf<typeof Bytes32RT>;
export declare const Bytes64RT: t.RefinementType<t.RefinementType<t.StringType, string, string, t.mixed>, string, string, t.mixed>;
export declare type Bytes64 = t.TypeOf<typeof Bytes64RT>;
