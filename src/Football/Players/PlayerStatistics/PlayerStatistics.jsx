import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Helpers from '../../utilities/helpers';
import ExpansionPanel from './ExpansionPanel/ExpansionPanel';
import * as actionCreators from '../../store/actions/global';

const PlayerStatistics = (props) => {

  const { match } = props;

  useEffect(() => {
    if (!ui.isLoading) {
      dispatch(actionCreators.updateLoadingSpinner(true));
    }
  },  []);

  const ui = useSelector(state => ({
    isLoading: state.global.loading
  }));

  const dispatch = useDispatch();

  const playerId = match.params.id;

  const GET_PLAYER_STATISTICS = gql`
    query PlayerStatistics($playerId: Int!) {
      player(id: $playerId) {
        name, surname
        playerMatchesPlayed {
          localTeamName, visitorTeamName, id, localGoals, visitorGoals, date, round,
          competition {
            id, name, season, type
          }
        }
      }
    }
  `;

//   const GET_PLAYER_STATISTICS = gql`
//   {
//       player(id: ${playerId}) {
//           name, surname
//           playerMatchesPlayed {
//               localTeamName, visitorTeamName, id, localGoals, visitorGoals, date, round,
//               competition {
//                 id, name, season, type
//               }
//           }
//       }
//   }
// `;

  return (
    <Query
      query={GET_PLAYER_STATISTICS} variables={{playerId}}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <p>Loading...</p>;
        } 
        if (error) { 
          return <p>Error :(</p>;
        }

        if (ui.isLoading) {
          dispatch(actionCreators.updateLoadingSpinner(false));
        }

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
            <ExpansionPanel matchListGroupedByCompetition={matchListGroupedByCompetition} {...props}></ExpansionPanel>
          </div>)
      }}
    </Query>
  );
}

export default PlayerStatistics;