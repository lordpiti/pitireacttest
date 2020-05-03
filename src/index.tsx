import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import registerServiceWorker from './registerServiceWorker';

import playersReducer from './Football/store/reducers/players';
import competitionsReducer from './Football/store/reducers/competitions';
import teamsReducer from './Football/store/reducers/teams';
import globalReducer from './Football/store/reducers/global';
import { watchTeams } from './Football/store/sagas';
import { composeWithDevTools } from 'redux-devtools-extension';
import React from 'react';

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
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
