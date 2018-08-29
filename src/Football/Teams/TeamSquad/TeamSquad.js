import React, { Component } from 'react';
import SimpleCard from './SimpleCard/SimpleCard';

const TeamSquad = props => {
  let playerList = null;

  if (props.players) {
    playerList = props.players.map(player =>
      <div key={player.playerId} className="col-md-3 col-sm-4 col-xs-6">
        <SimpleCard cardData={player}></SimpleCard>
      </div>
    )
  }

  return (
    <div>
      <h1>Team Squad</h1>
      <div className="row">
        {playerList}
      </div>
    </div>
  );
}


export default TeamSquad;