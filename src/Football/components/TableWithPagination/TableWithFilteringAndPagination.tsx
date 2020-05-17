import React, { Component } from 'react';
import {
  TextField,
  Paper,
  Table,
  TableRow,
  TablePagination,
  TableFooter,
} from '@material-ui/core';
import TablePaginationActionsWrapped from './TablePaginationActions/TablePaginationActions';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';

class TableWithFilteringAndPagination extends Component<any, any> {
  state = {
    rows: [],
    page: 0,
    rowsPerPage: 10,
  };

  handleChangePage = (event: any, page: any) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event: any) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rowsPerPage, page } = this.state;

    const setSearch = (column: any, styy: any) => {
      this.props.filterData(styy);
    };

    const tableHeaderAndRows = this.props.renderTableContent(
      this.props.filteredData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
    );

    const content = (
      <Paper className={classes.root}>
        <TextField
          id='searchPlayerText'
          label='Search player'
          defaultValue=''
          className={classes.textField}
          margin='normal'
          onChange={(e) => {
            setSearch('demo', e.target.value);
          }}
        />
        <Table className={classes.table}>
          {tableHeaderAndRows}
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={2}
                count={this.props.filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActionsWrapped}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );

    return <div>{content}</div>;
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
      minWidth: 200,
    },
  });

export default withStyles(styles)(TableWithFilteringAndPagination);
