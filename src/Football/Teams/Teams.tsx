import { Route } from 'react-router-dom';
import TeamDetails from './TeamDetails/TeamDetails';
import TeamsOverview from './TeamsOverview/TeamsOverview';
import { useRouteMatch } from 'react-router';

const Teams = () => {
  const { url } = useRouteMatch();

  return (
    <div className='teams'>
      <Route path={`${url}/`} exact component={TeamsOverview} />
      <Route
        path={`${url}/team-details/:id`}
        component={TeamDetails}
      />
    </div>
  );
};

export default Teams;
