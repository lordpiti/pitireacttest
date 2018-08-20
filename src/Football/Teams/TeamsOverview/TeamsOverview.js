import React, { Component } from 'react';
import apiInstance from '../../../axios-test';
import { Link } from 'react-router-dom';

class TeamsOverview extends Component {

    constructor(props){
        super(props);
        apiInstance.get('team/teams/').then(response => {
          this.setState({
            teams: response.data
          });
        })
      }
    render () {
        let teamList = null;
        if (this.state && this.state.teams) {
            teamList= this.state.teams.map(team => 
                <div class="col-sm-2 text-center" key={team.id}>
                    <Link to={{
                             pathname: this.props.match.url+'/team-details/'+team.id
                         }}>
                         <img src={team.pictureLogo.url} width="50" height="50" alt="logo"/>
                         <div>{team.name}</div>
                     </Link>
                </div>
            );
        }

        return (
            <div class="row">
                {teamList}
            </div>
        );
    }
}

export default TeamsOverview;