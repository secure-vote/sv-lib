import { AxiosResponse, AxiosError } from 'axios';
import { EthNetConf, Ed25519DelegationResp } from './types';
export declare const processApiError: (err: AxiosError) => never;
export declare const extractData: <T>(req: AxiosResponse<T>) => T;
/**
 * Generate the submitEd25519Delegation API URL
 * @param {EthNetConf} netConf
 * @returns {string} The URL for this method
 */
export declare const submitEd25519DelegationUrl: (netConf: EthNetConf) => string;
export declare const postEd25519Delegation: (netConf: EthNetConf, postData: any) => Promise<Ed25519DelegationResp>;
