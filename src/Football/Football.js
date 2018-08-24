import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Competitions from './Competitions/Competitions';
import Teams from './Teams/Teams';
import Players from './Players/Players';
import AppBar from './components/AppBar/AppBar';
import './Football.css';

class Football extends Component {

  state = {
      authenticationToken: localStorage.token_react
  }

  updateAuthenticationToken(token) {
    if (token){
      localStorage.setItem('token_react', token);
    }
    else {
      localStorage.removeItem('token_react');
    }
    
    this.setState({
      authenticationToken: token
    });
  }

  render () {
    return (
      <div>
        <AppBar
          authenticationToken={this.state.authenticationToken}
          onUpdateAuthenticationToken={(token) => this.updateAuthenticationToken(token) }
        />          
        <div className="Football overview-container">                    
          {/* <Route path="/" exact render={() => <h1>Home</h1>} />
          <Route path="/" render={() => <h1>Home 2</h1>} /> 
          <Route path="/" exact component={Teams} />*/}
          <Route path="/teams" component={Teams} />
          <Route path="/competitions" component={Competitions} />
          <Route path="/players" component={Players} />
        </div>
      </div>
    );
  }
}

export default Football;