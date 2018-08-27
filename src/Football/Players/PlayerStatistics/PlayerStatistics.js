import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Formatters from '../../utilities/formatters';

class PlayerStatistics extends Component {

  render() {
    const playerId = this.props.match.params.id;
    return (
      <Query
        query={gql`
            {
                player(id: ${playerId}) {
                    name, surname
                    playerMatchesPlayed {
                        localTeamName, visitorTeamName, id, localGoals, visitorGoals, date
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
              {Formatters.formatDate(match.date)}
              <Link to={`${this.props.match.url}/player-statistics/match/${match.id}`}>{`${match.localTeamName} ${match.localGoals} - ${match.visitorGoals} ${match.visitorTeamName}`}</Link>
            </div>
          ));
        }}
      </Query>
    );
    
  }
}
export default PlayerStatistics;