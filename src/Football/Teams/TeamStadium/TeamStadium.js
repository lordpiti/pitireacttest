import React, { Component } from 'react';
import MyMapComponent from './MyGoogleMaps/MyGoogleMaps';
import axios from 'axios';
import apiInstance from '../../utilities/axios-test';
// <MyMapComponent isMarkerShown />

class TeamStadium extends Component {

  state = {
    googleData: null
  }

  componentDidMount(){
    const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';

    const instance = axios.create({
      baseURL: ''
    });

    instance.get(apiUrl+'address=Estadio de Riazor').then(response => {
      this.setState({ googleData: response.data});
    });
  }

  render() {

    let mapComponent = null;

    if (this.state.googleData) {
      mapComponent = 
        <MyMapComponent isMarkerShown googleData={this.state.googleData} />;
    }

    return <div>{mapComponent}</div>
  }
}

export default TeamStadium;