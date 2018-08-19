import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import TeamInfo from '../TeamInfo/TeamInfo';
import TeamSquad from '../TeamSquad/TeamSquad';

class TeamDetails extends Component {

    render () {

        const teamId = this.props.match.params.id;

        return (
            <div className="Teams">
                <div className="row">
                    <div className="col-sm-3">
                        <ul>
                            <li><Link to={{
                                pathname: this.props.match.url+'/team-squad'
                            }}>Squad</Link></li>
                                <li><Link to={{
                                pathname: this.props.match.url+'/overview'
                            }}>Info</Link></li>
                        </ul>
                    </div>
                    <div className="col-sm-9">
                        <Route path={this.props.match.url+'/'} exact 
                            render={(props)=>{
                                return (
                                <TeamInfo id={teamId}></TeamInfo>)}
                        } />
                        <Route path={this.props.match.url+'/overview'}
                            render={(props)=>{
                                return (
                                <TeamInfo id={teamId}></TeamInfo>)}
                        } />
                    <Route path={this.props.match.url+'/team-squad'} 
                        render={(props)=>{
                            return (
                            <TeamSquad id={teamId}></TeamSquad>)}
                        }
                    />
                    </div>
                </div>
            </div>
        );
    }
}

export default TeamDetails;