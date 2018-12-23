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
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  boxSelectRound: {
    marginBottom: 20,
    padding: 10
  }
});

class CompetitionRounds extends React.Component {
  state = {
    currentRound: '1',
    name: 'hai',
    roundList: this.props.competitionData.roundList
  };

  componentDidMount() {
    apiInstance.get('competition/' + this.props.competitionData.id + '/round/' + 1).then(response => {
      this.setState({
        roundData: response.data
      });
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    apiInstance.get('competition/' + this.props.competitionData.id + '/round/' + event.target.value).then(response => {
      this.setState({
        roundData: response.data
      });
    });
  };

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
