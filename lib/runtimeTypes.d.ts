import * as t from 'io-ts';
export declare const HexString: t.RefinementType<t.StringType, string, string, t.mixed>;
export declare const Bytes32: t.RefinementType<t.RefinementType<t.StringType, string, string, t.mixed>, string, string, t.mixed>;
export declare const Bytes64: t.RefinementType<t.RefinementType<t.StringType, string, string, t.mixed>, string, string, t.mixed>;
