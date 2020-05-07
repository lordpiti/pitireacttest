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
import apiInstance from '../../utilities/axios-test';
import MatchList from './MatchList/MatchList';
import TableLeague from './TableLeague/TableLeague';
import ScorersTable from './ScorersTable/ScorersTable';
import { Paper } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';

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
  roundList: any[];
  roundData?: any;
}

interface CompetitionRoundsProps
  extends RouteComponentProps,
    WithStyles<typeof styles> {
  competitionData: any;
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
      roundList: this.props.competitionData.roundList,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadRoundData(1);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value } as any);
    this.loadRoundData(event.target.value);
  };

  loadRoundData = (roundNumber: any) => {
    apiInstance
      .get(`competition/${this.props.competitionData.id}/round/${roundNumber}`)
      .then((response: any) => {
        // used the _isMounted property to prevent the warning from the react compiler
        // https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component/
        if (this._isMounted) {
          this.setState({
            roundData: response.data,
          });
        }
      });
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
              {this.state.roundList.map((round: any, index: number) => (
                <MenuItem key={index} value={round}>
                  {round}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>

        {this.state.roundData && (
          <div className='row'>
            <div className='col-sm-6'>
              <div className='row'>
                <div className='col-sm-12'>
                  {this.state.roundData.matchList && (
                    <MatchList
                      matchList={this.state.roundData.matchList}
                      currentUrl={this.props.match.url}
                    />
                  )}
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-12'>
                  {this.state.roundData.teamStatsRoundList && (
                    <TableLeague
                      teamStatsRoundList={
                        this.state.roundData.teamStatsRoundList
                      }
                    />
                  )}
                </div>
              </div>
            </div>
            <div className='col-sm-6'>
              {this.state.roundData.scorers && (
                <ScorersTable scorersList={this.state.roundData.scorers} />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(CompetitionRounds);
