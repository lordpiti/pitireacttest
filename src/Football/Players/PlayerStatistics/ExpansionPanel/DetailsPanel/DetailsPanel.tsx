import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import SingleGamePlayed from '../SingleGamePlayed/SingleGamePlayed';

interface DetailsPanelProps {
  classes: any;
  playerId: number;
  competitionId: number;
}

const DetailsPanel = (props: DetailsPanelProps) => {
  const { playerId, competitionId } = props;

  const GET_PLAYER_STATISTICS = gql`
    query PlayerStatistics($playerId: Int!, $competitionId: Int!) {
      player(id: $playerId) {
        playerMatchesPlayedByCompetition(competitionId: $competitionId) {
          id
          round
          localGoals
          visitorGoals
          localTeamName
          visitorTeamName
          date
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_PLAYER_STATISTICS, {
    variables: { playerId, competitionId },
    pollInterval: 60000,
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error :(</p>;
  }

  return (
    <div style={{ display: 'inline-block', width: '100%' }}>
      {data.player.playerMatchesPlayedByCompetition.map(
        (match: any, index: number) => (
          <SingleGamePlayed key={match.id} gamePlayed={match} />
        )
      )}
    </div>
  );
};

export default DetailsPanel;
