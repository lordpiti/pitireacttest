import React, { Component } from 'react';
import { HubConnectionBuilder } from '@aspnet/signalr';
import CompetitionSimulationMatch from './CompetitionSimulationMatch/CompetitionSimulationMatch';
import Countdown from '../../components/Countdown/Countdown';
import axiosInstance from '../../utilities/axios-test';

class CompetitionSimulation extends Component {

	connection = new HubConnectionBuilder()
		.withUrl(process.env.REACT_APP_API_URL+"/loopy")
		.build();

	state = {
		matches: [],
		live:false
	}

	componentDidMount() {
		axiosInstance.get('competition/nextSimulation').then( response => {
      this.setState({
				nextSimulationDateTime: response.data.nextSimulationDateTime,
				live: response.data.live
			});
    });
	}

	constructor(props) {
		super(props);
		this.setupHub();
	}

	setupHub() {
		this.connection.on("StartSimulation", data => {
			console.log('Simulation started');
			this.setState({
				matches: [],
				live: true
			});
		});

		this.connection.on("EndSimulation", data => {
			console.log('Simulation finished');
			this.setState({
				live: false,
				nextSimulationDateTime: data.nextSimulationDateTime
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

		let simulationLabel = null;

		if (this.state.live) {
			simulationLabel = 
			<div>
				Simulation on course. Please wait a few seconds until it's finished and the remaining time till next one will show up		
			</div>;
		}
		else {
			simulationLabel = <div>
				Time remaining for the next simulation:
				<Countdown date={`${this.state.nextSimulationDateTime}`} />
			</div>
		}
		//const currentDate = new Date();
    	//const year2 = (currentDate.getMonth() === 11 && currentDate.getDate() > 23) ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
		
			//const year = this.state.nextSimulationDateTime;

			return (
			<div>
				<h1>Competition simulation</h1>
				{/* {this.state.nextSimulationDateTime} */}
				
				{simulationLabel}
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