import React, { Component } from 'react';
import apiInstance from '../../../axios-test';
import MatchPlayers from './MatchPlayers/MatchPlayers';

class Match extends Component {

  state={
    matchData: null
  }

  convertToMatchData(matchData) {
    matchData.players.forEach(player => {
      player.goals = [];
      player.bookings = [];

      const booking = matchData.statisticsIncidences.bookings.find(b => b.player.playerId === player.playerId);
      if (booking) {
        player.bookings.push(booking);
      }

      const goal = matchData.statisticsIncidences.goals.find(g => g.player.playerId === player.playerId);
      if (goal) {
        player.goals.push(goal);
      }

      const substitutionIn = matchData.statisticsIncidences.substitutions
      .find(substitution => substitution.playerIn.playerId === player.playerId);
      if (substitutionIn) {
        player.substitutionIn = substitutionIn;
      }

      const substitutionOut = matchData.statisticsIncidences.substitutions
      .find(substitution => substitution.playerOut.playerId === player.playerId);
      if (substitutionOut) {
        player.substitutionOut = substitutionOut;
      }
    });

    return matchData;
  }

  constructor(props) {
    super(props);
    apiInstance.get('competition/match/'+props.match.params.id).then(response => {
        this.setState({
          matchData: this.convertToMatchData(response.data)
        });
      });
  }

  render() {

    let matchData = null;
    if (this.state.matchData) {
      matchData = <div className="row">
      <div className="col-sm-5">
        <div className="text-center" style={{ backgroundColor:'blueviolet', color:'white'}}>
          <h1>{this.state.matchData.matchGeneralInfo.localTeam.name}</h1>
        </div>
        <MatchPlayers matchPlayers={this.state.matchData.players} team={this.state.matchData.matchGeneralInfo.localTeam} ></MatchPlayers>
      </div>
      <div className="col-sm-2 text-center">
        <h1 style={{backgroundColor:'black', color:'white'}}>
          {this.state.matchData.matchGeneralInfo.goalsLocal} - {this.state.matchData.matchGeneralInfo.goalsVisitor}
        </h1>
      </div>
      <div className="col-sm-5">
        <div className="text-center" style={{backgroundColor:'blueviolet', color:'white'}}>
          <h1>{this.state.matchData.matchGeneralInfo.visitorTeam.name}</h1>
        </div>  
        <MatchPlayers matchPlayers={this.state.matchData.players} team={this.state.matchData.matchGeneralInfo.visitorTeam} ></MatchPlayers>
      </div>
    </div>
    }

    return (
        <div >
          <h1>Match details</h1>
          {matchData}
        </div>
    )
  }
}

export default Match;