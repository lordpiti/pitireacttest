import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import CompetitionDetails from './CompetitionDetails/CompetitionDetailsHooks';
import CompetitionsOverview from './CompetitionsOverview/CompetitionsOverview';
import CompetitionSimulation from './CompetitionSimulation/CompetitionSimulation';

const Competitions = (props: RouteComponentProps) => {
  return (
    <div className='competitions'>
      <Route
        path={props.match.url + '/'}
        exact
        component={CompetitionsOverview}
      />
      <Route
        path={props.match.url + '/competition-details/:id'}
        component={CompetitionDetails}
      />
      <Route
        path={props.match.url + '/competition-simulation'}
        component={CompetitionSimulation}
      />
    </div>
  );
};

export default Competitions;
