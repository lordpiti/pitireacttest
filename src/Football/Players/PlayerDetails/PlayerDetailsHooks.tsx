import React from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
// import asyncComponent from '../../components/asyncComponent/asyncComponent';
//import PlayerStatistics from '../PlayerStatistics/PlayerStatisticsOnDemand';
import PlayerStatistics from '../PlayerStatistics/PlayerStatistics';
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

interface PlayerDetailsProps extends RouteComponentProps<PlayerDetailsParams> {

}

export const PlayerDetails = (props: PlayerDetailsProps) => {
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

  return (<PlayerDetailsContainer playerId={props.match.params.id}>
    {({ currentPlayer }: any) => {
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
            render={(props) => {
              return <PlayerStatistics playerId={currentPlayer.playerId}></PlayerStatistics>;
            }}
            exact
          />
          <Route
            path={props.match.url + '/player-statistics/match/:id'}
            component={Match}
          />
        </div>
      </div>) : <div></div>)
    }}
  </PlayerDetailsContainer>
  );
}
