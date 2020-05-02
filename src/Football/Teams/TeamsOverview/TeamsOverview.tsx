import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/teams';
import { RouteComponentProps } from 'react-router';

interface TeamsOverviewParams {
  id: string;
}

export interface TeamsOverviewProps extends RouteComponentProps<TeamsOverviewParams> {
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
      teamList = this.props.teamList.map(team =>
        <div className="col-sm-2 text-center" key={team.id}>
          <Link to={{
            pathname: this.props.match.url + '/team-details/' + team.id
          }}>
            <img src={team.pictureLogo.url} width="50" height="50" alt="logo" />
            <div>{team.name}</div>
          </Link>
        </div>
      );
    }

    return (
      <div className="row">
        {teamList}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    teamList: state.teams.teamList
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadTeams: () => dispatch(actionCreators.loadTeamsSagas())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamsOverview);