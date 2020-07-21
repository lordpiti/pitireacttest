import React, { Component, useState, useEffect } from 'react';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import CompetitionSimulationMatch from './CompetitionSimulationMatch/CompetitionSimulationMatch';
import Countdown from '../../components/Countdown/Countdown';
import axiosInstance from '../../utilities/axios-test';

interface CompetitionSimulationState {
  matches: any[];
  live: boolean;
  nextSimulationDateTime?: any;
}

const CompetitionSimulation = (props: any) => {
  const [matches, _setMatches] = useState([] as any[]);

  // Accessing the state in useState from an event listener wont get the updated value, so need to use useRef also:
  // https://medium.com/geographit/accessing-react-state-in-event-listeners-with-usestate-and-useref-hooks-8cceee73c559
  const matchesRef = React.useRef(matches);
  const setMatches = (data: any) => {
    matchesRef.current = data;
    _setMatches(data);
  };

  const [liveState, setLiveState] = useState({
    live: false,
  });

  const [nextSimulationDateTimeState, setNextSimulationDateTime] = useState({
    nextSimulationDateTime: null,
  });

  const [hubConnection, setHubConnection] = useState<HubConnection>();

  useEffect(() => {
    const createHubConnection = async () => {
      const connection = new HubConnectionBuilder()
        .withUrl(process.env.REACT_APP_API_URL + 'loopy')
        .build();

      connection.on('StartSimulation', (data: any) => {
        console.log('Simulation started');
        setMatches([]);
        setLiveState({
          live: true,
        });
      });

      connection.on('EndSimulation', (data: any) => {
        console.log('Simulation finished');
        setLiveState({
          live: false,
        });
        setNextSimulationDateTime({
          nextSimulationDateTime: data.nextSimulationDateTime,
        });
      });

      connection.on('SendCreateMatch', (data: any) => {
        let newlist = matchesRef.current.slice();
        if (data.matchId) {
          let existingMatch = newlist.find(
            (match) => match.id === data.matchId
          );
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
            matchId: data.matchId,
          };
          if (existingMatch === undefined) {
            newlist.push(newMatch);
          } else {
            existingMatch = newMatch;
          }
        }

        setMatches(newlist);
      });

      connection.on('Send', (data: any) => {
        let copyMatches = matchesRef.current.slice();
        const matchToAddEvent = copyMatches.find((x) => x.id === data.matchId);

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

        setMatches(copyMatches);
      });

      connection.start().then(() => connection.invoke('send', 'Hello'));

      setHubConnection(connection);
    };

    createHubConnection();

    axiosInstance.get('competition/nextSimulation').then((response) => {
      setNextSimulationDateTime({
        nextSimulationDateTime: response.data.nextSimulationDateTime,
      });
      setLiveState({
        live: response.data.live,
      });
    });
  }, []);

  let simulationLabel = null;

  if (liveState.live) {
    simulationLabel = (
      <div>
        Simulation on course. Please wait a few seconds until it's finished and
        the remaining time till next one will show up
      </div>
    );
  } else {
    simulationLabel = (
      <div>
        Time remaining for the next simulation:
        <Countdown
          date={`${nextSimulationDateTimeState.nextSimulationDateTime}`}
        />
      </div>
    );
  }

  return (
    <div>
      <h1>Competition simulation</h1>

      {simulationLabel}
      <div className='row'>
        {matches.map((match) => (
          <div key={match.id} className='col-md-3 col-sm-4 col-xs-6'>
            <CompetitionSimulationMatch
              match={match}
            ></CompetitionSimulationMatch>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitionSimulation;
