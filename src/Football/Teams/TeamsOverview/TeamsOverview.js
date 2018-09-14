import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/teams';

class TeamsOverview extends Component {

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

const mapStateToProps = state => {
  return {
    teamList: state.teams.teamList
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadTeams: () => dispatch(actionCreators.loadTeams())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamsOverview);