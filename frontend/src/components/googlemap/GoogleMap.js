/*global google*/
import { useState, useEffect } from 'react'
import { GoogleMap, Marker, Polyline, InfoWindow, TrafficLayer } from "@react-google-maps/api"
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
import trafficIcon from '../../assets/img/traffic-jam-icon.png'
import accidentIcon from '../../assets/img/accident-icon.png'
import repairIcon from '../../assets/img/road-repair-icon.png'
import floodIcon from '../../assets/img/flood-icon.png'
import closureIcon from '../../assets/img/closure-icon.png'



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

    // For Test
    showTrafficLayer
  } = props
  

  const startMarkerIcon = (leg) => {
    if (leg.travel_mode === "WALKING"){
      return `${walkIcon}`
    }
    if (leg.travel_mode === "TRANSIT") {
      if (leg.transit_details.line.vehicle.type === "BUS") {
        return `${busIcon}`
      } else if (leg.transit_details.line.vehicle.type === "TRAM") {
        return `${railIcon}`
      }
    }
  }
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
    if (selectedItinerary && selectedItinerary.legs[0].steps) {
      return selectedItinerary.legs[0].steps.map((leg, index) => (
        <Marker
          key={index}
          position={{ lat: leg.start_location.lat, lng: leg.start_location.lng }}
          icon={{
            url: startMarkerIcon(leg),
            scaledSize: new google.maps.Size(35, 35)
          }}
        />
      ));
    }
    return null;
  };

  // PlannerModal - Render itinerary polylines
  const renderPolylines = () => {
    if (selectedItinerary && selectedItinerary.legs[0].steps) {
      return selectedItinerary.legs[0].steps.map((leg, index) => {
        const path = decodePolyline(leg.polyline.points); 
        let color = "black"

        if(leg.travel_mode === "WALKING"){
          color = "#FF7F7F"
        } else if (leg.travel_mode === "TRANSIT") {
          if (leg.transit_details.line.vehicle.type === "BUS") {
            color = "#45B6FE"
          } else if (leg.transit_details.line.vehicle.type === "TRAM") {
            color = "#FFA756"
          }
        } 

        return <Polyline 
          key={index} 
          path={path} 
          options={{
            strokeColor: color,
            strokeWeight: 8,
            strokeOpacity: 1
          }} 
        />;
      });
    }
    return null;
  };


  // PlannerModal - Render itinerary destination marker
  const renderDestinationMarker = () => {
    if (selectedItinerary && selectedItinerary.legs[0].steps.length > 0) {
      const lastLeg = selectedItinerary.legs[0].steps[selectedItinerary.legs[0].steps.length - 1];
      return (
        <Marker
          position={{ lat: lastLeg.end_location.lat, lng: lastLeg.end_location.lng }}
          icon={{
            url: `${destinationIcon}`,
            scaledSize: new google.maps.Size(35, 45)
          }}
        />
      );
    }
    return null;
  };



  // PlannerModal - Render ORIGIN INPUT marker
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

  // PlannerModal - Render DESTINATION INPUT marker
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
            scaledSize: new google.maps.Size(25, 25)
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
          marker = accidentIcon
        } else if (report.category.label === 'Traffic Jam') {
          marker = trafficIcon
        } else if (report.category.label === 'Road Repair') {
          marker = repairIcon
        } else if (report.category.label === 'Flood') {
          marker = floodIcon
        } else if (report.category.label === 'Road Closure') {
          marker = closureIcon
        }

        return (
          <Marker
            key={index}
            position={report.latLng}
            icon={{
              url: marker,
              scaledSize: new google.maps.Size(45, 45)
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
      {showTrafficLayer && 
        <TrafficLayer 
          
        />
      }

      {renderReportMarker()}
      {renderReports()}

      {renderStartMarker()}
      {renderEndMarker()}

      {renderDestinationMarker()}
      {renderLegStartMarkers()}
      {renderPolylines()}
      

      {/* {someCoords ? someCoords.map((coord, index) => (
        <Marker key={index} position={{ lat: coord.lat, lng: coord.lng}}/>
      )):<></>} */}
    </GoogleMap>
  )
}

export default Map