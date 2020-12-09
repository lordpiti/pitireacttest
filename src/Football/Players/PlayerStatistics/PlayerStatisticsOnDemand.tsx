import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ExpansionPanel from './ExpansionPanel/ExpansionPanelOnDemand';
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
        playerCompetitionsPlayed {
            id
            name
            season
            type
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

	return (
		<>
			<h1>Games played</h1>
			{data.player.playerCompetitionsPlayed.map((competition: any) => (
				<ExpansionPanel key={competition.id} competition={competition} playerId={playerId}
					{...props}
				></ExpansionPanel>))}
		</>
	);
};

export default PlayerStatistics;
