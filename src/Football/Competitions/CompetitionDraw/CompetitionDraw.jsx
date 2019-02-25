import React, { Component } from 'react';
import apiInstance from '../../utilities/axios-test';
import CompetitionDrawMatch from './CompetitionDrawMatch/CompetitionDrawMatch';
import './CompetitionDraw.css';
import Formatters from '../../utilities/formatters';
import { Link } from 'react-router-dom';

class CompetitionDraw extends Component {

  state = {
    draw: null
  }

  constructor(props) {
    super(props);

    apiInstance.get('competition/' + props.competitionData.id + '/getDraw/').then(response => {
      this.setState({
        draw: response.data
      });
    });
  }

  render() {

    let drawContent = null;

    if (this.state.draw) {
      drawContent = <div className="brackets_container" style={{ backgroundColor: '#f0f0f0' }}>
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
            <tr id="playground">
              <td className="round_column r_16 ">
                {this.state.draw.eightLeft.map(match =>
                  <CompetitionDrawMatch key={match.matchId} match={match} competitionData={this.props.competitionData}>
                  </CompetitionDrawMatch>)
                }
              </td>
              <td className="round_column r_8">
                {this.state.draw.quarterFinalsLeft.map(match =>
                  <CompetitionDrawMatch key={match.matchId} match={match} competitionData={this.props.competitionData}>
                  </CompetitionDrawMatch>)
                }
              </td>
              <td className="round_column r_4">
                <CompetitionDrawMatch match={this.state.draw.semifinalsLeft} competitionData={this.props.competitionData}>
                </CompetitionDrawMatch>
              </td>
              <td className="round_column r_2 final">
                <div className="winner_team">
                  <span>WINNER
                    <a href="#">
                      <img width="25" height="25" src={this.state.draw.final.goalsLocal > this.state.draw.final.goalsVisitor ? this.state.draw.final.localTeam.pictureLogo.url : this.state.draw.final.visitorTeam.pictureLogo.url} alt={this.state.draw.final.localTeam.name} />
                      <span>
                        {(this.state.draw.final.goalsLocal > this.state.draw.final.goalsVisitor) ? this.state.draw.final.localTeam.name : this.state.draw.final.visitorTeam.name}
                      </span>
                    </a>
                  </span>
                </div>
                <div className="mtch_container">
                  <div className="match_unit">
                    <div className="m_segment m_top winner first" data-team-id="9">
                      <span>
                        <a href="#">
                          <img width="25" height="25" src={this.state.draw.final.localTeam.pictureLogo.url} alt={this.state.draw.final.localTeam.name} />
                          <span className="truncate">{this.state.draw.final.localTeam.name}</span>
                        </a>
                        <strong>{this.state.draw.final.goalsLocal}</strong>
                      </span>
                    </div>
                    <div className="m_segment m_botm winner second" data-team-id="2">
                      <span>
                        <a href="#">
                          <img width="25" height="25" src={this.state.draw.final.visitorTeam.pictureLogo.url} alt={this.state.draw.final.visitorTeam.name} />
                          <span className="truncate">{this.state.draw.final.visitorTeam.name}</span>
                        </a>
                        <strong>{this.state.draw.final.goalsVisitor}</strong>
                      </span>
                    </div>
                    <div className="m_dtls">
                      <Link to={{
                        pathname: `/competitions/competition-details/${this.props.competitionData.id}/competition-rounds/match/${this.state.draw.final.matchId}`
                      }}>
                        <span>{Formatters.formatDate(this.state.draw.final.date)}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </td>
              <td className="round_column r_4 reversed">
                <CompetitionDrawMatch match={this.state.draw.semifinalsRight} competitionData={this.props.competitionData}>
                </CompetitionDrawMatch>
              </td>
              <td className="round_column r_8 reversed">
                {this.state.draw.quarterFinalsRight.map(match =>
                  <CompetitionDrawMatch key={match.matchId} match={match} competitionData={this.props.competitionData}>
                  </CompetitionDrawMatch>)
                }
              </td>
              <td className="round_column r_16 reversed">
                {this.state.draw.eightRight.map(match =>
                  <CompetitionDrawMatch key={match.matchId} match={match} competitionData={this.props.competitionData}>
                  </CompetitionDrawMatch>)
                }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    }

    return (
      <div>
        <h3>Playoff</h3>

        {drawContent}
      </div>
    )
  };

}

export default CompetitionDraw;