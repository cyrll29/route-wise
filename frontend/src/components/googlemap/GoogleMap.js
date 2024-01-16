import { GoogleMap, Polyline, Marker } from "@react-google-maps/api"
import decodePolyline from 'decode-google-map-polyline'
import polyline from '@mapbox/polyline'
import "../../assets/styles/googlemap.css"

const Map = ({ mapOptions }) => {
  const markerPosition = 
  
  {lat: 14.6367, lng: 120.98012}

  const overviewPolyline = "gpmxAivuaV[bC^F`@DN?PEG^[zBIu@TDYlBkAdIQxAOjAiAxISrAeAlHm@lEI|AGnC@`JF~MB|HHzLBvDC~CAlAHpNAbDF`HJtPJbJ@vEEzEBtEJzQPtV@~F@jGChA@xCBfC?XI?H??JBlB@|DCj@UNGLEP?XHX"
  const result = decodePolyline(overviewPolyline)
  // const result = polyline.decode(overviewPolyline, 5)
  // const polylinePath = result.map(([lat, lng]) => ({lat, lng}))
  // const resulty = [
  //   {lat: 14.6459429, lng: 121.0078905},
  //   {lat: 14.65733, lng: 121.00387},
  //   {lat: 14.65733, lng: 121.00387},
  //   {lat: 14.60538, lng: 120.98208},
  //   {lat: 14.60538, lng: 120.98208},
  //   {lat: 14.6035541, lng: 120.9820877},
  //   {lat: 14.60357, lng: 120.98209},
  //   {lat: 14.60064, lng: 121.01331},
  //   {lat: 14.6006675, lng: 121.0133372},
  //   {lat: 14.5991268, lng: 121.0118816}
  // ]

  console.log(result)
  
  return (
    <GoogleMap 
      options={mapOptions}
      mapContainerClassName="map-container"
    >
      <Polyline
        path={result}
        options={{
          strokeColor: "#FF0000", // Set the color of the polyline
          strokeOpacity: 1.0, // Set the opacity of the polyline
          strokeWeight: 2, // Set the width of the polyline
        }}
      />

      {/* soon to implement, conditional component for "walking" and "transit" */}
      {/* <Polyline
        path={resulty}
        options={{
          strokeColor: "#FF0000", // Set the color of the polyline
          strokeOpacity: 1.0, // Set the opacity of the polyline
          strokeWeight: 2, // Set the width of the polyline
        }}
      /> */}

      <Marker 
        position={markerPosition}
      />
    </GoogleMap>
  )
}

export default Map