import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const client = new ApolloClient({
  link: new HttpLink({
      uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql',
      credentials: 'same-origin'
    }),
  cache: new InMemoryCache()
});