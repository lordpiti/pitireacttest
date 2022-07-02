import thunk, { ThunkAction } from 'redux-thunk';
import { FootballState } from '..';
import { CompetitionService } from '../../services/competitionsService';
import { GlobalService } from '../../services/globalService';
import { PlayersService } from '../../services/playersService';

export type ThunkArguments = {
  playerService: PlayersService;
  competitionsService: CompetitionService;
  globalService: GlobalService;
};

// Note that we are not typing the allowed actions to be dispatched here.
// When typing the dispatch here, we define the actions allowed to be dispatched and
// hence we will have to cast the actions returned by the action creators to
// match the type here

export type FootballThunk = ThunkAction<
  Promise<void> | Promise<any>,
  FootballState,
  ThunkArguments,
  any
>;

// list of services we will use for the side effects
export const thunkMiddleware = thunk.withExtraArgument<{}>({});
