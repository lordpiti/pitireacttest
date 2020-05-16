import React, { Component } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import TeamInfo from '../TeamInfo/TeamInfo';
import ComplexForm from '../ComplexForm/ComplexForm';
import TeamSquad from '../TeamSquad/TeamSquad';
import TeamNews from '../TeamNews/TeamNews';
import SideMenu from '../../components/SideMenu/SideMenu';
import TeamStadium from '../TeamStadium/TeamStadium';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/teamsActions';
import { FootballState, FootballDispatch } from '../../..';

interface TeamsDetailsParams {
  id: string;
}

interface TeamsDetailsProps extends RouteComponentProps<TeamsDetailsParams> {
  loadTeam: Function;
  currentTeam: any;
}

class TeamDetails extends Component<TeamsDetailsProps> {
  componentDidMount() {
    this.props.loadTeam(this.props.match.params.id);
  }

  render() {
    let content,
      menuContent = null;

    if (this.props.currentTeam) {
      menuContent = (
        <div className='margin-bottom-medium'>
          <img
            src={this.props.currentTeam.pictureLogo.url}
            className='roundedImage'
            height='50'
            width='50'
            alt=''
          />
          <span>{this.props.currentTeam.name}</span>
        </div>
      );
      content = (
        <div>
          <Route
            path={this.props.match.url + '/'}
            exact
            render={() => <Redirect to={this.props.match.url + '/news'} />}
          />
          <Route
            path={this.props.match.url + '/overview'}
            component={() => {
              return <TeamInfo teamData={this.props.currentTeam}></TeamInfo>;
            }}
          />

          <Route
            path={this.props.match.url + '/news'}
            component={() => {
              return <TeamNews teamData={this.props.currentTeam}></TeamNews>;
            }}
          />

          <Route
            path={this.props.match.url + '/team-squad'}
            render={() => {
              return (
                <TeamSquad
                  players={this.props.currentTeam.playerList}
                ></TeamSquad>
              );
            }}
          />

          <Route
            path={this.props.match.url + '/team-stadium'}
            render={(props) => {
              return (
                <TeamStadium
                  stadium={this.props.currentTeam.stadium}
                ></TeamStadium>
              );
            }}
          />

          <Route
            path={this.props.match.url + '/complex-form-sample'}
            component={() => {
              return <ComplexForm id={teamId}></ComplexForm>;
            }}
          />
        </div>
      );
    }

    const teamId = this.props.match.params.id;

    const menuList = [
      {
        name: 'News',
        url: this.props.match.url + '/news',
      },
      {
        name: 'Summary',
        url: this.props.match.url + '/overview',
      },
      {
        name: 'Squad',
        url: this.props.match.url + '/team-squad',
      },
      {
        name: 'Stadium',
        url: this.props.match.url + '/team-stadium',
      },
      // {
      //   name: 'Complex form sample',
      //   url: this.props.match.url + '/complex-form-sample',
      // },
    ];

    return (
      <div className='Teams'>
        <div className='row'>
          <div className='col-sm-3'>
            <SideMenu itemList={menuList}>{menuContent}</SideMenu>
          </div>
          <div className='col-sm-9'>{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: FootballState) => {
  return {
    currentTeam: state.teams.currentTeam,
  };
};

const mapDispatchToProps = (dispatch: FootballDispatch) => {
  return {
    loadTeam: (teamId: number) =>
      dispatch(actionCreators.loadTeamSagas(teamId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetails);
