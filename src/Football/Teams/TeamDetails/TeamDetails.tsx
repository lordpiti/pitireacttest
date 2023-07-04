import { useEffect } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import TeamInfo from '../TeamInfo/TeamInfo';
import ComplexForm from '../ComplexForm/ComplexForm';
import TeamSquad from '../TeamSquad/TeamSquad';
import TeamNews from '../TeamNews/TeamNews';
import SideMenu from '../../components/SideMenu/SideMenu';
import TeamStadium from '../TeamStadium/TeamStadium';
import { useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions/teamsActions';
import { useTranslation } from 'react-i18next';
// import { FootballSagasDispatch } from '../../store/middleware/sagasMiddleware';
import './TeamDetails.scss';
import { getCurrentTeam } from '../store/teams.selectors';
import { useAppDispatch } from '../../store/store';

interface TeamsDetailsParams {
  id: string;
}

interface TeamsDetailsProps extends RouteComponentProps<TeamsDetailsParams> {
  loadTeam: Function;
  clearTeamData: Function;
}

const TeamDetails = (props: TeamsDetailsProps) => {
  const { match } = props;

  const currentTeam = useSelector(getCurrentTeam);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actionCreators.loadTeamSagas(parseInt(match.params.id)))
    //TODO: delete the store when unmounting, on the cleanup

    return function cleanup() {
      // clearTeamData();
      dispatch(actionCreators.clearTeamData())
    };
  }, []);

  const { t, i18n } = useTranslation();

  let content,
    menuContent = null;

  if (currentTeam) {
    menuContent = (
      <div className='margin-bottom-medium'>
        <img
          src={currentTeam.pictureLogo.url}
          className='roundedImage'
          height='50'
          width='50'
          alt=''
        />
        <span>{currentTeam.name}</span>
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
            return <TeamInfo teamData={currentTeam}></TeamInfo>;
          }}
        />

        <Route
          path={props.match.url + '/news'}
          render={() => {
            return <TeamNews teamData={currentTeam}></TeamNews>;
          }}
        />

        <Route
          path={props.match.url + '/team-squad'}
          render={() => {
            return (
              <TeamSquad players={currentTeam.playerList}></TeamSquad>
            );
          }}
        />

        <Route
          path={props.match.url + '/team-stadium'}
          render={() => {
            return (
              <TeamStadium stadium={currentTeam.stadium}></TeamStadium>
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
      name: t('teams.news'),
      url: props.match.url + '/news',
    },
    {
      name: t('teams.overview'),
      url: props.match.url + '/overview',
    },
    {
      name: t('teams.squad'),
      url: props.match.url + '/team-squad',
    },
    {
      name: t('teams.stadium'),
      url: props.match.url + '/team-stadium',
    },
    // {
    //   name: 'Complex form sample',
    //   url: this.props.match.url + '/complex-form-sample',
    // },
  ];

  return (
    <div className='team-details'>
      <div className='sidebar'>
        <SideMenu itemList={menuList}>{menuContent}</SideMenu>
      </div>
      <div className='main-content'>{content}</div>
    </div>
  );
};

export default TeamDetails;
