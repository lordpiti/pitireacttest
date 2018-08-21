import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import apiInstance from '../../../axios-test';
import MatchList from './MatchList/MatchList';
import TableLeague from './TableLeague/TableLeague';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class CompetitionRounds extends React.Component {
  state = {
    currentRound: '1',
    name: 'hai',
    roundList: this.props.competitionData.roundList
  };

  constructor(props) {
    super(props);

    apiInstance.get('competition/'+1+'/round/'+1).then(response => {
        this.setState({
          roundData: response.data
        });
      });
    }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    apiInstance.get('competition/'+this.props.competitionData.id+'/round/'+event.target.value).then(response => {
        this.setState({
          roundData: response.data
        });
      });
  };

  render() {
    const { classes } = this.props;

    const selectRound = 
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
            {this.state.roundList.map((round, index)=> 
                <MenuItem key={index} value={round}>{round}</MenuItem>
            )}
            </Select>
        </FormControl>;

        let matchList, tableRound = null;

        if (this.state.roundData) {
            matchList = 
                <MatchList matchList={this.state.roundData.matchList} />;
            tableRound =
                <TableLeague teamStatsRoundList={this.state.roundData.teamStatsRoundList}></TableLeague>
        }

    return (
        <div>
            <h1>Competition Games</h1>
            {selectRound}
            <div className="row">
                <div className="col-sm-6">
                    {matchList}
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
