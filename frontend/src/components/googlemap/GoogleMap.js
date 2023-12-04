import { GoogleMap } from "@react-google-maps/api"
import "../../assets/styles/googlemap.css"

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