import React from 'react';
import { Link } from 'react-router-dom';
import Formatters from '../../../utilities/formatters';

interface CompetitionDrawMatchProps {
  match: any;
  competitionData: any;
}

const CompetitionDrawMatch = (props: CompetitionDrawMatchProps) => {
  const { match, competitionData } = props;

  return (
    <div className='mtch_container'>
      <div className='match_unit'>
        <div className='m_segment m_top winner' data-team-id='9'>
          <span>
            <Link
              to={{
                pathname: `/teams/team-details/${match.localTeam.id}`,
              }}
            >
              <img
                width='25'
                height='25'
                src={match.localTeam.pictureLogo.url}
                alt={match.localTeam.name}
              />
              <span className='truncate'>{match.localTeam.name}</span>
            </Link>
            <strong>{match.goalsLocal}</strong>
          </span>
        </div>
        <div className='m_segment m_botm loser' data-team-id='10'>
          <span>
            <Link
              to={{
                pathname: `/teams/team-details/${match.visitorTeam.id}`,
              }}
            >
              <img
                width='25'
                height='25'
                src={match.visitorTeam.pictureLogo.url}
                alt={match.visitorTeam.name}
              />
              <span className='truncate'>{match.visitorTeam.name}</span>
            </Link>
            <strong>{match.goalsVisitor}</strong>
          </span>
        </div>
        <div className='m_dtls'>
          <Link
            to={{
              pathname: `/competitions/competition-details/${competitionData.id}/competition-rounds/match/${match.matchId}`,
            }}
          >
            <span>{Formatters.formatDate(match.date)}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompetitionDrawMatch;
