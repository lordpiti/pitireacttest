import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Helpers from '../../utilities/helpers';
import ExpansionPanel from './ExpansionPanel/ExpansionPanel';
import * as actionCreators from '../../store/actions/globalActions';
import { RouteComponentProps } from 'react-router';
import { FootballState } from '../../store';

interface MatchParams {
  id: string;
}

const PlayerStatistics = (props: RouteComponentProps<MatchParams>) => {
  const { match } = props;

  useEffect(() => {
    if (!ui.isLoading) {
      dispatch(actionCreators.updateLoadingSpinner(true));
    }
  }, []);

  const ui = useSelector((state: FootballState) => ({
    isLoading: state.global.loading,
  }));

  const dispatch = useDispatch();

  const playerId = match.params.id;

  const GET_PLAYER_STATISTICS = gql`
    query PlayerStatistics($playerId: Int!) {
      player(id: $playerId) {
        name
        surname
        playerMatchesPlayed {
          localTeamName
          visitorTeamName
          id
          localGoals
          visitorGoals
          date
          round
          competition {
            id
            name
            season
            type
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_PLAYER_STATISTICS, {
    variables: { playerId },
    pollInterval: 60000,
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error :(</p>;
  }

  if (ui.isLoading) {
    dispatch(actionCreators.updateLoadingSpinner(false));
  }

  let groupedCompetitions = Helpers.groupBy(
    data.player.playerMatchesPlayed,
    'competition.id'
  );

  const allCompetitions = data.player.playerMatchesPlayed.map(
    (x: any) => x.competition
  );

  const uniqueCompetitions = Helpers.removeDuplicates(allCompetitions, 'id');

  let matchListGroupedByCompetition = Object.entries(groupedCompetitions).map(
    (group) => {
      return {
        competition: uniqueCompetitions.find((x) => group[0] == x.id),
        data: group[1],
      };
    }
  );

  return (
    <div>
      <h1>Games played</h1>
      <ExpansionPanel
        matchListGroupedByCompetition={matchListGroupedByCompetition}
        {...props}
      ></ExpansionPanel>
    </div>
  );
};

export default PlayerStatistics;
