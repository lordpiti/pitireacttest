import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
// import asyncComponent from '../../components/asyncComponent/asyncComponent';
import PlayerStatistics from '../PlayerStatistics/PlayerStatistics';
import SideMenu from '../../components/SideMenu/SideMenu';
import Match from '../../Competitions/Match/Match';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/players';
import './PlayerDetails.css';
import PlayerInfo from '../PlayerInfo/PlayerInfo';

// const asyncPlayerInfo = asyncComponent(() => {
//   return import('../PlayerInfo/PlayerInfo');
// }); 

class PlayerDetails extends Component {

  componentDidMount() {
    this.props.loadPlayer(this.props.match.params.id);
  }

  render() {

    const playerId = this.props.match.params.id;

    const itemList = [
      {
        name: 'Summary',
        url: this.props.match.url + '/overview'
      },
      {
        name: 'Statistics',
        url: this.props.match.url + '/player-statistics'
      }
    ];

    let pageContent = null;

    if (this.props.currentPlayer) {
      pageContent =
        <div className="Players">
          <div className="row">
            <div className="col-sm-3">
              <SideMenu itemList={itemList} >
                <div className="margin-bottom-medium">
                  <img src={this.props.currentPlayer.picture.url} className="roundedImage" height="50" width="50" alt="" />
                  <span>{`${this.props.currentPlayer.name} ${this.props.currentPlayer.surname}`}</span>
                </div>
              </SideMenu>
            </div>
            <div className="col-sm-9">
              <Route path={this.props.match.url + '/'} exact
                render={() => (<Redirect to={this.props.match.url + '/overview'} />)}
              />
              {/* <Route path={this.props.match.url + '/overview'}
                component={(props) => {
                  const PlayerInfo = asyncPlayerInfo; 
                  return (         
                    <PlayerInfo playerData={this.props.currentPlayer} id={playerId}></PlayerInfo>)
                }
                } /> */}
              <Route path={this.props.match.url + '/overview'}
                component={(props) => {
                  return (         
                    <PlayerInfo playerData={this.props.currentPlayer} id={playerId}></PlayerInfo>)
                }
                } />
              <Route path={this.props.match.url + '/player-statistics'}
                render={(props) => {
                  return (
                    <PlayerStatistics id={playerId}  {...this.props}></PlayerStatistics>)
                }
                }
                exact />
              <Route path={this.props.match.url + '/player-statistics/match/:id'}
                component={Match}
              />
            </div>
          </div>
        </div>
    }

    return (
      <div>
        {pageContent}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPlayer: state.players.currentPlayer
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadPlayer: (playerId) => dispatch(actionCreators.loadPlayer(playerId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDetails);