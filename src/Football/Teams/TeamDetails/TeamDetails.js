import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import TeamInfo from '../TeamInfo/TeamInfo';
import ComplexForm from '../ComplexForm/ComplexForm';
import TeamSquad from '../TeamSquad/TeamSquad';
import SideMenu from '../../components/SideMenu/SideMenu';
import TeamStadium from '../TeamStadium/TeamStadium';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/teams';


class TeamDetails extends Component {

  componentDidMount() {
    this.props.loadTeam(this.props.match.params.id);
  }

  render() {
    let content, menuContent = null;

    if (this.props.currentTeam) {
      menuContent = 
      <div className="margin-bottom-medium">
        <img src={this.props.currentTeam.pictureLogo.url} className="roundedImage" height="50" width="50" />
        <span>{this.props.currentTeam.name}</span>
      </div>
      content =
        <div>
          <Route path={this.props.match.url + '/'} exact
            render={() => (<Redirect to={this.props.match.url + '/overview'} />)}
          />
          <Route path={this.props.match.url + '/overview'}
            component={(props) => {
              return (
                <TeamInfo id={teamId} teamData={this.props.currentTeam}></TeamInfo>)
            }
            } />
          <Route path={this.props.match.url + '/team-squad'}
            render={(props) => {
              return (
                <TeamSquad players={this.props.currentTeam.playerList}></TeamSquad>)
            }
            }
          />

          <Route path={this.props.match.url + '/team-stadium'}
            render={(props) => {
              return (
                <TeamStadium stadium={this.props.currentTeam.stadium}></TeamStadium>)
            }
            }
          />

          <Route path={this.props.match.url + '/complex-form-sample'}
            component={(props) => {
              return (
                <ComplexForm id={teamId}></ComplexForm>)
            }
          } />
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
      },
      {
        name: 'Complex form sample',
        url: this.props.match.url + '/complex-form-sample'
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

const mapStateToProps = state => {
  return {
    currentTeam: state.teams.currentTeam
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadTeam: (teamId) => dispatch(actionCreators.loadTeam(teamId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetails);