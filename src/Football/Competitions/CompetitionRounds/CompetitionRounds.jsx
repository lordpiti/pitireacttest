import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import apiInstance from '../../utilities/axios-test';
import MatchList from './MatchList/MatchList';
import TableLeague from './TableLeague/TableLeague';
import ScorersTable from './ScorersTable/ScorersTable';
import { Paper } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  boxSelectRound: {
    marginBottom: 20,
    padding: 10
  }
});

class CompetitionRounds extends React.Component {

  _isMounted = false;

  state = {
    currentRound: '1',
    name: 'hai',
    roundList: this.props.competitionData.roundList
  };

  componentDidMount() {

    this._isMounted = true;
    this.loadRoundData(1);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.loadRoundData(event.target.value);
  };

  loadRoundData = roundNumber => {
    apiInstance.get(`competition/${this.props.competitionData.id}/round/${roundNumber}`).then(response => {
      // used the _isMounted property to prevent the warning from the react compiler
      // https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component/
      if (this._isMounted) {
        this.setState({
          roundData: response.data
        });
      }
    });
  }

  render() {
    const { classes } = this.props;

    const selectRound =
    <Paper className={classes.boxSelectRound}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="currentRound">Select Round</InputLabel>
        <Select
          value={this.state.currentRound}
          onChange={this.handleChange}
          inputProps={{
            name: 'currentRound',
            id: 'currentRound',
          }}
        >
          {this.state.roundList.map((round, index) =>
            <MenuItem key={index} value={round}>{round}</MenuItem>
          )}
        </Select>
      </FormControl>
    </Paper>;

    let matchList, tableRound, scorersTable = null;

    if (this.state.roundData) {
      matchList =
        <MatchList matchList={this.state.roundData.matchList} currentUrl={this.props.match.url} />;
      tableRound =
        <TableLeague teamStatsRoundList={this.state.roundData.teamStatsRoundList} />;
      scorersTable = <ScorersTable scorersList={this.state.roundData.scorers} />
    }

    return (
      <div>
        <h1>Competition Games</h1>
        
        {selectRound}

        <div className="row">
          <div className="col-sm-6">
            <div className="row">
              <div className="col-sm-12">
                {matchList}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                {scorersTable}
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            {tableRound}
          </div>
        </div>
      </div>
    );
  }
}

CompetitionRounds.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CompetitionRounds);
