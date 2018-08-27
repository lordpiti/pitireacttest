import React, { Component } from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr/dist/browser/signalr';
import CompetitionSimulationMatch from './CompetitionSimulationMatch/CompetitionSimulationMatch';

class CompetitionSimulation extends Component {

	connection = new HubConnectionBuilder()
		.withUrl("https://footballsandbox.azurewebsites.net/loopy")
		.build();

	state = {
		matches: []
	}

	constructor(props) {
		super(props);
		this.setupHub();
	}

	setupHub() {
		this.connection.on("StartSimulation", data => {
			console.log('Simulation started');
			this.setState({
				matches: []
			});
		});

		this.connection.on('SendCreateMatch', data => {
			let newlist = this.state.matches.slice();
			if (data.matchId) {
				let existingMatch = newlist.find(match => match.id === data.matchId);
				// create the new match object
				const newMatch = {
					id: data.matchId,
					local: data.matchToCreate.partido.cod_Local,
					visitor: data.matchToCreate.partido.cod_Visitante,
					goalsLocal: 0,
					goalsVisitor: 0,
					matchEvents: [],
					finished: false,
					date: data.matchToCreate.partido.fecha,
					localTeam: data.localTeam,
					visitorTeam: data.visitorTeam,
					matchId: data.matchId
				};
				if (existingMatch === undefined) {
					newlist.push(newMatch);
				} else {
					existingMatch = newMatch;
				}
			}

			this.setState({
				matches: newlist
			});
		});

		this.connection.on('Send', data => {
			let copyMatches = this.state.matches.slice();
			const matchToAddEvent = copyMatches.find(x => x.id === data.matchId);

			if (matchToAddEvent) {
				// Goal = 1,
				// Substitution = 2,
				// YellowCard = 3,
				// RedCard = 4,
				// GameFinished = 5,
				// GameStarted = 6
				matchToAddEvent.matchEvents.push(data);

				switch (data.matchEventType) {
					case 5:
						matchToAddEvent.finished = true;
						break;
					case 1:
						if (matchToAddEvent.local === data.team1.id) {
							matchToAddEvent.goalsLocal++;
						} else {
							matchToAddEvent.goalsVisitor++;
						}
						break;
					default:
						break;
				}
			}

			this.setState({
				matches: copyMatches
			});
		});

		this.connection.start()
			.then(() => this.connection.invoke("send", "Hello"));
	}

	render() {
		return (
			<div>
				<h1>Competition simulation</h1>
                {/* <div className="card">
                    <h5 className="card-header">Featured</h5>
                    <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div> */}
				<div className="row">
					{this.state.matches.map(match =>
						<div key={match.id} className="col-md-3 col-sm-4 col-xs-6">
							<CompetitionSimulationMatch match={match}></CompetitionSimulationMatch>
						</div>
					)}
				</div>
			</div>
		)
	}
};

export default CompetitionSimulation;