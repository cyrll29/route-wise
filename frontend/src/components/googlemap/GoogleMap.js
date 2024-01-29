/*global google*/
import { useState, useEffect } from 'react'
import { GoogleMap, Marker, Polyline, InfoWindow } from "@react-google-maps/api"
import decodePolyline from 'decode-google-map-polyline'
import { geocode, RequestType } from 'react-geocode'
import "../../assets/styles/googlemap.css"
import reportService from '../../services/reportService'
import busIcon from '../../assets/img/map-bus.png'
import originIcon from '../../assets/img/map-origin.png'
import destinationIcon from '../../assets/img/map-destination.png'
import walkIcon from '../../assets/img/map-walk.png'
import railIcon from '../../assets/img/map-rail.png'
import warningIcon from '../../assets/img/map-warning.png'



const Map = (props) => {

  const {
    mapOptions,

    // ReportModal
    isMarkLocation,
    onMarkLocation,
    onLocationSelect,
    reportMarker,

    // PlannerModal
    selectedItinerary,
    originMarker,
    destinationMarker,
    selectOriginMarker,
    selectDestinationMarker
  } = props
  


  const modeIcons = {
    "WALK": `${walkIcon}`,
    "BUS": `${busIcon}`,
    "RAIL": `${railIcon}`,
  };
  const [reports, setReports] = useState(null)



  // Get all the reports from database
  useEffect(() => {
    reportService
    .getAll()
    .then((response) => {
      console.log(response.data)
      // const reportCoordinates = response.data.map((report) => report.latLng);
      setReports(response.data)
    })
    .catch ((error) => {
      console.log(error)
    })
  }, [reportMarker]);



  // PlannerModal - Render markers itinerary's leg start
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



  // PlannerModal - Render itinerary polylines
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



  // PlannerModal - Render itinerary destination marker
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



  // PlannerModal - Render origin marker
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



  // PlannerModal - Render destination marker
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



  // ReportModal - Render marker for Mark Location 
  const renderReportMarker = () => {
    if (reportMarker) {
      return (
        <Marker
          position={{ lat: reportMarker.lat, lng: reportMarker.lng }}
          icon={{
            url: `${warningIcon}`,
            scaledSize: new google.maps.Size(40, 40)
          }}
        />
      );
    }
    return null;
  };


  const [selectedReport, setSelectedReport] = useState(null);
  // ReportModal - Render reports
  const renderReports = () => {

    const handleMarkerClick = (report) => {
      setSelectedReport(report);
    };
    const handleInfoWindowClose = () => {
      setSelectedReport(null);
    };

    if (reports) {
      return reports.map((report, index) => {
        let marker = warningIcon

        if(report.category.label === 'Accident'){
          marker = originIcon
        } else if (report.category.label === 'Traffic') {
          marker = destinationIcon
        } else if (report.category.label === 'Road Blockage') {
          marker = railIcon
        } else if (report.category.label === 'Flood') {
          marker = walkIcon
        }

        return (
          <Marker
            key={index}
            position={report.latLng}
            icon={{
              url: marker,
              scaledSize: new google.maps.Size(35, 35)
            }}
            onClick={() => handleMarkerClick(report)}
          >
            {selectedReport === report && (
              <InfoWindow
                position={report.latLng}
                onCloseClick={handleInfoWindowClose}
              >
                <div>
                  {/* Content of the InfoWindow */}
                  <h3>{report.title}</h3>
                  <p>{report.body}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        )
      });
    }
    return null;
  };



  // ReportModal - Mark Location callback function
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
  };


  
  return (
    <GoogleMap 
      options={mapOptions}
      mapContainerClassName="map-container"
      onClick={mapClickHandler}
    >
      {/* {reports &&
        reports.map((report, index) => (
          <Marker key={index} position={report} />
        ))
      } */}

      {renderReportMarker()}
      {renderReports()}

      {renderStartMarker()}
      {renderEndMarker()}

      {renderDestinationMarker()}
      {renderLegStartMarkers()}
      {renderPolylines()}
    </GoogleMap>
  )
}

export default Map