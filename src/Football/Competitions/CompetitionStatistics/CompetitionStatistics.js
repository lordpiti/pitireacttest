import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import apiInstance from '../../utilities/axios-test';
import CompetitionEvolution from './CompetitionEvolution/CompetitionEvolution';
import './CompetitionStatistics.css';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class CompetitionStatistics extends Component {

  state = {
    teamsData: null,
    currentTeamData: null,
    selectedTab: 0
  }

  handleChange = (event, value) => {
    this.setState({ selectedTab: value });
  };

  onSelectedTeam = (teamId) => {

    let newList = this.state.teamsData.map(team => {
        team.selected = team.id == teamId;
        return team;
    });

    this.setState({
      teamsData: newList
    })

    apiInstance.get(`team/clasification/${teamId}/competition/${this.props.competitionId}`).then(response => {
      this.setState({
        currentTeamData: this.createDataToShow(response.data.clasificationSeasonData)
      })
    })
  }

  componentDidMount() {
    apiInstance.get('team/teams').then(response => {
      this.setState({
        teamsData: response.data
      })
    })
  }

  createDataToShow(teamData) {
    const dataToShow = {
      rounds: teamData.map(round => round.round),
      positions: teamData.map(round => round.position ),
      goalsFor: teamData.map(round => round.goalsFor ),
      goalsAgainst: teamData.map(round => round.goalsAgainst )
    }

    return dataToShow;
  }

  render() {

    let evolutionData, statisticsData, teamsData, currentTeamData = null;

    statisticsData = <div>Statistics</div>;

    if (this.state.teamsData) {

      if (this.state.currentTeamData) {
        currentTeamData = <CompetitionEvolution displayData={this.state.currentTeamData}></CompetitionEvolution>;
      }

      teamsData = <div className="row">
        <div className="col-sm-3">
          {this.state.teamsData.map(team => {
            let selectedTeam = null;
            if (team.selected) {
              selectedTeam = 'selectedTeam';
            }
            return <div className={`teamEvolution ${selectedTeam}`} key={team.id} onClick={ () => this.onSelectedTeam(team.id)}>
              {team.name}
            </div> 
          })
          }
        </div>
        <div className="col-sm-9">
          {currentTeamData}
        </div>
      </div>;
      evolutionData = <div>{teamsData}</div>;
    }


    return (
      <div>
        <h1>Competition Statistics</h1>

        <Paper square>
          <Tabs
            value={this.state.selectedTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
          >
            <Tab label="Evolution" />
            <Tab label="Statistics" />
          </Tabs>
          {this.state.selectedTab === 0 && <TabContainer>{evolutionData}</TabContainer>}
          {this.state.selectedTab === 1 && <TabContainer>{statisticsData}</TabContainer>}
        </Paper>

      </div>
    )
  }
}

export default CompetitionStatistics;