import { PlayersState } from './reducers/players';
import { CompetitionsState } from './reducers/competitions';
import { TeamsState } from './reducers/teams';
import { GlobalState } from './reducers/global';
import { watchTeams } from './sagas';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import { thunkMiddleware } from './middleware/thunkMiddleware';
import { logger } from './middleware/loggerMIddleware';
import { sagaMiddleware } from './middleware/sagasMiddleware';

export type FootballState = {
  players: PlayersState;
  competitions: CompetitionsState;
  teams: TeamsState;
  global: GlobalState;
};

// using redux-thunk as a redux middleware for competitions and players
// using redux-saga as a redux middleware for teams
// just as a proof so that both middlewares can live together in the same app

//https://stackoverflow.com/questions/52800877/has-anyone-came-across-this-error-in-ts-with-redux-dev-tools-property-redux
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(logger, thunkMiddleware, sagaMiddleware)
    )
  );

  sagaMiddleware.run(watchTeams);

  return store;
};
