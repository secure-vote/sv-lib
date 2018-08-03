import axios, { AxiosResponse, AxiosError } from 'axios'

import { ApiError } from './errors'
import { EthNetConf, Ed25519DelegationResp } from './types'

export const processApiError = <T>(err: AxiosError): T => {
    throw err.response.status && err.response.status === 400 && (err.response.data as any).error ? new ApiError((err.response.data as any).error) : err
}

export const extractData = <T>(req: AxiosResponse): T => req.data as T

/**
 * Generate the submitEd25519Delegation API URL
 * @param {EthNetConf} ethNetConf
 * @returns {string} The URL for this method
 */
export const submitEd25519DelegationUrl = (netConf: EthNetConf): string => `${netConf.svApiUrl}/sv/light/submitEd25519Delegation`

export const postEd25519Delegation = async (netConf: EthNetConf, postData): Promise<Ed25519DelegationResp> => {
    return (await axios
        .post(submitEd25519DelegationUrl(netConf), postData)
        .then(extractData)
        .catch(processApiError)) as Ed25519DelegationResp
}
