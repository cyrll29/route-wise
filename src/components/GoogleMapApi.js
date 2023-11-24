import 
{ GoogleMap, 
  useLoadScript} 
from "@react-google-maps/api"
import "../assets/styles/googlemap.css"

const GoogleMapApi = () => {
    
  const { isLoaded } = useLoadScript({ 
    googleMapsApiKey: "AIzaSyD2e6HZRkqhtf_VtAFeoCmETc0JQXbkdzM",
    // libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>

  const mapOptions = {
    zoom: 13,
    center: { lat: 14.676208, lng: 121.043861 },
    mapId: "cf8af2361b08851", // map id for map style changes

    // UI Controls
    disableDefaultUI: true,
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
