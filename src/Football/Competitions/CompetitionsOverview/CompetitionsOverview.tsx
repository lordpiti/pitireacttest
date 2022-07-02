import React, { useEffect } from 'react';
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
import { FootballDispatch, FootballState } from '../../store';
import './CompetitionsOverview.scss';

interface MatchParams {
  id: string;
}

export interface CompetitionsOverviewProps
  extends RouteComponentProps<MatchParams> {
  loadCompetitions: Function;
  competitionList: any[];
}

const CompetitionsOverview = (props: CompetitionsOverviewProps) => {
  useEffect(() => {
    props.loadCompetitions();
  }, []);

  return (
    <>
      <div className='competitionOverviewButtonArea'>
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
      </div>

      {props.competitionList && (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Competition name</TableCell>
                <TableCell>Season</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.competitionList.map((competition) => (
                <TableRow key={competition.id}>
                  <TableCell component='th' scope='row'>
                    <Link
                      to={{
                        pathname:
                          props.match.url +
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
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </>
  );
};

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
