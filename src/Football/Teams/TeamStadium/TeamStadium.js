import React, { Component } from 'react';
import MyMapComponent from './MyGoogleMaps/MyGoogleMaps';
import axios from 'axios';

class TeamStadium extends Component {

  state = {
    googleData: null
  }

  componentDidMount(){
    const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAG7ddPMubaOTHEZTqB0s4ZV4830cIJyCU&';

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
      <div className="margin-top-medium">
        <h1>Stadium</h1>
        <div className="row margin-top-large">
          <div className="col-sm-6">
            <h4>{this.props.stadium.name}</h4><br/>
            {this.state.googleData.results[0].formatted_address}<br/>
            {this.props.stadium.capacity.toLocaleString('en-GB')} people
          </div>
          <div className="col-sm-6">
            <MyMapComponent isMarkerShown googleData={this.state.googleData} />
          </div>
        </div>
        
      </div>  
    }

    return <div>{mapComponent}</div>
  }
}

export default TeamStadium;