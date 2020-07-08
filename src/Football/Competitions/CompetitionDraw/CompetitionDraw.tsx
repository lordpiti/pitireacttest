import React, { useEffect } from 'react';
import CompetitionDrawMatch from './CompetitionDrawMatch/CompetitionDrawMatch';
import './CompetitionDraw.css';
import Formatters from '../../utilities/formatters';
import { Link } from 'react-router-dom';
import { FootballState, FootballDispatch } from '../../..';
import * as actionCreators from '../../store/actions/competitionsActions';
import { getCurrentCompetitionDraw } from '../../store/reducers/competitions';
import { connect } from 'react-redux';

const CompetitionDraw = (props: any) => {
  const { draw, loadDrawData } = props;

  useEffect(() => {
    loadDrawData(props.competitionData.id);
  }, []);

  return (
    <div>
      <h3>Playoff</h3>

      {draw && (
        <div
          className='brackets_container'
          style={{ backgroundColor: '#f0f0f0' }}
        >
          <table>
            <thead>
              <tr>
                <th>
                  <span>Round of 16</span>
                </th>
                <th>
                  <span>Quarter-finals</span>
                </th>
                <th>
                  <span>Semi-finals</span>
                </th>
                <th>
                  <span>final</span>
                </th>
                <th>
                  <span>Semi-finals</span>
                </th>
                <th>
                  <span>Quarter-finals</span>
                </th>
                <th>
                  <span>Round of 16</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr id='playground'>
                <td className='round_column r_16 '>
                  {draw.eightLeft.map((match: any) => (
                    <CompetitionDrawMatch
                      key={match.matchId}
                      match={match}
                      competitionData={props.competitionData}
                    ></CompetitionDrawMatch>
                  ))}
                </td>
                <td className='round_column r_8'>
                  {draw.quarterFinalsLeft.map((match: any) => (
                    <CompetitionDrawMatch
                      key={match.matchId}
                      match={match}
                      competitionData={props.competitionData}
                    ></CompetitionDrawMatch>
                  ))}
                </td>
                <td className='round_column r_4'>
                  <CompetitionDrawMatch
                    match={draw.semifinalsLeft}
                    competitionData={props.competitionData}
                  ></CompetitionDrawMatch>
                </td>
                <td className='round_column r_2 final'>
                  <div className='winner_team'>
                    <span>
                      WINNER
                      <a href='#'>
                        <img
                          width='25'
                          height='25'
                          src={
                            draw.final.goalsLocal > draw.final.goalsVisitor
                              ? draw.final.localTeam.pictureLogo.url
                              : draw.final.visitorTeam.pictureLogo.url
                          }
                          alt={draw.final.localTeam.name}
                        />
                        <span>
                          {draw.final.goalsLocal > draw.final.goalsVisitor
                            ? draw.final.localTeam.name
                            : draw.final.visitorTeam.name}
                        </span>
                      </a>
                    </span>
                  </div>
                  <div className='mtch_container'>
                    <div className='match_unit'>
                      <div
                        className='m_segment m_top winner first'
                        data-team-id='9'
                      >
                        <span>
                          <a href='#'>
                            <img
                              width='25'
                              height='25'
                              src={draw.final.localTeam.pictureLogo.url}
                              alt={draw.final.localTeam.name}
                            />
                            <span className='truncate'>
                              {draw.final.localTeam.name}
                            </span>
                          </a>
                          <strong>{draw.final.goalsLocal}</strong>
                        </span>
                      </div>
                      <div
                        className='m_segment m_botm winner second'
                        data-team-id='2'
                      >
                        <span>
                          <a href='#'>
                            <img
                              width='25'
                              height='25'
                              src={draw.final.visitorTeam.pictureLogo.url}
                              alt={draw.final.visitorTeam.name}
                            />
                            <span className='truncate'>
                              {draw.final.visitorTeam.name}
                            </span>
                          </a>
                          <strong>{draw.final.goalsVisitor}</strong>
                        </span>
                      </div>
                      <div className='m_dtls'>
                        <Link
                          to={{
                            pathname: `/competitions/competition-details/${props.competitionData.id}/competition-rounds/match/${draw.final.matchId}`,
                          }}
                        >
                          <span>{Formatters.formatDate(draw.final.date)}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </td>
                <td className='round_column r_4 reversed'>
                  <CompetitionDrawMatch
                    match={draw.semifinalsRight}
                    competitionData={props.competitionData}
                  ></CompetitionDrawMatch>
                </td>
                <td className='round_column r_8 reversed'>
                  {draw.quarterFinalsRight.map((match: any) => (
                    <CompetitionDrawMatch
                      key={match.matchId}
                      match={match}
                      competitionData={props.competitionData}
                    ></CompetitionDrawMatch>
                  ))}
                </td>
                <td className='round_column r_16 reversed'>
                  {draw.eightRight.map((match: any) => (
                    <CompetitionDrawMatch
                      key={match.matchId}
                      match={match}
                      competitionData={props.competitionData}
                    ></CompetitionDrawMatch>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: FootballState) => {
  return {
    draw: getCurrentCompetitionDraw(state),
  };
};

const mapDispatchToProps = (dispatch: FootballDispatch) => {
  return {
    loadDrawData: (competitionId: number) =>
      dispatch(actionCreators.loadCompetitionDraw(competitionId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionDraw);
