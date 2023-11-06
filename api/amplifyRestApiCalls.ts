/**
 * FILEPATH: /api/amplifyRestApiCalls.ts
 * 
 * This module exports functions that make REST API calls using the AWS Amplify RestAPI module.
 * 
 * @packageDocumentation
 */

// Per the depreciation note regarding 'API' in AmplfyUse RestApi or GraphQLAPI to reduce your application bundle size
import { RestAPI } from '@aws-amplify/api-rest'

import awsmobile from '../aws-exports.js'

const apiName: string = awsmobile.aws_cloud_logic_custom[0].name;
// const apiName = 'apiEndpointName';


RestAPI.configure(awsmobile);

/* Should you wish to use a graphql api, you can use the following instead:
*  import { GraphQLAPI } from '@aws-amplify/api-graphql'
*  GraphQLAPI.configure(awsmobile)
*/

/**
 * Creates segments using the given product description and user id.
 * @param userId - The first parameter.
 * @param productDescription - The second parameter.
 * @returns A Promise that resolves to the data returned by the API.
 */
export function createItems (userId: string, productDescription: string) {
  return RestAPI.post(apiName, '/api/items',{body: {productDescription: productDescription, userId:userId}}).then((response) => response)
}