import React, { Component } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
// import asyncComponent from '../../components/asyncComponent/asyncComponent';
import PlayerStatistics from '../PlayerStatistics/PlayerStatistics';
import SideMenu from '../../components/SideMenu/SideMenu';
import Match from '../../Competitions/Match/Match';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/playersActions';
import './PlayerDetails.scss';
import PlayerInfo from '../PlayerInfo/PlayerInfo';
import { FootballState, FootballDispatch } from '../../..';

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

class PlayerDetails extends Component<PlayerDetailsProps> {
  componentDidMount() {
    this.props.loadPlayer(this.props.match.params.id);
  }

  render() {
    const itemList = [
      {
        name: 'Summary',
        url: this.props.match.url + '/overview',
      },
      {
        name: 'Statistics',
        url: this.props.match.url + '/player-statistics',
      },
    ];

    let pageContent = null;

    if (this.props.currentPlayer) {
      pageContent = (
        <div className='Players'>
          <div className='row'>
            <div className='col-sm-3'>
              <SideMenu itemList={itemList}>
                <div className='margin-bottom-medium'>
                  <img
                    src={this.props.currentPlayer.picture.url}
                    className='roundedImage'
                    height='50'
                    width='50'
                    alt=''
                  />
                  <span>{`${this.props.currentPlayer.name} ${this.props.currentPlayer.surname}`}</span>
                </div>
              </SideMenu>
            </div>
            <div className='col-sm-9'>
              <Route
                path={this.props.match.url + '/'}
                exact
                render={() => (
                  <Redirect to={this.props.match.url + '/overview'} />
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
                path={this.props.match.url + '/overview'}
                component={() => {
                  return (
                    <PlayerInfo
                      playerData={this.props.currentPlayer}
                    ></PlayerInfo>
                  );
                }}
              />
              <Route
                path={this.props.match.url + '/player-statistics'}
                render={(props) => {
                  return <PlayerStatistics {...this.props}></PlayerStatistics>;
                }}
                exact
              />
              <Route
                path={this.props.match.url + '/player-statistics/match/:id'}
                component={Match}
              />
            </div>
          </div>
        </div>
      );
    }

    return <div>{pageContent}</div>;
  }
}

const mapStateToProps = (state: FootballState) => {
  return {
    currentPlayer: state.players.currentPlayer,
  };
};

const mapDispatchToProps = (dispatch: FootballDispatch) => {
  return {
    loadPlayer: (playerId: number) =>
      dispatch(actionCreators.loadPlayerAction(playerId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDetails);
