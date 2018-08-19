import React, { Component } from 'react';
import apiInstance from '../../../axios-test';
import { Link } from 'react-router-dom';

class CompetitionsOverview extends Component {

    constructor(props){
        super(props);
        apiInstance.get('competition').then(response => {
          this.setState({
            competitions: response.data
          });
        })
      }
    render () {
        let competitionList = null;
        if (this.state && this.state.competitions) {
            competitionList = this.state.competitions.map(competition => 
                <li key={competition.id}>
                    <Link to={{
                            pathname: this.props.match.url+'/competition-details/'+competition.id
                        }}>
                        <div>{competition.name}</div>
                    </Link>
                </li>);
        }

        return (
            <div>
                <ul>
                {competitionList}
                </ul>
            </div>
        );
    }
}

export default CompetitionsOverview;