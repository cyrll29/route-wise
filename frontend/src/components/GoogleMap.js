import { GoogleMap } from "@react-google-maps/api"
import "../assets/styles/googlemap.css"

const Map = ({ mapOptions }) => {
  return (
    <GoogleMap 
      options={mapOptions}
      mapContainerClassName="map-container"
    >
    </GoogleMap>
  )
}

export default Map

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