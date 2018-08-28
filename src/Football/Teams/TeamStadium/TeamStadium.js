import React, { Component } from 'react';
import MyMapComponent from './MyGoogleMaps/MyGoogleMaps';
// <MyMapComponent isMarkerShown />

const TeamStadium = (props) => {
  return <div>
    <MyMapComponent isMarkerShown />
  </div>
}

export default TeamStadium;