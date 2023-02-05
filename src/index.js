import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './components/App';

const link = createHttpLink({ uri: 'http://localhost:5000/graphql' });
const client = new ApolloClient({ link, cache: new InMemoryCache() });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
