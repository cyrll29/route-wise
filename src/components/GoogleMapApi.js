import { useLoadScript} from "@react-google-maps/api"
import GoogleMap from "./GoogleMap"
import "../assets/styles/googlemap.css"

const GoogleMapApi = () => {
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  const GOOGLE_MAPS_MAP_ID = process.env.REACT_APP_GOOGLE_MAPS_MAP_ID

  console.log(process.env)
    
  const { isLoaded } = useLoadScript({ 
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
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

export default GoogleMapApi