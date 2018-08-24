import React from 'react';

const MatchPlayers = ( props ) => {
  return (
    <div>
      <div>
      {props.matchPlayers.filter(player => player.teamId === props.team.id && player.start).map(player =>
        <div>{player.name}</div>
      )}
      </div>
      <hr />
      <div>
        {props.matchPlayers.filter(player => player.teamId === props.team.id && !player.start).map(player =>
          <div>{player.name}</div>
        )}
      </div>
    </div>
  )
};

export default MatchPlayers;