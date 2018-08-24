import React from 'react';
import MatchPlayerSingle from './MatchPlayerSingle/MatchPlayerSingle';

const MatchPlayers = ( props ) => {
  return (
    <div>
      <div>
        {props.matchPlayers.filter(player => player.teamId === props.team.id && player.start).map(player =>
          <MatchPlayerSingle key={player.playerId} player={player} />
        )}
      </div>
      <hr />
      <div>
        {props.matchPlayers.filter(player => player.teamId === props.team.id && !player.start).map(player =>
          <MatchPlayerSingle key={player.playerId} player={player} />
        )}
      </div>
    </div>
  )
};

export default MatchPlayers;