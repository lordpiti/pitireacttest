import React, { Component } from 'react';
import apiInstance from '../../utilities/axios-test';
import SimpleCard from './SimpleCard/SimpleCard';

class TeamSquad extends Component {

  constructor(props) {
    super(props);

    apiInstance.get('team/teams/'+props.id+'/year/2009').then(response => {
      this.setState({
        playerList: response.data.playerList
      });
    });
  }

  render() {
    let playerList = null;

    if (this.state && this.state.playerList) {
      playerList = this.state.playerList.map(player =>
        <div key={player.playerId} className="col-md-3 col-sm-4 col-xs-6">
          <SimpleCard cardData={player}></SimpleCard>
        </div>
      )
    }

    return (
      <div>
        <h1>team squad</h1>
        <div className="row">
          {playerList}
        </div>
      </div>
    );
  }
      
}

export default TeamSquad;