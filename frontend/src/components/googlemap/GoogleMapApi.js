import { useLoadScript} from "@react-google-maps/api"
import GoogleMap from "./GoogleMap"

import "../../assets/styles/googlemap.css"

const GoogleMapApi = () => {
    
  const { isLoaded } = useLoadScript({ 
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: lib,
  });
  if (!isLoaded) return <div>Loading...</div>

  const mapOptions = {
    zoom: 14, // depth of the zoom
    center: { lat: 14.6482, lng: 121.0597 }, // center of the map
    mapId: process.env.REACT_APP_MAP_ID, // map id for map style changes
    disableDefaultUI: true, // disable default UI such as fullscreen
    restriction: {  // restrict the google map within NCR only
      latLngBounds: {
        north: 14.7407,
        south: 14.5406,
        west: 120.9512,
        east: 121.1711
      }
    }
  }

  return (
    <GoogleMap 
      mapOptions={mapOptions} 
    />
  )
}

const lib = ["places"]
export default GoogleMapApi