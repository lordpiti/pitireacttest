import React, { Component } from 'react';
// import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import Competitions from './Competitions/Competitions';
import Teams from './Teams/Teams';

class Football extends Component {
    render () {
        return (
            <div className="Football">
                <header>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to={{
                                pathname: '/teams'
                            }}>Teams</Link></li>
                             <li><Link to={{
                                pathname: '/competitions'
                            }}>Competitions</Link></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1>} />
                <Route path="/" render={() => <h1>Home 2</h1>} /> 
                <Route path="/" exact component={Teams} />*/}
                <Route path="/teams" component={Teams} />
                <Route path="/competitions" exact component={Competitions} />
            </div>
        );
    }
}

export default Football;