import React, { Component } from 'react';
import MyMapComponent from './MyGoogleMaps/MyGoogleMaps';
import axios from 'axios';

class TeamStadium extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      googleData: null,
    };
  }

  componentDidMount() {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&`;

    axios
      .create()
      .get(`${apiUrl}address=${this.props.stadium.name}}`)
      .then((response) => {
        if (
          response.data &&
          response.data.status === 'OK' &&
          response.data.results
        ) {
          this.setState({ googleData: response.data });
        }
      });
  }

  render() {
    return (
      <div>
        <div className='margin-top-medium'>
          <h1>Stadium</h1>
          <div className='row margin-top-large'>
            <div className='col-sm-6'>
              <h4>{this.props.stadium.name}</h4>
              <br />
              {this.state.googleData &&
                this.state.googleData.results[0].formatted_address}
              <br />
              {this.props.stadium.capacity.toLocaleString('en-GB')} people
            </div>
            <div className='col-sm-6'>
              {this.state.googleData && (
                <MyMapComponent
                  isMarkerShown
                  googleData={this.state.googleData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeamStadium;
