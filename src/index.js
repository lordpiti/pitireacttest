import React from 'react';
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


const rootReducer = combineReducers({
  players: playersReducer,
  competitions: competitionsReducer,
  teams: teamsReducer,
  global: globalReducer
});

const logger = store => {
  return next => {
      return action => {
          console.log('[Middleware] Dispatching', action);
          const result = next(action);
          console.log('[Middleware] next state', store.getState());
          return result;
      }
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk, sagaMiddleware)));

sagaMiddleware.run(watchTeams);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

registerServiceWorker();
