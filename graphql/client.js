import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.ENDPOINT;
const graphql_client = new GraphQLClient(endpoint);

export default graphql_client;