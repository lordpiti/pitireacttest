import React, { Component } from 'react';
// import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import Competitions from './Competitions/Competitions';
import Teams from './Teams/Teams';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

class Football extends Component {
    render () {
        return (
            <div className="Football">
                <header>
                    <nav>
                    <Button variant="contained" color="primary">
                        <Link style={{color: 'white'}} to="/">Home</Link>
                    </Button>

                    <Button variant="contained" color="primary">
                        <Link style={{color: 'white'}} to={{
                            pathname: '/teams'
                        }}>Teams</Link>
                    </Button>

                    <Button variant="contained" color="primary">
                        <Link style={{color: 'white'}} to={{
                            pathname: '/competitions'
                        }}>Competitions</Link>
                    </Button>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1>} />
                <Route path="/" render={() => <h1>Home 2</h1>} /> 
                <Route path="/" exact component={Teams} />*/}
                <Route path="/teams" component={Teams} />
                <Route path="/competitions" component={Competitions} />
            </div>
        );
    }
}

export default Football;