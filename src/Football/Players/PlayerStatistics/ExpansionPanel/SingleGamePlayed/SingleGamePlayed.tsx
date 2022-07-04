import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import Formatters from '../../../../utilities/formatters';
import './SingleGamePlayed.scss';

export interface SingleGamePlayedProps extends RouteComponentProps {
  gamePlayed: any;
}

const SingleGamePlayed = (props: SingleGamePlayedProps) => {
  return (
    <Link
      to={`${props.match.url}/match/${props.gamePlayed.id}`}
    >
      <div className='SingleGamePlayed row'>
        <div className='col-sm-2'>{`Round ${props.gamePlayed.round}`}</div>
        <div className='col-sm-2'>
          {Formatters.formatDate(props.gamePlayed.date)}
        </div>
        <div className='col-sm-6 matchTitle'>
          {`${props.gamePlayed.localTeamName} ${props.gamePlayed.localGoals} - ${props.gamePlayed.visitorGoals} ${props.gamePlayed.visitorTeamName}`}
        </div>
      </div>
    </Link>
  );
};

export default withRouter(SingleGamePlayed);
