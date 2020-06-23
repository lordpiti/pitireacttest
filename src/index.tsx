import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import registerServiceWorker from './registerServiceWorker';

import playersReducer, {
  PlayersState,
} from './Football/store/reducers/players';
import competitionsReducer, {
  CompetitionsState,
} from './Football/store/reducers/competitions';
import teamsReducer, { TeamsState } from './Football/store/reducers/teams';
import globalReducer, { GlobalState } from './Football/store/reducers/global';
import { watchTeams } from './Football/store/sagas';
import { composeWithDevTools } from 'redux-devtools-extension';
import React, { Suspense } from 'react';

import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import './i18n';

export type FootballState = {
  players: PlayersState;
  competitions: CompetitionsState;
  teams: TeamsState;
  global: GlobalState;
};

export type FootballDispatch = ThunkDispatch<FootballState, any, any>;

const rootReducer = combineReducers({
  players: playersReducer,
  competitions: competitionsReducer,
  teams: teamsReducer,
  global: globalReducer,
});

const logger = (store: any) => {
  return (next: any) => {
    return (action: any) => {
      console.log('[Middleware] Dispatching', action);
      const result = next(action);
      console.log('[Middleware] next state', store.getState());
      return result;
    };
  };
};

// using redux-thunk as a redux middleware for competitions and players
// using redux-saga as a redux middleware for teams
// just as a proof so that both middlewares can live together in the same app

//https://stackoverflow.com/questions/52800877/has-anyone-came-across-this-error-in-ts-with-redux-dev-tools-property-redux
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk, sagaMiddleware))
);

sagaMiddleware.run(watchTeams);

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
