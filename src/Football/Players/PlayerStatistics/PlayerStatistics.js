import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';

const PlayerStatistics = () => (
  <Query
    query={gql`
        {
            player(id: 1) {
            name, surname
            playerMatchesPlayed {
                localTeamName, visitorTeamName
            }
            }
        }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.player.playerMatchesPlayed.map((match, index) => (
        <div key={index}>
          <p>{`${match.localTeamName} vs ${match.visitorTeamName}`}</p>
        </div>
      ));
    }}
  </Query>
);

export default PlayerStatistics;