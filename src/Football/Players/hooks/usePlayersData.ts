import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/store';
import { loadPlayer } from '../store/players.actions';
import { getCurrentPlayer } from '../store/players.selectors';

export const usePlayersData = (playerId: string) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [error, setError] = useState<unknown>();

  const currentPlayer = useSelector(getCurrentPlayer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      setIsLoading(true);
      dispatch(loadPlayer(parseInt(playerId)));
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }, [playerId, dispatch]);

  return {
    isLoading,
    currentPlayer,
    error,
  };
};
