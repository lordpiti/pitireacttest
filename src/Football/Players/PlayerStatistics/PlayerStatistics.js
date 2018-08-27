import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PlayerStatistics extends Component {

  render() {
    return (
      <Query
        query={gql`
            {
                player(id: 1) {
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
            debugger;
    
          return data.player.playerMatchesPlayed.map((match, index) => (
            <div key={index}>
              <Link to={`${this.props.match.url}/player-statistics/match/${match.id}`}>{`${match.localTeamName} ${match.localGoals} - ${match.visitorGoals} ${match.visitorTeamName}`}</Link>
            </div>
          ));
        }}
      </Query>
    );
    
  }
}
export default PlayerStatistics;