import { useEffect, useState } from 'react';
import MatchPlayers from './MatchPlayers/MatchPlayers';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import MatchStatistics from './MatchStatistics/MatchStatistics';
import { RouteComponentProps } from 'react-router';
import { useAppDispatch } from '../../store/store';
import { loadMatchInfo } from '../store/competitions.actions';
import { useSelector } from 'react-redux';
import { getCurrentMatch } from '../store/competitions.selectors';

const TabContainer = (props: any) => {
  return (
    <Typography component='div' style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

interface MatchParams {
  id: string;
}

export interface MatchProps extends RouteComponentProps<MatchParams> {
}

const Match = (props: MatchProps) => {

  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    dispatch(loadMatchInfo(parseInt(props.match.params.id)));
  }, []);

  const matchInfo = useSelector(getCurrentMatch);

  const handleChange = (event: any, value: number) => {
    setSelectedTab(value);
  };

  const dispatch = useAppDispatch();

  let matchData,
    statisticsData = null;
  if (matchInfo) {
    const convertedMatch = convertToMatchData(matchInfo);
    statisticsData = (
      <MatchStatistics
        statistics={convertedMatch.statisticsIncidences}
      />
    );

    matchData = (
      <div className='row'>
        <div className='col-sm-5'>
          <div
            className='text-center'
            style={{ backgroundColor: 'blueviolet', color: 'white' }}
          >
            <h1>{matchInfo.matchGeneralInfo.localTeam.name}</h1>
          </div>
          <MatchPlayers
            matchPlayers={matchInfo.players}
            team={matchInfo.matchGeneralInfo.localTeam}
          ></MatchPlayers>
        </div>
        <div className='col-sm-2 text-center'>
          <h1 style={{ backgroundColor: 'black', color: 'white' }}>
            {matchInfo.matchGeneralInfo.goalsLocal} -{' '}
            {matchInfo.matchGeneralInfo.goalsVisitor}
          </h1>
        </div>
        <div className='col-sm-5'>
          <div
            className='text-center'
            style={{ backgroundColor: 'blueviolet', color: 'white' }}
          >
            <h1>{matchInfo.matchGeneralInfo.visitorTeam.name}</h1>
          </div>
          <MatchPlayers
            matchPlayers={matchInfo.players}
            team={matchInfo.matchGeneralInfo.visitorTeam}
          ></MatchPlayers>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Match details</h1>

      <Paper square>
        <Tabs
          value={selectedTab}
          indicatorColor='primary'
          textColor='primary'
          onChange={handleChange}
        >
          <Tab label='Players' />
          <Tab label='Statistics' />
        </Tabs>
        {selectedTab === 0 && (
          <TabContainer>{matchData}</TabContainer>
        )}
        {selectedTab === 1 && (
          <TabContainer>{statisticsData}</TabContainer>
        )}
      </Paper>
    </div>
  );
}

const convertToMatchData = (matchData: any) => {
  const playerList = matchData.players.map((player: any) => {
    const newPlayer = { ...player };
    newPlayer.goals = [];
    newPlayer.bookings = [];

    const booking = matchData.statisticsIncidences.bookings.find(
      (b: any) => b.player.playerId === player.playerId
    );

    if (booking) {
      newPlayer.bookings.push(booking);
    }

    const goal = matchData.statisticsIncidences.goals.find(
      (g: any) => g.player.playerId === player.playerId
    );

    if (goal) {
      newPlayer.goals.push(goal);
    }

    const substitutionIn = matchData.statisticsIncidences.substitutions.find(
      (substitution: any) => substitution.playerIn.playerId === player.playerId
    );
    if (substitutionIn) {
      newPlayer.substitutionIn = substitutionIn;
    }

    const substitutionOut = matchData.statisticsIncidences.substitutions.find(
      (substitution: any) => substitution.playerOut.playerId === player.playerId
    );
    if (substitutionOut) {
      newPlayer.substitutionOut = substitutionOut;
    }
  });

  return { ...matchData, players: playerList };
};

export default Match;
