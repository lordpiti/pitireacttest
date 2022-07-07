import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import * as actionCreators from '../../store/actions/playersActions';
import { FootballState, useFootballDispatch } from '../../store';

interface PlayerDetailsContainerProps {
  playerId: string;
  children: (props: PlayerDetailsChildProps) => React.ReactNode;
}

export interface PlayerDetailsChildProps {
  currentPlayer: any
}

export const PlayerDetailsContainer = (props: PlayerDetailsContainerProps) => {
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