import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actionCreators from '../../store/actions/playersActions';
import { FootballState } from '../../store';

export const PlayerDetailsContainer = (props: any) => {
  const { children, playerId } = props;
  const playerData = useSelector((state: FootballState) => ({
    currentPlayer: state.players.currentPlayer,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!playerData.currentPlayer) {
      dispatch(actionCreators.loadPlayerAction(playerId));
    }
  }, []);

  return (<div>{children(playerData)}</div>);
};