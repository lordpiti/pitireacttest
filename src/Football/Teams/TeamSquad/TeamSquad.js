import React, { Component } from 'react';
import apiInstance from '../../../axios-test';

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
                <li key={player.playerId}>
                    {player.name}
                </li>
            )
        }

        return (
            <div>
                <h1>team squad</h1>
                <ul>
                {playerList}
                </ul>
            </div>
        );
    }
      
}

export default TeamSquad;