import { AxiosResponse, AxiosError, default as axios } from 'axios'

import { ApiError } from './errors'
import { EthNetConf, Ed25519DelegationResp } from './types'

export const processApiError = (err: AxiosError) => {
    throw (err.response && err.response.status === 400) && err.response.data.error ? new ApiError(err.response.data.error) : err
}

export const extractData = <T>(req: AxiosResponse<T>): T => req.data as T

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
