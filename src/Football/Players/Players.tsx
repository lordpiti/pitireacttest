import React from 'react';
import { Route } from 'react-router-dom';
import { PlayerDetails } from './PlayerDetails/PlayerDetailsHooks';
import PlayersOverview from './PlayersOverview/PlayersOverview';
import { RouteComponentProps, useRouteMatch } from 'react-router';

const Players = () => {
  const { url } = useRouteMatch();
  return (
    <div className='players'>
      <Route path={url + '/'} exact component={PlayersOverview} />
      <Route
        path={url + '/player-details/:id'}
        component={PlayerDetails}
      />
    </div>
  );
};

export default Players;
