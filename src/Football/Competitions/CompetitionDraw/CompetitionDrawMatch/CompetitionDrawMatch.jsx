import React from 'react';
import Formatters from '../../../utilities/formatters';

const CompetitionDrawMatch = ( props ) => {

    return (
      <div className="mtch_container">
        <div className="match_unit">
          <div className="m_segment m_top winner" data-team-id="9">
              <span>
                  <a href="#">
                      <img width="25" height="25" src={props.match.localTeam.pictureLogo.url} alt={props.match.localTeam.name} />
                      <span className="truncate">{props.match.localTeam.name}</span>
                  </a>
                  <strong>{props.match.goalsLocal}</strong>
              </span>
          </div>
          <div className="m_segment m_botm loser" data-team-id="10">
              <span>
                  <a href="#">
                      <img width="25" height="25" src={props.match.visitorTeam.pictureLogo.url} alt={props.match.visitorTeam.name} />
                      <span className="truncate">{props.match.visitorTeam.name}</span>
                  </a>
                  <strong>{props.match.goalsVisitor}</strong>
              </span>
          </div>
          <div className="m_dtls">
              <a routerLink="/competitions/detail/{{competitionData.id}}/match/{{match.matchId}}">
                  <span>{Formatters.formatDate(props.match.date)}</span>
              </a>        
          </div>
      </div>
  </div>
    )
};

export default CompetitionDrawMatch;