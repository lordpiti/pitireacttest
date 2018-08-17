import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Testlist from './Testlist/Testlist';

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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Testlist personList={this.state.personList} click={this.onClickHandler} change={this.onChangeHandler}></Testlist>
      </div>
    );
  }
}

export default App;
