import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/playersActions';
import TableWithFilteringAndPagination from '../../components/TableWithPagination/TableWithFilteringAndPagination';
import { TableRow, TableCell, TableHead, TableBody } from '@material-ui/core';
import { Link, RouteComponentProps } from 'react-router-dom';
import { FootballState } from '../../store';
import { FootballDispatch } from '../../store/middleware/thunkMiddleware';

interface PlayersOverviewParams {
  id: string;
}

export interface PlayersOverviewProps
  extends RouteComponentProps<PlayersOverviewParams> {
  loadPlayers: Function;
  playerList: any[];
  loading?: boolean;
  filteredPlayers: any[];
  filterPlayers: (...args: any[]) => any;
}

class PlayersOverview extends Component<PlayersOverviewProps> {
  componentDidMount() {
    this.props.loadPlayers();
  }

  render() {
    let content = <div>LOADING</div>;

    const renderTableContent = (rowsWithData: any[]) => {
      const playerList = rowsWithData.map((row) => {
        return (
          <TableRow key={row.id}>
            <TableCell component='th' scope='row'>
              <Link
                to={{
                  pathname: this.props.match.url + '/player-details/' + row.id,
                }}
              >
                <div>
                  {row.name} {row.surname}
                </div>
              </Link>
            </TableCell>
            <TableCell>{row.team}</TableCell>
          </TableRow>
        );
      });

      return (
        <Fragment>
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell>Team</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{playerList}</TableBody>
        </Fragment>
      );
    };

    if (!this.props.loading) {
      content = (
        <TableWithFilteringAndPagination
          filteredData={this.props.filteredPlayers}
          filterData={this.props.filterPlayers}
          renderTableContent={renderTableContent}
          {...this.props}
        />
      );
    }

    return content;
  }
}

const mapStateToProps = (state: FootballState) => {
  return {
    allPlayers: state.players.players,
    filteredPlayers: state.players.filteredPlayers,
    loading: state.players.loading,
  };
};

const mapDispatchToProps = (dispatch: FootballDispatch) => {
  return {
    loadPlayers: () => dispatch(actionCreators.loadPlayerListAction()),
    filterPlayers: (stringFilter: string) =>
      dispatch(actionCreators.filterPlayerListAction(stringFilter)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayersOverview);
