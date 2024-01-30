// import { useState } from 'react'
import { useLoadScript } from "@react-google-maps/api";
import GoogleMap from "./GoogleMap";
import config from "../../utils/config";
// import mapStyle from "./mapStyle.json"
import "../../assets/styles/googlemap.css";



const GoogleMapApi = (props) => {

  const {
    centerLat,
    centerLng,
    mapZoom,

    // ReportModal
    isMarkLocation,
    onMarkLocation,
    onLocationSelect,
    reportMarker,

    // PlannerModal
    selectedItinerary,
    originMarker,
    destinationMarker,
    selectOriginMarker,
    selectDestinationMarker
  } = props


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: config.libraries,
  });
  if (!isLoaded) return <div>Loading...</div>;


  const mapOptions = {
    zoom: mapZoom, 
    minZoom: 14,
    maxZoom: 18,
    center: { lat: centerLat, lng: centerLng }, 
    mapId: process.env.REACT_APP_MAP_ID, 
    disableDefaultUI: true, 
    restriction: {  
      latLngBounds: {
        north: 14.738183748703542,
        south: 14.58923182582537,
        west: 120.98522186279297,
        east: 121.11127512082325
      }
    },
    // styles: mapStyle
  };

  
  return (
    <GoogleMap 
      mapOptions={mapOptions} 
      isMarkLocation={isMarkLocation}
      onMarkLocation={onMarkLocation}
      onLocationSelect={onLocationSelect}
      reportMarker={reportMarker}

      selectedItinerary={selectedItinerary}
      originMarker={originMarker}
      destinationMarker={destinationMarker}
      selectOriginMarker={selectOriginMarker}
      selectDestinationMarker={selectDestinationMarker}
    />
  )
};

export default GoogleMapApi;
