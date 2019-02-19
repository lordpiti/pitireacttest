import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PlayerDetails from './PlayerDetails/PlayerDetails';
import PlayersOverview from './PlayersOverview/PlayersOverview';

class Players extends Component {

    render () {
        return <div className="players">
            <Route path={this.props.match.url+"/"} exact component={PlayersOverview} />
            <Route path={this.props.match.url+'/player-details/:id'} component={PlayerDetails} />
        </div>
    }
}

export default Players;