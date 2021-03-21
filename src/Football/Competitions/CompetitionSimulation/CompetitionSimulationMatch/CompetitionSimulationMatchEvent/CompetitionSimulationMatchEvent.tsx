import React from 'react';

export interface MatchEvent {
	description: string;
	player1: any;
	player2: any;
	matchEventType: number;
	minute: number;
}

interface CompetitionSimulationMatchEventProps {
	event: MatchEvent;
}

const CompetitionSimulationMatchEvent = (props: CompetitionSimulationMatchEventProps) => {

	let description = props.event.description;

	if (props.event.player1) {
		description += ' ' + props.event.player1.name + ' ' + props.event.player1.surname;
	}

	if (props.event.player2 && props.event.matchEventType == 2) {
		description += ' retires and ' + props.event.player2.name + ' ' + props.event.player2.surname + ' joins the game';
	}

	if (props.event.matchEventType == 5) {
		description += 'Game finished';
	}

	return (
		<div className="row">
			<div className="col-sm-3">
				{props.event.minute}
			</div>
			<div className="col-sm-9">
				{description}
			</div>
		</div>
	)
};

export default CompetitionSimulationMatchEvent;