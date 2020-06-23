import React from 'react';
import { Route } from 'react-router-dom';
import PlayerDetails from './PlayerDetails/PlayerDetails';
import PlayersOverview from './PlayersOverview/PlayersOverview';
import { RouteComponentProps } from 'react-router';

const Players = (props: RouteComponentProps) => {
  return (
    <div className='players'>
      <Route path={props.match.url + '/'} exact component={PlayersOverview} />
      <Route
        path={props.match.url + '/player-details/:id'}
        component={PlayerDetails}
      />
    </div>
  );
};

export default Players;
