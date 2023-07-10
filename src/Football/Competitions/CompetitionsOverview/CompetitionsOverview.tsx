import React, { useEffect } from 'react';
import { Link, RouteComponentProps, useRouteMatch } from 'react-router-dom';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import './CompetitionsOverview.scss';
import { useAppDispatch } from '../../store/store';
import { loadCompetitionList } from '../store/competitions.actions';
import { useSelector } from 'react-redux';
import { getCompetitionList } from '../store/competitions.selectors';

interface MatchParams {
  id: string;
}

const CompetitionsOverview = () => {
  const { url } = useRouteMatch();
  const competitionList = useSelector(getCompetitionList);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadCompetitionList())
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

      {competitionList && (
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
              {competitionList.map((competition) => (
                <TableRow key={competition.id}>
                  <TableCell component='th' scope='row'>
                    <Link
                      to={{
                        pathname:
                          url +
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

export default withStyles(styles)(CompetitionsOverview);
