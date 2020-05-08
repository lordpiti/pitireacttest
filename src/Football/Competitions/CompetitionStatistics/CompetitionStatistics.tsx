import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CompetitionEvolution from './CompetitionEvolution/CompetitionEvolution';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/competitions';
import './CompetitionStatistics.scss';
import { FootballState, FootballDispatch } from '../../..';

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
      statisticsData,
      teamsData,
      currentTeamData = null;

    statisticsData = <div>Statistics</div>;

    if (this.props.currentCompetition && this.props.currentCompetition.teams) {
      if (this.props.currentCompetition.evolutionData) {
        currentTeamData = (
          <CompetitionEvolution
            displayData={this.props.currentCompetition.evolutionData}
          ></CompetitionEvolution>
        );
      }

      teamsData = (
        <div className='row'>
          <div className='col-sm-3'>
            {this.props.currentCompetition.teams.map((team: any) => {
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
    currentCompetition: state.competitions.currentCompetition,
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
