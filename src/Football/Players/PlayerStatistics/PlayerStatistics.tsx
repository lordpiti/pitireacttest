import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Helpers from '../../utilities/helpers';
import ExpansionPanel from './ExpansionPanel/ExpansionPanel';
import { isLoading } from '../../Global/store/global.selectors';
import { updateLoadingSpinner } from '../../Global/store/global.reducer';
import { useAppDispatch } from '../../store/store';

interface MatchParams {
  playerId: string;
}

const PlayerStatistics = (props: MatchParams) => {
  const { playerId } = props;

  const uiLoading = useSelector(isLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!uiLoading) {
      dispatch(updateLoadingSpinner(true));
    }
  }, []);

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

  if (loading && data.player) {
    dispatch(updateLoadingSpinner(false));
  }

  const groupedCompetitions = Helpers.groupBy(
    data.player.playerMatchesPlayed,
    'competition.id'
  );

  const allCompetitions = data.player.playerMatchesPlayed.map(
    (x: any) => x.competition
  );

  const uniqueCompetitions = Helpers.removeDuplicates(allCompetitions, 'id');

  const matchListGroupedByCompetition = Object.entries(groupedCompetitions).map(
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
      ></ExpansionPanel>
    </div>
  );
};

export default PlayerStatistics;
