import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CompetitionEvolution from './CompetitionEvolution/CompetitionEvolution';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/competitionsActions';
import './CompetitionStatistics.scss';
import { FootballDispatch, FootballState } from '../../store';
import {
  getEvolutionDataToShow,
  getTeamsFromCurrentCompetition,
} from '../../store/reducers/competitions';

function TabContainer(props: any) {
  return (
    <Typography component='div' style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class CompetitionStatistics extends Component<any, any> {
  state = {
    teamsData: null,
    currentTeamData: null,
    selectedTab: 0,
  };

  handleChange = (event: any, value: any) => {
    this.setState({ selectedTab: value });
  };

  onSelectedTeam = (teamId: number) => {
    this.props.loadCompetitionTeamEvolution(this.props.competitionId, teamId);
  };

  componentDidMount() {
    this.props.loadCompetitionTeams(1);
  }

  render() {
    let evolutionData,
      teamsData,
      currentTeamData = null;

    const statisticsData = <div>Statistics</div>;

    if (this.props.teams) {
      if (this.props.evolutionData) {
        currentTeamData = (
          <CompetitionEvolution
            displayData={this.props.evolutionData}
          ></CompetitionEvolution>
        );
      }

      teamsData = (
        <div className='row'>
          <div className='col-sm-3'>
            {this.props.teams.map((team: any) => {
              let selectedTeam = null;
              if (team.selected) {
                selectedTeam = 'selectedTeam';
              }
              return (
                <div
                  className={`teamEvolution ${selectedTeam}`}
                  key={team.id}
                  onClick={() => this.onSelectedTeam(team.id)}
                >
                  {team.name}
                </div>
              );
            })}
          </div>
          <div className='col-sm-9'>{currentTeamData}</div>
        </div>
      );
      evolutionData = <div>{teamsData}</div>;
    }

    return (
      <div>
        <h1>Competition Statistics</h1>

        <Paper square>
          <Tabs
            value={this.state.selectedTab}
            indicatorColor='primary'
            textColor='primary'
            onChange={this.handleChange}
          >
            <Tab label='Evolution' />
            <Tab label='Statistics' />
          </Tabs>
          {this.state.selectedTab === 0 && (
            <TabContainer>{evolutionData}</TabContainer>
          )}
          {this.state.selectedTab === 1 && (
            <TabContainer>{statisticsData}</TabContainer>
          )}
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state: FootballState) => {
  return {
    teams: getTeamsFromCurrentCompetition(state),
    evolutionData: getEvolutionDataToShow(state),
  };
};

const mapDispatchToProps = (dispatch: FootballDispatch) => {
  return {
    loadCompetitionTeams: (competitionId: number) =>
      dispatch(actionCreators.loadCompetitionTeams(competitionId)),
    loadCompetitionTeamEvolution: (competitionId: number, teamId: number) =>
      dispatch(
        actionCreators.loadCompetitionTeamEvolution(competitionId, teamId)
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompetitionStatistics);
