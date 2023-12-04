import { useEffect } from 'react'
import { useLoadScript} from "@react-google-maps/api"
import GoogleMap from "./GoogleMap"

import "../../assets/styles/googlemap.css"

const GoogleMapApi = () => {
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_API_KEY
  const GOOGLE_MAPS_MAP_ID = process.env.REACT_APP_MAP_ID

  useEffect(() => {
    console.log("TEST CONSOLE LOG")
  }, [])
    
  const { isLoaded } = useLoadScript({ 
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: lib,
  });

  if (!isLoaded) return <div>Loading...</div>

  const mapOptions = {
    zoom: 13,
    center: { lat: 14.676208, lng: 121.043861 },
    mapId: GOOGLE_MAPS_MAP_ID, // map id for map style changes
    disableDefaultUI: true,
  }

  return (
    <GoogleMap 
      mapOptions={mapOptions} 
    />
  )
}

const lib = ["places"]
export default GoogleMapApi