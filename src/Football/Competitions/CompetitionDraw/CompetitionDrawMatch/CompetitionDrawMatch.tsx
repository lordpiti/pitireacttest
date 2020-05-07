import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Formatters from '../../../utilities/formatters';

interface CompetitionDrawMatchProps {
  match: any;
  competitionData: any;
}

const CompetitionDrawMatch = (props: CompetitionDrawMatchProps) => {
  return (
    <div className='mtch_container'>
      <div className='match_unit'>
        <div className='m_segment m_top winner' data-team-id='9'>
          <span>
            <Link
              to={{
                pathname: `/teams/team-details/${props.match.localTeam.id}`,
              }}
            >
              <img
                width='25'
                height='25'
                src={props.match.localTeam.pictureLogo.url}
                alt={props.match.localTeam.name}
              />
              <span className='truncate'>{props.match.localTeam.name}</span>
            </Link>
            <strong>{props.match.goalsLocal}</strong>
          </span>
        </div>
        <div className='m_segment m_botm loser' data-team-id='10'>
          <span>
            <Link
              to={{
                pathname: `/teams/team-details/${props.match.visitorTeam.id}`,
              }}
            >
              <img
                width='25'
                height='25'
                src={props.match.visitorTeam.pictureLogo.url}
                alt={props.match.visitorTeam.name}
              />
              <span className='truncate'>{props.match.visitorTeam.name}</span>
            </Link>
            <strong>{props.match.goalsVisitor}</strong>
          </span>
        </div>
        <div className='m_dtls'>
          <Link
            to={{
              pathname: `/competitions/competition-details/${props.competitionData.id}/competition-rounds/match/${props.match.matchId}`,
            }}
          >
            <span>{Formatters.formatDate(props.match.date)}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompetitionDrawMatch;
