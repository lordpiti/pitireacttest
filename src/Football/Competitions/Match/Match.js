import React, { Component } from 'react';
import MatchPlayers from './MatchPlayers/MatchPlayers';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import MatchStatistics from './MatchStatistics/MatchStatistics';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/competitions';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

// TabContainer.propTypes = {
//   children: PropTypes.node.isRequired,
// };


class Match extends Component {

  state={
    matchData: null,
    selectedTab: 0
  }

  componentDidMount() {
    this.props.loadMatch(this.props.match.params.id);
  }

  handleChange = (event, value) => {
    this.setState({ selectedTab: value });
  };

  render() {

    let matchData, statisticsData = null;
    if (this.props.matchInfo) {
      statisticsData = <MatchStatistics statistics={this.props.matchInfo.statisticsIncidences} />

      matchData = <div className="row">
      <div className="col-sm-5">
        <div className="text-center" style={{ backgroundColor:'blueviolet', color:'white'}}>
          <h1>{this.props.matchInfo.matchGeneralInfo.localTeam.name}</h1>
        </div>
        <MatchPlayers matchPlayers={this.props.matchInfo.players} team={this.props.matchInfo.matchGeneralInfo.localTeam} ></MatchPlayers>
      </div>
      <div className="col-sm-2 text-center">
        <h1 style={{backgroundColor:'black', color:'white'}}>
          {this.props.matchInfo.matchGeneralInfo.goalsLocal} - {this.props.matchInfo.matchGeneralInfo.goalsVisitor}
        </h1>
      </div>
      <div className="col-sm-5">
        <div className="text-center" style={{backgroundColor:'blueviolet', color:'white'}}>
          <h1>{this.props.matchInfo.matchGeneralInfo.visitorTeam.name}</h1>
        </div>  
        <MatchPlayers matchPlayers={this.props.matchInfo.players} team={this.props.matchInfo.matchGeneralInfo.visitorTeam} ></MatchPlayers>
      </div>
    </div>
    }

    return (
        <div>
          <h1>Match details</h1>
          
            <Paper square>
              <Tabs
                value={this.state.selectedTab}
                indicatorColor="primary"
                textColor="primary"
                onChange={this.handleChange}
              >
                <Tab label="Players" />
                {/* <Tab label="Disabled" disabled /> */}
                <Tab label="Statistics" />
              </Tabs>
              {this.state.selectedTab === 0 && <TabContainer>{matchData}</TabContainer>}
              {this.state.selectedTab === 1 && <TabContainer>{statisticsData}</TabContainer>}
              {this.state.selectedTab === 2 && <TabContainer>Item Three</TabContainer>}
            </Paper>
          
        </div>
    )
  }
}

// Can move this to the reducer
const convertToMatchData = (matchData) => {
  matchData.players.forEach(player => {
    player.goals = [];
    player.bookings = [];

    const booking = matchData.statisticsIncidences.bookings.find(b => b.player.playerId === player.playerId);
    if (booking) {
      player.bookings.push(booking);
    }

    const goal = matchData.statisticsIncidences.goals.find(g => g.player.playerId === player.playerId);
    if (goal) {
      player.goals.push(goal);
    }

    const substitutionIn = matchData.statisticsIncidences.substitutions
    .find(substitution => substitution.playerIn.playerId === player.playerId);
    if (substitutionIn) {
      player.substitutionIn = substitutionIn;
    }

    const substitutionOut = matchData.statisticsIncidences.substitutions
    .find(substitution => substitution.playerOut.playerId === player.playerId);
    if (substitutionOut) {
      player.substitutionOut = substitutionOut;
    }
  });

  return matchData;
}

const mapStateToProps = state => {
  return {
    matchInfo: state.competitions.currentMatch ? convertToMatchData(state.competitions.currentMatch) : null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadMatch: (matchId) => dispatch(actionCreators.loadMatchInfo(matchId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Match);