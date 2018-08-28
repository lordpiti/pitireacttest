import React, { Component } from 'react';
import './App.css';
import Football from './Football/Football';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-boost';


class App extends Component {

  state = {
    personList: [
      {
        name: 'Pablo',
        age: 35
      },
      {
        name: 'Stu',
        age: 36
      }
    ]
  };

  onChangeHandler = (index, event) => {
    const newName = event.target.value;

    const list = this.state.personList;
    list[index].name = newName;

    this.setState({ personList: list});
  }

  onClickHandler = (index, newAge) => {

    const list = this.state.personList;
    list[index].age = newAge;

    this.setState({ personList: list});
  };

  apolloClient = new ApolloClient({
    uri: 'https://footballsandbox.azurewebsites.net/graphql'
    //uri: 'http://localhost:57544/graphql/'
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
