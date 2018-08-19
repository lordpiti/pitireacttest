import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import CompetitionInfo from '../CompetitionInfo/CompetitionInfo';
import CompetitionRounds from '../CompetitionRounds/CompetitionRounds';

class CompetitionDetails extends Component {

    render () {
        const competitionId = this.props.match.params.id;

        return (
            <div className="CompetitionDetails">
                <div className="row">
                    <div className="col-sm-3">
                        <ul>
                            <li><Link to={{
                                pathname: this.props.match.url+'/competition-rounds'
                            }}>Rounds</Link></li>
                                <li><Link to={{
                                pathname: this.props.match.url+'/overview'
                            }}>Info</Link></li>
                        </ul>
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