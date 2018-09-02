import React, { Component } from 'react';
import MyMapComponent from './MyGoogleMaps/MyGoogleMaps';
import axios from 'axios';

class TeamStadium extends Component {

  state = {
    googleData: null
  }

  componentDidMount(){
    const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';

    axios.create().get(`${apiUrl}address=${this.props.stadium.name}}`).then(response => {
      if (response.data && response.data.status === 'OK' && response.data.results) {
        this.setState({ googleData: response.data});
      }
    });
  }

  render() {

    let mapComponent = null;

    if (this.state.googleData) {
      mapComponent = 
      <div>
        <h1>Stadium</h1>
        <MyMapComponent isMarkerShown googleData={this.state.googleData} />
      </div>  
    }

    return <div>{mapComponent}</div>
  }
}

export default TeamStadium;