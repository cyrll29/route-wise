import { useState, useEffect } from 'react'
import { GoogleMap, Marker } from "@react-google-maps/api"
import { geocode, RequestType } from 'react-geocode'
import "../../assets/styles/googlemap.css"
import reportService from '../../services/reportService'


const Map = ({ mapOptions, isMarkLocation, onMarkLocation, onLocationSelect }) => {

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
        ))}

    </GoogleMap>
  )
}

export default Map