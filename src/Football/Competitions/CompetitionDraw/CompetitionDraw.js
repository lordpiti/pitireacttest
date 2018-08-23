import React, { Component } from 'react';
import apiInstance from '../../../axios-test';
import CompetitionDrawMatch from './CompetitionDrawMatch/CompetitionDrawMatch';
import './CompetitionDraw.css';

class CompetitionDraw extends Component {

  state = {
    draw: null
  }

  constructor(props) {
    super(props);

    apiInstance.get('competition/' + props.competitionData.id + '/getDraw/').then(response => {
      debugger;
      this.setState({
        draw: response.data
      });
    });
   }

  render() {

    let drawContent = null;

    if (this.state.draw) {
      drawContent = <div class="brackets_container" style={{backgroundColor: '#f0f0f0'}}>
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
            <td class="round_column r_16 ">
              {this.state.draw.eightLeft.map(match =>
                <CompetitionDrawMatch match={match} competitionData={this.props.competitionData}>
                </CompetitionDrawMatch>)
              }
            </td>
            <td class="round_column r_8">
              {this.state.draw.quarterFinalsLeft.map(match =>
                <CompetitionDrawMatch match={match} competitionData={this.props.competitionData}>
                </CompetitionDrawMatch>)
              }
            </td>
            <td class="round_column r_4">
              <CompetitionDrawMatch match={this.state.draw.semifinalsLeft} competitionData={this.props.competitionData}>
              </CompetitionDrawMatch>
            </td>
            <td class="round_column r_2 final">
                <div class="winner_team">
                    <span>WINNER
                        <a href="#">
                          <img width="25" height="25" src={this.state.draw.final.goalsLocal>this.state.draw.final.goalsVisitor?this.state.draw.final.localTeam.pictureLogo.url:this.state.draw.final.visitorTeam.pictureLogo.url} alt={this.state.draw.final.localTeam.name} />
                          <span>
                              {(this.state.draw.final.goalsLocal>this.state.draw.final.goalsVisitor)?this.state.draw.final.localTeam.name:this.state.draw.final.visitorTeam.name}
                          </span>
                        </a>
                    </span>
                </div>
                <div class="mtch_container">
                    <div class="match_unit">
                        <div class="m_segment m_top winner first" data-team-id="9">
                            <span>
                                <a href="#">
                                    <img width="25" height="25" src={this.state.draw.final.localTeam.pictureLogo.url} alt={this.state.draw.final.localTeam.name} />
                                    <span class="truncate">{this.state.draw.final.localTeam.name}</span>
                                </a>
                                <strong>{this.state.draw.final.goalsLocal}</strong>
                            </span>
                        </div>
                        <div class="m_segment m_botm winner second" data-team-id="2">
                            <span>
                                <a href="#">
                                    <img width="25" height="25" src={this.state.draw.final.visitorTeam.pictureLogo.url} alt={this.state.draw.final.visitorTeam.name} />
                                    <span class="truncate">{this.state.draw.final.visitorTeam.name}</span>
                                </a>
                                <strong>{this.state.draw.final.goalsVisitor}</strong>
                            </span>
                        </div>
                        <div class="m_dtls">
                            <a routerLink="/competitions/detail/{{competitionData.id}}/match/{{draw.final.matchId}}">
                                <span>{this.state.draw.final.date}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </td>
            <td class="round_column r_4 reversed">
              <CompetitionDrawMatch match={this.state.draw.semifinalsRight} competitionData={this.props.competitionData}>
              </CompetitionDrawMatch>
            </td>
            <td class="round_column r_8 reversed">
              {this.state.draw.quarterFinalsRight.map(match =>
                <CompetitionDrawMatch match={match} competitionData={this.props.competitionData}>
                </CompetitionDrawMatch>)
              }
            </td>
            <td class="round_column r_16 reversed">
              {this.state.draw.eightRight.map(match =>
                <CompetitionDrawMatch match={match} competitionData={this.props.competitionData}>
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