import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';

const TeamInfo = () => (
  <Query
    query={gql`
      {
        players {
          name, surname, playerId
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.players.map(({ name, playerId }) => (
        <div key={playerId}>
          <p>{`${playerId}: ${name}`}</p>
        </div>
      ));
    }}
  </Query>
);

export default TeamInfo;