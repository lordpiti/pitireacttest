import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/store';
import { loadPlayer } from '../store/players.actions';
import { getCurrentPlayer } from '../store/players.selectors';

interface PlayerDetailsContainerProps {
  playerId: string;
  children: (props: PlayerDetailsChildProps) => React.ReactNode;
}

export interface PlayerDetailsChildProps {
  currentPlayer: any
}

export const PlayerDetailsContainer = (props: PlayerDetailsContainerProps) => {
  const { children, playerId } = props;
  const playerData = useSelector(getCurrentPlayer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPlayer(parseInt(playerId)));
  }, [playerId]);

  return (<div>{children({ currentPlayer: playerData })}</div>);
};