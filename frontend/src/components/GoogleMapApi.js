import { useLoadScript} from "@react-google-maps/api"
import GoogleMap from "./GoogleMap"
import "../assets/styles/googlemap.css"

const GoogleMapApi = () => {
  const GOOGLE_MAPS_API_KEY = "AIzaSyD2e6HZRkqhtf_VtAFeoCmETc0JQXbkdzM"
  const GOOGLE_MAPS_MAP_ID = "cf8af2361b08851"

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