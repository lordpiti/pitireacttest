import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import TableWithFilteringAndPagination from '../../components/TableWithPagination/TableWithFilteringAndPagination';
import { TableRow, TableCell, TableHead, TableBody } from '@material-ui/core';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { loadPlayerList } from '../store/players.actions';
import { useAppDispatch } from '../../store/store';
import { filterPlayerListSuccess } from '../store/players.reducer';
import { getFilteredPlayers, isLoading } from '../store/players.selectors';

interface PlayersOverviewParams {
  id: string;
}

export interface PlayersOverviewProps
  extends RouteComponentProps<PlayersOverviewParams> {
}

const PlayersOverview = (props: PlayersOverviewProps) => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPlayerList());
  }, []);

  const filterPlayersHandle = (stringFilter: string) => {
    dispatch(filterPlayerListSuccess(stringFilter));
  }

  const loading = useSelector(isLoading);

  const filteredPlayers = useSelector(getFilteredPlayers);

  let content = <div>LOADING</div>;

  const renderTableContent = (rowsWithData: any[]) => {
    const playerList = rowsWithData.map((row) => {
      return (
        <TableRow key={row.id}>
          <TableCell component='th' scope='row'>
            <Link
              to={{
                pathname: props.match.url + '/player-details/' + row.id,
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
      <>
        <TableHead>
          <TableRow>
            <TableCell>Player</TableCell>
            <TableCell>Team</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{playerList}</TableBody>
      </>
    );
  };

  if (!loading) {
    content = (
      <TableWithFilteringAndPagination
        filteredData={filteredPlayers}
        filterData={filterPlayersHandle}
        renderTableContent={renderTableContent}
        {...props}
      />
    );
  }

  return content;
}

export default withRouter(PlayersOverview);