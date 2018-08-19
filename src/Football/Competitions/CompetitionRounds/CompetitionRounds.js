import React, { Component } from 'react';
import apiInstance from '../../../axios-test';

class CompetitionRounds extends Component {

    constructor(props) {
        super(props);

        // apiInstance.get('competition/rounds/'+props.id+'/year/2009').then(response => {
        //     this.setState({
        //       playerList: response.data.playerList
        //     });
        //   });
    }

    render() {
        let playerList = null;

        // if (this.state && this.state.playerList) {
        //     playerList = this.state.playerList.map(player => 
        //         <li key={player.playerId}>
        //             {player.name}
        //         </li>
        //     )
        // }

        return (
            <div>
                <h1>Competition Rounds</h1>
                <ul>
                {playerList}
                </ul>
            </div>
        );
    }
      
}

export default CompetitionRounds;