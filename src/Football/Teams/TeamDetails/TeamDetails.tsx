import { useEffect } from 'react';
import { Route, Redirect, Switch, useParams, useRouteMatch } from 'react-router-dom';
import TeamInfo from '../TeamInfo/TeamInfo';
import ComplexForm from '../ComplexForm/ComplexForm';
import TeamSquad from '../TeamSquad/TeamSquad';
import TeamNews from '../TeamNews/TeamNews';
import SideMenu from '../../components/SideMenu/SideMenu';
import TeamStadium from '../TeamStadium/TeamStadium';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import './TeamDetails.scss';
import { getCurrentTeam } from '../store/teams.selectors';
import { useAppDispatch } from '../../store/store';
import { clearTeamData } from '../store/teams.reducer';
import { loadTeamSagas } from '../store/teams.actions';

interface TeamsDetailsParams {
  id: string;
}

const TeamDetails = () => {
  const { id } = useParams<TeamsDetailsParams>();
  const { url } = useRouteMatch();

  const currentTeam = useSelector(getCurrentTeam);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadTeamSagas(parseInt(id)));

    return function cleanup() {
      dispatch(clearTeamData({}))
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
      <Switch>
        <Route
          path={url + '/'}
          exact
        >
          <Redirect to={url + '/news'} />
        </Route>
        <Route
          path={url + '/overview'}
        >
          <TeamInfo teamData={currentTeam} />
        </Route>

        <Route
          path={url + '/news'} ><TeamNews teamData={currentTeam} />
        </Route>

        <Route
          path={url + '/team-squad'}
        >
          <TeamSquad players={currentTeam.playerList} />
        </Route>

        <Route
          path={url + '/team-stadium'}>
          <TeamStadium stadium={currentTeam.stadium} />
        </Route>

        <Route
          path={url + '/complex-form-sample'}
        >
          <ComplexForm id={id} />
        </Route>
      </Switch>
    );
  }

  const menuList = [
    {
      name: t('teams.news'),
      url: url + '/news',
    },
    {
      name: t('teams.overview'),
      url: url + '/overview',
    },
    {
      name: t('teams.squad'),
      url: url + '/team-squad',
    },
    {
      name: t('teams.stadium'),
      url: url + '/team-stadium',
    },
    // {
    //   name: 'Complex form sample',
    //   url: this.url + '/complex-form-sample',
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
