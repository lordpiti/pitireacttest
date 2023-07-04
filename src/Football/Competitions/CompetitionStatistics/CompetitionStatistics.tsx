import { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CompetitionEvolution from './CompetitionEvolution/CompetitionEvolution';
import './CompetitionStatistics.scss';
import { useAppDispatch } from '../../store/store';
import { loadCompetitionTeamEvolution, loadCompetitionTeams } from '../store/competitions.actions';
import { useSelector } from 'react-redux';
import { getEvolutionDataToShow, getTeamsFromCurrentCompetition } from '../store/competitions.selectors';

const TabContainer = (props: any) => {
  return (
    <Typography component='div' style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const CompetitionStatistics = (props: any) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: any, value: any) => {
    setSelectedTab(value);
  };

  const dispatch = useAppDispatch();

  const onSelectedTeam = (teamId: number) => {
    dispatch(loadCompetitionTeamEvolution({ competitionId: props.competitionId, teamId: teamId }));
  };

  useEffect(() => {
    dispatch(loadCompetitionTeams(1));
  }, []);

  const teams = useSelector(getTeamsFromCurrentCompetition);
  const evolutionData = useSelector(getEvolutionDataToShow);

  let evolutionDataMarkup,
    teamsDataMarkup,
    currentTeamData = null;

  const statisticsData = <div>Statistics</div>;

  if (teams) {
    if (evolutionData) {
      currentTeamData = (
        <CompetitionEvolution
          displayData={evolutionData}
        ></CompetitionEvolution>
      );
    }

    teamsDataMarkup = (
      <div className='row'>
        <div className='col-sm-3'>
          {teams.map((team: any) => {
            let selectedTeam = null;
            if (team.selected) {
              selectedTeam = 'selectedTeam';
            }
            return (
              <div
                className={`teamEvolution ${selectedTeam}`}
                key={team.id}
                onClick={() => onSelectedTeam(team.id)}
              >
                {team.name}
              </div>
            );
          })}
        </div>
        <div className='col-sm-9'>{currentTeamData}</div>
      </div>
    );
    evolutionDataMarkup = <div>{teamsDataMarkup}</div>;
  }

  return (
    <div>
      <h1>Competition Statistics</h1>

      <Paper square>
        <Tabs
          value={selectedTab}
          indicatorColor='primary'
          textColor='primary'
          onChange={handleChange}
        >
          <Tab label='Evolution' />
          <Tab label='Statistics' />
        </Tabs>
        {selectedTab === 0 && (
          <TabContainer>{evolutionDataMarkup}</TabContainer>
        )}
        {selectedTab === 1 && (
          <TabContainer>{statisticsData}</TabContainer>
        )}
      </Paper>
    </div>
  );
}

export default CompetitionStatistics;
