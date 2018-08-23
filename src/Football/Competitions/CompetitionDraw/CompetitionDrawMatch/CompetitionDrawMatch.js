import React from 'react';

const CompetitionDrawMatch = ( props ) => {

    return (
      <div class="mtch_container">
        <div class="match_unit">
          <div class="m_segment m_top winner" data-team-id="9">
              <span>
                  <a href="#">
                      <img width="25" height="25" src={props.match.localTeam.pictureLogo.url} alt={props.match.localTeam.name} />
                      <span class="truncate">{props.match.localTeam.name}</span>
                  </a>
                  <strong>{props.match.goalsLocal}</strong>
              </span>
          </div>
          <div class="m_segment m_botm loser" data-team-id="10">
              <span>
                  <a href="#">
                      <img width="25" height="25" src={props.match.visitorTeam.pictureLogo.url} alt={props.match.visitorTeam.name} />
                      <span class="truncate">{props.match.visitorTeam.name}</span>
                  </a>
                  <strong>{props.match.goalsVisitor}</strong>
              </span>
          </div>
          <div class="m_dtls">
              <a routerLink="/competitions/detail/{{competitionData.id}}/match/{{match.matchId}}">
                  <span>{props.match.date}</span>
              </a>        
          </div>
      </div>
  </div>
    )
};

export default CompetitionDrawMatch;