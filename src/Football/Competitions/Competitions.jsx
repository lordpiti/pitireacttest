import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CompetitionDetails from './CompetitionDetails/CompetitionDetailsHooks';
import CompetitionsOverview from './CompetitionsOverview/CompetitionsOverview';
import CompetitionSimulation from './CompetitionSimulation/CompetitionSimulation';

class Competitions extends Component {

  render() {
    return <div className="competitions">
      <Route path={this.props.match.url + "/"} exact component={CompetitionsOverview} />
      <Route path={this.props.match.url + '/competition-details/:id'} component={CompetitionDetails} />
      <Route path={this.props.match.url + '/competition-simulation'} component={CompetitionSimulation} />
    </div>
  }
}

export default Competitions;