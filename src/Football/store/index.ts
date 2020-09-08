import { PlayersService } from '../services/playersService';
import { CompetitionService } from '../services/competitionsService';
import { GlobalService } from '../services/globalService';
import { PlayersState } from './reducers/players';
import { CompetitionsState } from './reducers/competitions';
import { TeamsState } from './reducers/teams';
import { GlobalState } from './reducers/global';
import { watchTeams } from './sagas';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkDispatch, ThunkAction } from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducers';

export type FootballState = {
  players: PlayersState;
  competitions: CompetitionsState;
  teams: TeamsState;
  global: GlobalState;
};

export type ThunkArguments = {
  playerService: PlayersService;
  competitionsService: CompetitionService;
  globalService: GlobalService;
};

export type FootballDispatch = ThunkDispatch<
  FootballState,
  ThunkArguments,
  any
>;

export type FootballThunk = ThunkAction<
  Promise<void> | Promise<any>,
  FootballState,
  ThunkArguments,
  any
>;

// list of services we will use for the side effects
const thunkMiddleware = thunk.withExtraArgument<ThunkArguments>({
  playerService: new PlayersService(),
  competitionsService: new CompetitionService(),
  globalService: new GlobalService(),
});

// custom fake middleware
const logger = (store: any) => {
  return (next: any) => {
    return (action: any) => {
      //Uncomment the console.logs to see the middleware working
      //console.log('[Middleware] Dispatching', action);
      const result = next(action);
      //console.log('[Middleware] next state', store.getState());
      return result;
    };
  };
};

// using redux-thunk as a redux middleware for competitions and players
// using redux-saga as a redux middleware for teams
// just as a proof so that both middlewares can live together in the same app

//https://stackoverflow.com/questions/52800877/has-anyone-came-across-this-error-in-ts-with-redux-dev-tools-property-redux
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(logger, thunkMiddleware, sagaMiddleware)
    )
  );

  sagaMiddleware.run(watchTeams);

  return store;
};
