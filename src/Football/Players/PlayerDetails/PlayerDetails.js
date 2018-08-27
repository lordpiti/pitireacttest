import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import PlayerInfo from '../PlayerInfo/PlayerInfo';
import PlayerStatistics from '../PlayerStatistics/PlayerStatistics';
import PlayerGraphicChart from '../PlayerGraphicChart/PlayerGraphicChart';
import SideMenu from '../../components/SideMenu/SideMenu';
import apiInstance from '../../utilities/axios-test';

class TeamDetails extends Component {

  constructor(props) {
    super(props);
    apiInstance.get('player/'+props.match.params.id).then(response => {
      this.setState({
        playerData: response.data
      });
    });
  }

  state = {
    playerData: null
  }

  render () {

    const playerId = this.props.match.params.id;

    const itemList = [
    {
      name: 'Summary',
      url: this.props.match.url+'/overview'
    },
    {
      name: 'Statistics',
      url: this.props.match.url+'/player-statistics'
    },
    {
      name: 'Charts',
      url: this.props.match.url+'/player-charts'
    }
    ];

    let pageContent = null;

    if (this.state.playerData) {
      pageContent =       
        <div className="Players">
          <div className="row">
            <div className="col-sm-3">
              <span>{this.state.playerData.name}</span>
              <SideMenu itemList={itemList} />
            </div>
            <div className="col-sm-9">
              <Route path={this.props.match.url+'/'} exact 
                render={() => (<Redirect to={this.props.match.url+'/overview'} />)}
              />
              <Route path={this.props.match.url+'/overview'}
                render={(props)=>{
                  return (
                  <PlayerInfo playerData={this.state.playerData} id={playerId}></PlayerInfo>)}
              } />
              <Route path={this.props.match.url+'/player-statistics'} 
                render={(props)=>{
                  return (
                  <PlayerStatistics id={playerId}></PlayerStatistics>)}
                }
              />
              <Route path={this.props.match.url+'/player-charts'} 
                render={(props)=>{
                  return (
                  <PlayerGraphicChart id={playerId}></PlayerGraphicChart>)}
                }
              />
            </div>
          </div>
        </div>
    }

    return (
      <div>
      {pageContent}</div>
    );
  }
}

export default TeamDetails;