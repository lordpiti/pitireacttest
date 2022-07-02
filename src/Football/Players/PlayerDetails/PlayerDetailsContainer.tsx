import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actionCreators from '../../store/actions/playersActions';
import { FootballState, useFootballDispatch } from '../../store';

export const PlayerDetailsContainer = (props: any) => {
  const { children, playerId } = props;
  const playerData = useSelector((state: FootballState) => ({
    currentPlayer: state.players.currentPlayer,
  }));
  const dispatch = useFootballDispatch();

  useEffect(() => {
    dispatch(actionCreators.loadPlayerAction(playerId));
  }, [playerId]);

  return (<div>{children(playerData)}</div>);
};