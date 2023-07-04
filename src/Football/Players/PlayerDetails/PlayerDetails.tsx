import { useEffect } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
// import asyncComponent from '../../components/asyncComponent/asyncComponent';
//import PlayerStatistics from '../PlayerStatistics/PlayerStatisticsOnDemand';
import PlayerStatistics from '../PlayerStatistics/PlayerStatistics';
import SideMenu from '../../components/SideMenu/SideMenu';
import Match from '../../Competitions/Match/Match';
import { connect, useSelector } from 'react-redux';
import './PlayerDetails.scss';
import PlayerInfo from '../PlayerInfo/PlayerInfo';
import { useAppDispatch } from '../../store/store';
import { loadPlayer } from '../store/players.actions';
import { getCurrentPlayer } from '../store/players.selectors';

// const asyncPlayerInfo = asyncComponent(() => {
//   return import('../PlayerInfo/PlayerInfo');
// });

interface PlayerDetailsParams {
  id: string;
}

interface PlayerDetailsProps extends RouteComponentProps<PlayerDetailsParams> {
  loadPlayer: Function;
  currentPlayer: any;
}

const PlayerDetails = (props: PlayerDetailsProps) => {

  const dispatch = useAppDispatch();
  const currentPlayer = useSelector(getCurrentPlayer);

  useEffect(() => {
    dispatch(loadPlayer(parseInt(props.match.params.id)));
  }, [props.match.params.id]);

  const itemList = [
    {
      name: 'Summary',
      url: props.match.url + '/overview',
    },
    {
      name: 'Statistics',
      url: props.match.url + '/player-statistics',
    },
  ];

  let pageContent = null;

  if (currentPlayer) {
    pageContent = (
      <div className='player-details'>
        <div className='sidebar'>
          <SideMenu itemList={itemList}>
            <div className='margin-bottom-medium'>
              <img
                src={currentPlayer.picture.url}
                className='roundedImage'
                height='50'
                width='50'
                alt=''
              />
              <span>{`${currentPlayer.name} ${currentPlayer.surname}`}</span>
            </div>
          </SideMenu>
        </div>
        <div className='main-content'>
          <Route
            path={props.match.url + '/'}
            exact
            render={() => (
              <Redirect to={props.match.url + '/overview'} />
            )}
          />
          {/* <Route path={this.props.match.url + '/overview'}
                component={(props) => {
                  const PlayerInfo = asyncPlayerInfo; 
                  return (         
                    <PlayerInfo playerData={this.props.currentPlayer} id={playerId}></PlayerInfo>)
                }
                } /> */}
          <Route
            path={props.match.url + '/overview'}
            component={() => {
              return (
                <PlayerInfo
                  playerData={currentPlayer}
                ></PlayerInfo>
              );
            }}
          />
          <Route
            path={props.match.url + '/player-statistics'}
            render={() => {
              return <PlayerStatistics playerId={currentPlayer.id}></PlayerStatistics>;
            }}
            exact
          />
          <Route
            path={props.match.url + '/player-statistics/match/:id'}
            component={Match}
          />
        </div>
      </div>
    );
  }

  return <>{pageContent}</>;
}

export default PlayerDetails;
