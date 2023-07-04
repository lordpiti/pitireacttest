import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import './TeamsOverview.scss';
import { useAppDispatch } from '../../store/store';
import { getTeamList } from '../store/teams.selectors';
import { loadTeamsSagas } from '../store/teams.actions';

interface TeamsOverviewParams {
  id: string;
}

export interface TeamsOverviewProps
  extends RouteComponentProps<TeamsOverviewParams> {
}

const TeamsOverview = (props: TeamsOverviewProps) => {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadTeamsSagas())
  }, []);

  const teamList = useSelector(getTeamList);


  let teamListMarkup = null;
  if (teamList) {
    teamListMarkup = teamList.map((team) => (
      <div className='text-center team-card' key={team.id}>
        <Link
          to={{
            pathname: props.match.url + '/team-details/' + team.id,
          }}
        >
          <img src={team.pictureLogo.url} width='50' height='50' alt='logo' />
          <div>{team.name}</div>
        </Link>
      </div>
    ));
  }

  return <div className='teams-overview'>{teamListMarkup}</div>;
}

export default TeamsOverview;
