import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { sagaMiddleware } from './middleware/sagasMiddleware';
import { reducers } from './reducers/index';
import { watchTeams } from './sagas';

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => {
    const reduxDefaultMiddleware = getDefaultMiddleware();
    return [...reduxDefaultMiddleware, sagaMiddleware];
  },
});

sagaMiddleware.run(watchTeams);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
