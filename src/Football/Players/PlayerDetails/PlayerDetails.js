import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import PlayerInfo from '../PlayerInfo/PlayerInfo';
import PlayerStatistics from '../PlayerStatistics/PlayerStatistics';
import SideMenu from '../../components/SideMenu/SideMenu';

class TeamDetails extends Component {

    render () {

        const teamId = this.props.match.params.id;

        const itemList = [
            {
                name: 'Summary',
                url: this.props.match.url+'/overview'
            },
            {
                name: 'Statistics',
                url: this.props.match.url+'/player-statistics'
            }
        ];

        return (
            <div className="Players">
                <div className="row">
                    <div className="col-sm-3">
                        <SideMenu itemList={itemList} />
                    </div>
                    <div className="col-sm-9">
                        <Route path={this.props.match.url+'/'} exact 
                            render={() => (<Redirect to={this.props.match.url+'/overview'} />)}
                        />
                        <Route path={this.props.match.url+'/overview'}
                            render={(props)=>{
                                return (
                                <PlayerInfo id={teamId}></PlayerInfo>)}
                        } />
                    <Route path={this.props.match.url+'/player-statistics'} 
                        render={(props)=>{
                            return (
                            <PlayerStatistics id={teamId}></PlayerStatistics>)}
                        }
                    />
                    </div>
                </div>
            </div>
        );
    }
}

export default TeamDetails;