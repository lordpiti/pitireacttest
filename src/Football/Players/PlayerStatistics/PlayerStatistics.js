import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Formatters from '../../utilities/formatters';
import Helpers from '../../utilities/helpers';
import ExpansionPanel from './ExpansionPanel/ExpansionPanel';

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
                      localTeamName, visitorTeamName, id, localGoals, visitorGoals, date,
                      competition {
                        id, name, season, type
                      }
                  }
              }
          }
      `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          let groupedCompetitions = Helpers.groupBy(data.player.playerMatchesPlayed, 'competition.id');

          const allCompetitions = data.player.playerMatchesPlayed.map(x => x.competition);

          const uniqueCompetitions = Helpers.removeDuplicates(allCompetitions, 'id');

          let matchListGroupedByCompetition = Object.entries(groupedCompetitions).map(group => {
            return {
              competition: uniqueCompetitions.find(x => group[0] == x.id),
              data: group[1]
            }
          });

          return (
            <div>
              <h1>Games played</h1>
              <ExpansionPanel matchListGroupedByCompetition={matchListGroupedByCompetition} {...this.props}></ExpansionPanel>
            </div>)
        }}
      </Query>

    );

  }
}
export default PlayerStatistics;