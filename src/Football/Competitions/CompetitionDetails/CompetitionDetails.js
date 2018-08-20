import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import CompetitionInfo from '../CompetitionInfo/CompetitionInfo';
import CompetitionRounds from '../CompetitionRounds/CompetitionRounds';
import SideMenu from '../../components/SideMenu/SideMenu';

class CompetitionDetails extends Component {

    render () {
        const competitionId = this.props.match.params.id;

        const menuItemList = [
            {
                name: 'Summary',
                url: this.props.match.url+'/overview'
            },
            {
                name: 'Rounds',
                url: this.props.match.url+'/competition-rounds'
            }
        ];

        return (
            <div className="CompetitionDetails">
                <div className="row">
                    <div className="col-sm-3">
                        <SideMenu itemList={menuItemList} />
                    </div>
                    <div className="col-sm-9">
                        <Route path={this.props.match.url+'/'} exact 
                            render={(props)=>{
                                return (
                                <CompetitionInfo id={competitionId}></CompetitionInfo>)}
                        } />
                        <Route path={this.props.match.url+'/overview'}
                            render={(props)=>{
                                return (
                                <CompetitionInfo id={competitionId}></CompetitionInfo>)}
                        } />
                    <Route path={this.props.match.url+'/competition-rounds'} 
                        render={(props)=>{
                            return (
                            <CompetitionRounds id={competitionId}></CompetitionRounds>)}
                        }
                    />
                    </div>
                </div>
            </div>
        );
    }
}

export default CompetitionDetails;