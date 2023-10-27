import 
{ GoogleMap, 
  useLoadScript} 
from "@react-google-maps/api"
import "../assets/styles/googlemap.css"
import GoogleMapStyle from '../utils/GoogleMapStyle'

const GoogleMapApi = ({mapStyle}) => {
    
  const { isLoaded } = useLoadScript({ 
    googleMapsApiKey: "AIzaSyD2e6HZRkqhtf_VtAFeoCmETc0JQXbkdzM",
    // libraries: ["places"],
    // googleMapsApiKey: "AIzaSy3WkL7V9XzNrR9T07SrV_z0B7WlJsG5U4s"
  });

  if (!isLoaded) return <div>Loading...</div>

  const mapOptions = {
    zoom: 13,
    center: { lat: 14.676208, lng: 121.043861 },
    mapTypeId: "roadmap",
    // mapId: "cf8af2361b08851",
    styles: GoogleMapStyle.mapStyle,

    // UI Controls
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,  
    disableDefaultUI: true,
    clickableIcons: false,
  }

  return <Map options={mapOptions} />
}

export default GoogleMapApi

function Map({ options }) {
  return (
    <GoogleMap 
      options={options}
      mapContainerClassName="map-container"
    >
    </GoogleMap>
  //   <iframe
  //     width="100%"
  //     height="830"
  //     frameborder="0"
  //     referrerpolicy="no-referrer-when-downgrade"
  //     src="https://www.google.com/maps/embed/v1/view?key=AIzaSyD2e6HZRkqhtf_VtAFeoCmETc0JQXbkdzM&center=-33.8569,151.2152
  //     &zoom=18
  //     &maptype=satellite"
  //     allowfullscreen>
  // </iframe>
  )
}
