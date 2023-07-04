import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { reducers } from './reducers/index';
import { watchTeams } from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => {
    const reduxDefaultMiddleware = getDefaultMiddleware();
    return reduxDefaultMiddleware.concat(sagaMiddleware);
  },
});

sagaMiddleware.run(watchTeams);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
