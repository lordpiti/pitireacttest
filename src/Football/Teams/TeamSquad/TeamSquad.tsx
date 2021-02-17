import SimpleCard from './SimpleCard/SimpleCard';
import './TeamSquad.scss';

export interface TeamSquadProps {
  players: any[];
}

const TeamSquad = (props: TeamSquadProps) => {
  return (
    <div>
      <h1>Team Squad</h1>
      <div className='team-squad'>
        {props.players &&
          props.players.map((player) => (
            <SimpleCard key={player.playerId} cardData={player}></SimpleCard>
          ))}
      </div>
    </div>
  );
};

export default TeamSquad;
