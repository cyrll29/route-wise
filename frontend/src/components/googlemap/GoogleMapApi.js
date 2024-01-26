// import { useState } from 'react'
import { useLoadScript } from "@react-google-maps/api";
import GoogleMap from "./GoogleMap";
import config from "../../utils/config";

import "../../assets/styles/googlemap.css";

const GoogleMapApi = ({ isMarkLocation, onMarkLocation, onLocationSelect, selectedItinerary, centerLat, centerLng, originMarker, destinationMarker, selectOriginMarker, selectDestinationMarker }) => {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: config.libraries,
  });
  if (!isLoaded) return <div>Loading...</div>;

  const mapOptions = {
    zoom: 15, 
    center: { lat: centerLat, lng: centerLng }, 
    mapId: process.env.REACT_APP_MAP_ID, 
    disableDefaultUI: true, 
    restriction: {  
      latLngBounds: {
        north: 14.738183748703542,
        south: 14.568579001847928,
        west: 120.9531749965826,
        east: 121.11127512082325
      }
    }
  };

  return (
    <GoogleMap 
      mapOptions={mapOptions} 
      isMarkLocation={isMarkLocation}
      onMarkLocation={onMarkLocation}
      onLocationSelect={onLocationSelect}
      selectedItinerary={selectedItinerary}
      originMarker={originMarker}
      destinationMarker={destinationMarker}
      selectOriginMarker={selectOriginMarker}
      selectDestinationMarker={selectDestinationMarker}
    />
  )
};

export default GoogleMapApi;
