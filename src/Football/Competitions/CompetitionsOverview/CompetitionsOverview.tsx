import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/competitionsActions';
import { FootballState, FootballDispatch } from '../../..';

interface MatchParams {
  id: string;
}

export interface CompetitionsOverviewProps
  extends RouteComponentProps<MatchParams> {
  loadCompetitions: Function;
  competitionList: any[];
}

class CompetitionsOverview extends Component<CompetitionsOverviewProps> {
  componentDidMount() {
    this.props.loadCompetitions();
  }

  render() {
    let competitionList = null;
    let totalTable = null;
    if (this.props.competitionList) {
      competitionList = this.props.competitionList.map((competition) => (
        <TableRow key={competition.id}>
          <TableCell component='th' scope='row'>
            <Link
              to={{
                pathname:
                  this.props.match.url +
                  '/competition-details/' +
                  competition.id,
              }}
            >
              <div>{competition.name}</div>
            </Link>
          </TableCell>
          <TableCell>{competition.season}</TableCell>
          <TableCell>{competition.type}</TableCell>
        </TableRow>
      ));
      totalTable = (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Competition name</TableCell>
                <TableCell>Season</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{competitionList}</TableBody>
          </Table>
        </Paper>
      );
    }

    return (
      <div>
        <Link
          style={{ color: 'white' }}
          to={{
            pathname: '/competitions/competition-simulation',
          }}
        >
          <Button variant='contained' color='primary'>
            Competition Simulation
          </Button>
        </Link>
        {totalTable}
      </div>
    );
  }
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });

const mapStateToProps = (state: FootballState) => {
  return {
    competitionList: state.competitions.competitionList,
  };
};

const mapDispatchToProps = (dispatch: FootballDispatch) => {
  return {
    loadCompetitions: () => dispatch(actionCreators.loadCompetitionList()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CompetitionsOverview));
