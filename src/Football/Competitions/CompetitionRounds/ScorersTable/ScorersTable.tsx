import React, { Component } from 'react';
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@material-ui/core';

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing(2.5),
    },
  })
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

const TablePaginationActions = (props: TablePaginationActionsProps) => {
  const handleFirstPageButtonClick = (event: any) => {
    props.onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    props.onChangePage(event, props.page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    props.onChangePage(event, props.page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    props.onChangePage(
      event,
      Math.max(0, Math.ceil(props.count / props.rowsPerPage) - 1)
    );
  };

  const { count, page, rowsPerPage } = props;
  const classes = useStyles1();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='First Page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='Previous Page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='Next Page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='Last Page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    table: {
      minWidth: 500,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
  });

class Scorers extends Component<any, any> {
  state = {
    page: 0,
    rowsPerPage: 10,
  };

  handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event: any) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rowsPerPage, page } = this.state;
    const rows = this.props.scorersList;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <Card>
        <CardHeader title='Scorers' />
        <CardContent>
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => {
                    return (
                      <TableRow key={row.player.playerId}>
                        <TableCell component='th' scope='row'>
                          <Link
                            to={{
                              pathname:
                                '/players/player-details/' +
                                row.player.playerId,
                            }}
                          >
                            <div>
                              {row.player.name} {row.player.surname}
                            </div>
                          </Link>
                        </TableCell>
                        <TableCell>{row.player.teamName}</TableCell>
                        <TableCell>{row.goals}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 48 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={3}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Scorers);
