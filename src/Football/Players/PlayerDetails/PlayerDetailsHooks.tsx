import { Route, Redirect, useRouteMatch, useParams } from 'react-router-dom';
// import asyncComponent from '../../components/asyncComponent/asyncComponent';
import PlayerStatistics from '../PlayerStatistics/PlayerStatisticsOnDemand';
// import PlayerStatistics from '../PlayerStatistics/PlayerStatistics';
import SideMenu from '../../components/SideMenu/SideMenu';
import Match from '../../Competitions/Match/Match';
import './PlayerDetails.scss';
import PlayerInfo from '../PlayerInfo/PlayerInfo';
import { PlayerDetailsContainer } from './PlayerDetailsContainer';

// const asyncPlayerInfo = asyncComponent(() => {
//   return import('../PlayerInfo/PlayerInfo');
// });

interface PlayerDetailsParams {
  id: string;
}

export const PlayerDetails = () => {
  const { url } = useRouteMatch();
  const { id } = useParams<PlayerDetailsParams>();

  const itemList = [
    {
      name: 'Summary',
      url: url + '/overview',
    },
    {
      name: 'Statistics',
      url: url + '/player-statistics',
    },
  ];

  return (<PlayerDetailsContainer playerId={id}>
    {({ currentPlayer }) => {
      return (currentPlayer ? (<div className='player-details'>
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
            path={url + '/'}
            exact
            render={() => (
              <Redirect to={url + '/overview'} />
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
            path={url + '/overview'}
            component={() => {
              return (
                <PlayerInfo
                  playerData={currentPlayer}
                ></PlayerInfo>
              );
            }}
          />
          <Route
            path={url + '/player-statistics'}
            render={() => {
              return <PlayerStatistics playerId={currentPlayer.playerId}></PlayerStatistics>;
            }}
            exact
          />
          <Route
            path={url + '/player-statistics/match/:id'}
            component={Match}
          />
        </div>
      </div>) : <div></div>)
    }}
  </PlayerDetailsContainer>
  );
}
