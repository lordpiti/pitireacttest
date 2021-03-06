import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/teamsActions';
import { RouteComponentProps } from 'react-router';
import { FootballState } from '../../store';
import { FootballSagasDispatch } from '../../store/middleware/sagasMiddleware';
import './TeamsOverview.scss';

interface TeamsOverviewParams {
  id: string;
}

export interface TeamsOverviewProps
  extends RouteComponentProps<TeamsOverviewParams> {
  loadTeams: Function;
  teamList: any[];
}

class TeamsOverview extends Component<TeamsOverviewProps> {
  componentDidMount() {
    this.props.loadTeams();
  }

  render() {
    let teamList = null;
    if (this.props.teamList) {
      teamList = this.props.teamList.map((team) => (
        <div className='text-center team-card' key={team.id}>
          <Link
            to={{
              pathname: this.props.match.url + '/team-details/' + team.id,
            }}
          >
            <img src={team.pictureLogo.url} width='50' height='50' alt='logo' />
            <div>{team.name}</div>
          </Link>
        </div>
      ));
    }

    return <div className='teams-overview'>{teamList}</div>;
  }
}

const mapStateToProps = (state: FootballState) => {
  return {
    teamList: state.teams.teamList,
  };
};

const mapDispatchToProps = (dispatch: FootballSagasDispatch) => {
  return {
    loadTeams: () => dispatch(actionCreators.loadTeamsSagas()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamsOverview);
