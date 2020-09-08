import React from 'react';
import {
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MatchList from './MatchList/MatchList';
import TableLeague from './TableLeague/TableLeague';
import ScorersTable from './ScorersTable/ScorersTable';
import { Paper } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { FootballState, FootballDispatch } from '../../store';
import * as actionCreators from '../../store/actions/competitionsActions';
import { getCurrentCompetitionRounds } from '../../store/reducers/competitions';

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

interface CompetitionRoundsState {
  currentRound: string;
  name: string;
  roundData?: any;
}

interface CompetitionRoundsProps
  extends RouteComponentProps,
    WithStyles<typeof styles> {
  competitionData: any;
  currentRound: any;
  loadRoundData: Function;
}

class CompetitionRounds extends React.Component<
  CompetitionRoundsProps,
  CompetitionRoundsState
> {
  _isMounted = false;

  constructor(props: any) {
    super(props);
    this.state = {
      currentRound: '1',
      name: 'hai',
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.loadRoundData(this.props.competitionData.id, 1);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value } as any);
    this.props.loadRoundData(this.props.competitionData.id, event.target.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <h1>Competition Games</h1>

        <Paper className={classes.boxSelectRound}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor='currentRound'>Select Round</InputLabel>
            <Select
              value={this.state.currentRound}
              onChange={this.handleChange}
              inputProps={{
                name: 'currentRound',
                id: 'currentRound',
              }}
            >
              {this.props.competitionData.roundList.map(
                (round: any, index: number) => (
                  <MenuItem key={index} value={round}>
                    {round}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Paper>

        {this.props.currentRound && (
          <div className='row'>
            <div className='col-sm-6'>
              <div className='row'>
                <div className='col-sm-12'>
                  {this.props.currentRound.matchList && (
                    <MatchList
                      matchList={this.props.currentRound.matchList}
                      currentUrl={this.props.match.url}
                    />
                  )}
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-12'>
                  {this.props.currentRound.teamStatsRoundList && (
                    <TableLeague
                      teamStatsRoundList={
                        this.props.currentRound.teamStatsRoundList
                      }
                    />
                  )}
                </div>
              </div>
            </div>
            <div className='col-sm-6'>
              {this.props.currentRound.scorers && (
                <ScorersTable scorersList={this.props.currentRound.scorers} />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: FootballState) => {
  return {
    currentRound: getCurrentCompetitionRounds(state),
  };
};

const mapDispatchToProps = (dispatch: FootballDispatch) => {
  return {
    loadRoundData: (competitionId: number, round: any) =>
      dispatch(actionCreators.loadCompetitionRound(competitionId, round)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CompetitionRounds));
