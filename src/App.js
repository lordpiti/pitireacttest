import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Football from './Football/Football';
import aaa from './axios-test';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {

  constructor(props){
    super(props);
    aaa.get('team/teams/').then(data => {
      console.log(data);
    })
  }

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

  render() {
    return (
      <BrowserRouter>
          <Football></Football>
      </BrowserRouter>
    );
  }
}

export default App;
