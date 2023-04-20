import React from 'react';
import { compose, withProps } from 'recompose';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MyMapComponent = compose(
  withProps({
    /**
     * Note: create and replace your own key in the Google console.
     * https://console.developers.google.com/apis/dashboard
     * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
     */
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyAG7ddPMubaOTHEZTqB0s4ZV4830cIJyCU&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withGoogleMap
)((props) => {
  const location = props.googleData.results[0].geometry.location;
  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: location.lat, lng: location.lng }}
    >
      {props.isMarkerShown && (
        <Marker position={{ lat: location.lat, lng: location.lng }} />
      )}
    </GoogleMap>
  );
});

export default MyMapComponent;
