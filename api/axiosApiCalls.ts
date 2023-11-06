/**
 * FILEPATH: /api/axiosApiCalls.ts
 * 
 * This module exports functions that makes generic cancelable API calls using axios.
 * 
 * @packageDocumentation
 */

import api from './axiosApi'

/**
 * Creates segments using the given parameters.
 * @param param1 - The first parameter.
 * @param param2 - The second parameter.
 * @returns A Promise that resolves to the data returned by the API.
 */
export function createItems (param1: string, param2: string) {
  return api.post('/api/path',{param2: param2, param1: param1}).then(res => res.data)
}



