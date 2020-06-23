import React, { useEffect } from 'react';
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
  clearTeamData: Function;
  currentTeam: any;
}

const TeamDetails = (props: TeamsDetailsProps) => {
  useEffect(() => {
    props.loadTeam(props.match.params.id);
    //TODO: delete the store when unmounting, on the cleanup

    return function cleanup() {
      props.clearTeamData();
    };
  }, []);

  let content,
    menuContent = null;

  if (props.currentTeam) {
    menuContent = (
      <div className='margin-bottom-medium'>
        <img
          src={props.currentTeam.pictureLogo.url}
          className='roundedImage'
          height='50'
          width='50'
          alt=''
        />
        <span>{props.currentTeam.name}</span>
      </div>
    );
    content = (
      <div>
        <Route
          path={props.match.url + '/'}
          exact
          render={() => <Redirect to={props.match.url + '/news'} />}
        />
        <Route
          path={props.match.url + '/overview'}
          component={() => {
            return <TeamInfo teamData={props.currentTeam}></TeamInfo>;
          }}
        />

        <Route
          path={props.match.url + '/news'}
          render={() => {
            return <TeamNews teamData={props.currentTeam}></TeamNews>;
          }}
        />

        <Route
          path={props.match.url + '/team-squad'}
          render={() => {
            return (
              <TeamSquad players={props.currentTeam.playerList}></TeamSquad>
            );
          }}
        />

        <Route
          path={props.match.url + '/team-stadium'}
          render={() => {
            return (
              <TeamStadium stadium={props.currentTeam.stadium}></TeamStadium>
            );
          }}
        />

        <Route
          path={props.match.url + '/complex-form-sample'}
          component={() => {
            return <ComplexForm id={teamId}></ComplexForm>;
          }}
        />
      </div>
    );
  }

  const teamId = props.match.params.id;

  const menuList = [
    {
      name: 'News',
      url: props.match.url + '/news',
    },
    {
      name: 'Summary',
      url: props.match.url + '/overview',
    },
    {
      name: 'Squad',
      url: props.match.url + '/team-squad',
    },
    {
      name: 'Stadium',
      url: props.match.url + '/team-stadium',
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
};

const mapStateToProps = (state: FootballState) => {
  return {
    currentTeam: state.teams.currentTeam,
  };
};

const mapDispatchToProps = (dispatch: FootballDispatch) => {
  return {
    loadTeam: (teamId: number) =>
      dispatch(actionCreators.loadTeamSagas(teamId)),
    clearTeamData: () => dispatch(actionCreators.clearTeamData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetails);
