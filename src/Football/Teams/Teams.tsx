import React from 'react';
import { Route } from 'react-router-dom';
import TeamDetails from './TeamDetails/TeamDetails';
import TeamsOverview from './TeamsOverview/TeamsOverview';
import { RouteComponentProps } from 'react-router';

const Teams = (props: RouteComponentProps) => {
  return (
    <div className='teams'>
      <Route path={props.match.url + '/'} exact component={TeamsOverview} />
      <Route
        path={props.match.url + '/team-details/:id'}
        component={TeamDetails}
      />
    </div>
  );
};

export default Teams;
