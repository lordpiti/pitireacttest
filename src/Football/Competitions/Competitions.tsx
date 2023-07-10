import { Route, useRouteMatch } from 'react-router-dom';
import CompetitionDetails from './CompetitionDetails/CompetitionDetailsHooks';
import CompetitionsOverview from './CompetitionsOverview/CompetitionsOverview';
import CompetitionSimulation from './CompetitionSimulation/CompetitionSimulation';

const Competitions = () => {
  const { url } = useRouteMatch();
  return (
    <div className='competitions'>
      <Route
        path={url + '/'}
        exact
        component={CompetitionsOverview}
      />
      <Route
        path={url + '/competition-details/:id'}
        component={CompetitionDetails}
      />
      <Route
        path={url + '/competition-simulation'}
        component={CompetitionSimulation}
      />
    </div>
  );
};

export default Competitions;
