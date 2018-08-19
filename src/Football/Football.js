import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Competitions from './Competitions/Competitions';
import Teams from './Teams/Teams';
import Button from '@material-ui/core/Button';
import GoogleLoginButton from './Authentication/GoogleAuthenticator';

class Football extends Component {

    state = {
        authenticationToken: localStorage.token_react
    }

    updateAuthenticationToken(token) {
        if (token){
            localStorage.setItem('token_react', token);
        }
        else {
            localStorage.removeItem('token_react');
        }
        
        this.setState({
            authenticationToken: token
        });
    }

    render () {
        return (
            <div className="Football">
                <header>
                    <nav>
                        <GoogleLoginButton
                            authenticationToken={this.state.authenticationToken}
                            authenticationTokenUpdate={(token) => this.updateAuthenticationToken(token)}
                        ></GoogleLoginButton>

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