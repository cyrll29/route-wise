import { useState, useEffect } from 'react'
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api"
import decodePolyline from 'decode-google-map-polyline'
import { geocode, RequestType } from 'react-geocode'
import "../../assets/styles/googlemap.css"
import reportService from '../../services/reportService'


const Map = ({ mapOptions, isMarkLocation, onMarkLocation, onLocationSelect, selectedItinerary }) => {

  const modeIcons = {
    "WALK": "url_to_walk_icon",
    "BUS": "url_to_bus_icon",
    "RAIL": "url_to_rail_icon",
  };
  const [reports, setReports] = useState(null)

  const renderLegStartMarkers = () => {
    if (selectedItinerary && selectedItinerary.legs) {
      return selectedItinerary.legs.map((leg, index) => (
        <Marker
          key={index}
          position={{ lat: leg.from.lat, lng: leg.from.lon }}
          // icon={{
          //   url: modeIcons[leg.mode],
          //   // Optional: Specify icon size here
          // }}
        />
      ));
    }
    return null;
  };

  const renderPolylines = () => {
    if (selectedItinerary && selectedItinerary.legs) {
      return selectedItinerary.legs.map((leg, index) => {
        const path = decodePolyline(leg.legGeometry.points); // Implement or import decodePolyline
        return <Polyline key={index} path={path} /* styling props here */ />;
      });
    }
    return null;
  };

  const renderOriginMarker = () => {
    if (selectedItinerary && selectedItinerary.legs.length > 0) {
      const firstLeg = selectedItinerary.legs[0];
      return (
        <Marker
          position={{ lat: firstLeg.from.lat, lng: firstLeg.from.lon }}
          label="Origin"
        />
      );
    }
    return null;
  };

  const renderDestinationMarker = () => {
    if (selectedItinerary && selectedItinerary.legs.length > 0) {
      const lastLeg = selectedItinerary.legs[selectedItinerary.legs.length - 1];
      return (
        <Marker
          position={{ lat: lastLeg.to.lat, lng: lastLeg.to.lon }}
          label="Dest."
        />
      );
    }
    return null;
  };


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
      {renderOriginMarker()}
      {renderDestinationMarker()}
      {renderLegStartMarkers()}
      {renderPolylines()}

    </GoogleMap>
  )
}

export default Map