/*global google*/
import { useState, useEffect } from 'react'
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api"
import decodePolyline from 'decode-google-map-polyline'
import { geocode, RequestType } from 'react-geocode'
import "../../assets/styles/googlemap.css"
import reportService from '../../services/reportService'
import busIcon from '../../assets/img/map-bus.png'
import originIcon from '../../assets/img/map-origin.png'
import destinationIcon from '../../assets/img/map-destination.png'
import walkIcon from '../../assets/img/map-walk.png'
import railIcon from '../../assets/img/map-rail.png'



const Map = ({ mapOptions, isMarkLocation, onMarkLocation, onLocationSelect, selectedItinerary, originMarker, destinationMarker, selectOriginMarker, selectDestinationMarker }) => {

  const modeIcons = {
    "WALK": `${walkIcon}`,
    "BUS": `${busIcon}`,
    "RAIL": `${railIcon}`,
  };
  const [reports, setReports] = useState(null)



  useEffect(() => {
    reportService
    .getAll()
    .then((response) => {
      const reportCoordinates = response.data.map((report) => report.latLng);
      setReports(reportCoordinates)
    })
    .catch ((error) => {
      console.log(error)
    })
  }, []);



  const renderLegStartMarkers = () => {
    if (selectedItinerary && selectedItinerary.legs) {
      selectOriginMarker(null)
      selectDestinationMarker(null)
      return selectedItinerary.legs.map((leg, index) => (
        <Marker
          key={index}
          position={{ lat: leg.from.lat, lng: leg.from.lon }}
          icon={{
            url: modeIcons[leg.mode],
            scaledSize: new google.maps.Size(35, 35)
          }}
        />
      ));
    }
    return null;
  };



  const renderPolylines = () => {
    if (selectedItinerary && selectedItinerary.legs) {
      return selectedItinerary.legs.map((leg, index) => {
        const path = decodePolyline(leg.legGeometry.points); 
        let color = "black"

        if(leg.mode === "WALK"){
          color = "#FF7F7F"
        } else if (leg.mode === "BUS") {
          color = "#45B6FE"
        } else if (leg.mode === "RAIL") {
          color = "#FFA756"
        }
        return <Polyline 
          key={index} 
          path={path} 
          options={{
            strokeColor: color,
            strokeWeight: 8,
            strokeOpacity: 0.8
          }} 
        />;
      });
    }
    return null;
  };



  const renderDestinationMarker = () => {
    if (selectedItinerary && selectedItinerary.legs.length > 0) {
      const lastLeg = selectedItinerary.legs[selectedItinerary.legs.length - 1];
      return (
        <Marker
          position={{ lat: lastLeg.to.lat, lng: lastLeg.to.lon }}
          icon={{
            url: `${destinationIcon}`,
            scaledSize: new google.maps.Size(35, 45)
          }}
        />
      );
    }
    return null;
  };



  const renderStartMarker = () => {
    if (originMarker) {
      return (
        <Marker
          position={{ lat: originMarker.lat, lng: originMarker.lng }}
          icon={{
            url: `${originIcon}`,
            scaledSize: new google.maps.Size(35, 45)
          }}
        />
      );
    }
    return null;
  };



  const renderEndMarker = () => {
    if (destinationMarker) {
      return (
        <Marker
          position={{ lat: destinationMarker.lat, lng: destinationMarker.lng }}
          icon={{
            url: `${destinationIcon}`,
            scaledSize: new google.maps.Size(35, 45)
          }}
        />
      );
    }
    return null;
  };



  const mapClickHandler = async (event) => {
    if (isMarkLocation) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      const address = await geocode(
        RequestType.LATLNG,
        `${lat},${lng}`,
        { language: "en", region: "es", key: process.env.REACT_APP_API_KEY }
      )
      
      onLocationSelect({ lat, lng, address });
      onMarkLocation(false)
    }
    console.log(reports)
  };


  
  return (
    <GoogleMap 
      options={mapOptions}
      mapContainerClassName="map-container"
      onClick={mapClickHandler}
    >
      {reports &&
        reports.map((report, index) => (
          <Marker key={index} position={report} />
        ))
      }

      {renderDestinationMarker()}
      {renderLegStartMarkers()}
      {renderPolylines()}
      {renderStartMarker()}
      {renderEndMarker()}

    </GoogleMap>
  )
}

export default Map