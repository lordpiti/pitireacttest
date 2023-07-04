import { useEffect, useState } from 'react';
import {
  withStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MatchList from './MatchList/MatchList';
import TableLeague from './TableLeague/TableLeague';
import ScorersTable from './ScorersTable/ScorersTable';
import { Paper } from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router';
import './CompetitionRounds.scss';
import { useAppDispatch } from '../../store/store';
import { loadCompetitionRound } from '../store/competitions.actions';
import { useSelector } from 'react-redux';
import { getCurrentCompetition, getCurrentCompetitionRounds } from '../store/competitions.selectors';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    boxSelectRound: {
      marginBottom: 20,
      padding: 10,
    },
  });

const CompetitionRounds = (props: any) => {
  // _isMounted = false;

  const [currentRound, setCurrentRound] = useState<string>('1');

  const dispatch = useAppDispatch();
  const competitionData = useSelector(getCurrentCompetition) as any;
  const currentCompetitionRounds = useSelector(getCurrentCompetitionRounds);

  useEffect(() => {
    dispatch(loadCompetitionRound({ id: competitionData.id, round: 1 }));
  }, []);

  const handleChange = (event: any) => {
    setCurrentRound(event.target.value);
    dispatch(loadCompetitionRound({ id: competitionData.id, round: event.target.value }));
  };
  const { classes } = props;

  return (
    <>
      <h1>Competition Games</h1>

      <Paper className={classes.boxSelectRound}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor='currentRound'>Select Round</InputLabel>
          <Select
            value={currentRound}
            onChange={handleChange}
            inputProps={{
              name: 'currentRound',
              id: 'currentRound',
            }}
          >
            {competitionData.roundList.map(
              (round: any, index: number) => (
                <MenuItem key={index} value={round}>
                  {round}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </Paper>

      {currentCompetitionRounds && (
        <div className='competition-rounds-content'>
          <div className='half'>
            <div className='rounds-panel'>
              {currentCompetitionRounds.matchList && (
                <MatchList
                  matchList={currentCompetitionRounds.matchList}
                  currentUrl={props.match.url}
                />
              )}
            </div>
            <div className='rounds-panel'>
              {currentCompetitionRounds.teamStatsRoundList && (
                <TableLeague
                  teamStatsRoundList={
                    currentCompetitionRounds.teamStatsRoundList
                  }
                />
              )}
            </div>
          </div>
          <div className='half'>
            {currentCompetitionRounds.scorers && (
              <ScorersTable scorersList={currentCompetitionRounds.scorers} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default withStyles(styles)(withRouter(CompetitionRounds));
