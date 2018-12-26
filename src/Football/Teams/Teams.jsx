import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import TeamDetails from './TeamDetails/TeamDetails';
import TeamsOverview from './TeamsOverview/TeamsOverview';

class Teams extends Component {

    render () {
        return <div className="teams">
            <Route path={this.props.match.url+"/"} exact component={TeamsOverview} />
            <Route path={this.props.match.url+'/team-details/:id'} component={TeamDetails} />
        </div>
    }
}

export default Teams;