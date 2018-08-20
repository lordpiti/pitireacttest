import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import TeamInfo from '../TeamInfo/TeamInfo';
import TeamSquad from '../TeamSquad/TeamSquad';
import SideMenu from '../../components/SideMenu/SideMenu';

class TeamDetails extends Component {

    render () {

        const teamId = this.props.match.params.id;

        const esaList = [
            {
                name: 'Summary',
                url: this.props.match.url+'/overview'
            },
            {
                name: 'Squad',
                url: this.props.match.url+'/team-squad'
            }
        ];

        return (
            <div className="Teams">
                <div className="row">
                    <div className="col-sm-3">
                        <SideMenu itemList={esaList} />
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