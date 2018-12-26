import React, { Component } from 'react';
import './App.css';
import Football from './Football/Football';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-boost';


class App extends Component {

  apolloClient = new ApolloClient({
    uri: `${process.env.REACT_APP_API_URL}/graphql`
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
