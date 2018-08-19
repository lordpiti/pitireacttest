import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CompetitionDetails from './CompetitionDetails/CompetitionDetails';
import CompetitionsOverview from './CompetitionsOverview/CompetitionsOverview';

class Competitions extends Component {

    render () {
        return <div className="competitions">
            <Route path={this.props.match.url+"/"} exact component={CompetitionsOverview} />
            <Route path={this.props.match.url+'/competition-details/:id'} component={CompetitionDetails} />
        </div>
    }
}

export default Competitions;