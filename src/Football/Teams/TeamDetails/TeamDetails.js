import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import TeamInfo from '../TeamInfo/TeamInfo';
import TeamSquad from '../TeamSquad/TeamSquad';
import SideMenu from '../../components/SideMenu/SideMenu';
import TeamStadium from '../TeamStadium/TeamStadium';
import apiInstance from '../../utilities/axios-test';

class TeamDetails extends Component {

  constructor(props) {
    super(props);
    apiInstance.get(`team/teams/${props.match.params.id}/year/2009/`).then(response => {
      this.setState({
        teamData: response.data
      });
    });
  }

  state = {
    teamData: null
  }

  render() {
    let content, menuContent = null;

    if (this.state.teamData) {
      menuContent = 
      <div className="margin-bottom-medium">
        <img src={this.state.teamData.pictureLogo.url} className="roundedImage" height="50" width="50" />
        <span>{this.state.teamData.name}</span>
      </div>
      content =
        <div>
          <Route path={this.props.match.url + '/'} exact
            render={() => (<Redirect to={this.props.match.url + '/overview'} />)}
          />
          <Route path={this.props.match.url + '/overview'}
            render={(props) => {
              return (
                <TeamInfo id={teamId}></TeamInfo>)
            }
            } />
          <Route path={this.props.match.url + '/team-squad'}
            render={(props) => {
              return (
                <TeamSquad players={this.state.teamData.playerList}></TeamSquad>)
            }
            }
          />

          <Route path={this.props.match.url + '/team-stadium'}
            render={(props) => {
              return (
                <TeamStadium stadium={this.state.teamData.stadium}></TeamStadium>)
            }
            }
          />
        </div>
    }

    const teamId = this.props.match.params.id;

    const menuList = [
      {
        name: 'Summary',
        url: this.props.match.url + '/overview'
      },
      {
        name: 'Squad',
        url: this.props.match.url + '/team-squad'
      },
      {
        name: 'Stadium',
        url: this.props.match.url + '/team-stadium'
      }
    ];

    return (
      <div className="Teams">
        <div className="row">
          <div className="col-sm-3">
            <SideMenu itemList={menuList}>
              {menuContent}
            </SideMenu>
          </div>
          <div className="col-sm-9">
            {content}
          </div>
        </div>
      </div>
    );
  }
}

export default TeamDetails;