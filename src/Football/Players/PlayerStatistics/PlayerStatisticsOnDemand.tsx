import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ExpansionPanel from './ExpansionPanel/ExpansionPanelOnDemand';
import { isLoading } from '../../Global/store/global.selectors';
import { useAppDispatch } from '../../store/store';
import { updateLoadingSpinner } from '../../Global/store/global.reducer';

interface MatchParams {
	playerId: string;
}

const PlayerStatistics = (props: MatchParams) => {

	const uiLoading = useSelector(isLoading);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!uiLoading) {
			dispatch(updateLoadingSpinner(true));
		}
	}, []);

	const playerId = props.playerId;

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

	if (uiLoading) {
		dispatch(updateLoadingSpinner(false));
	}

	return (
		<>
			<h1>Games played</h1>
			{data.player.playerCompetitionsPlayed.map((competition: any) => (
				<ExpansionPanel key={competition.id} competition={competition} playerId={playerId}
				></ExpansionPanel>))}
		</>
	);
};

export default PlayerStatistics;
