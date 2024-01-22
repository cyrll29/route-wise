// import { useState } from 'react'
import { useLoadScript } from "@react-google-maps/api";
import GoogleMap from "./GoogleMap";
import config from "../../utils/config";

import "../../assets/styles/googlemap.css";

const GoogleMapApi = ({ isMarkLocation, onMarkLocation, onLocationSelect }) => {



  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: config.libraries,
  });
  if (!isLoaded) return <div>Loading...</div>;

  const mapOptions = {
    zoom: 16, 
    center: { lat: 14.6515, lng: 121.0493 }, 
    mapId: process.env.REACT_APP_MAP_ID, 
    disableDefaultUI: true, 
    restriction: {  
      latLngBounds: {
        north: 14.7407,
        south: 14.5406,
        west: 120.9512,
        east: 121.1711
      }
    }
  };

  return (
    <GoogleMap 
      mapOptions={mapOptions} 
      isMarkLocation={isMarkLocation}
      onMarkLocation={onMarkLocation}
      onLocationSelect={onLocationSelect}
    />
  )
};

export default GoogleMapApi;
