import React, { Component } from 'react';
import './App.css';
import Football from './Football/Football';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache();

const initialState = {
  counter: 0,
};
cache.writeData({ data: initialState });

class App extends Component {
  apolloClient = new ApolloClient({
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
    cache,
  });

  render() {
    return (
      <ApolloProvider client={this.apolloClient}>
        <BrowserRouter>
          <Football></Football>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
