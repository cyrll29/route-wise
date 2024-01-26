import { useState, useEffect } from 'react'
import GoogleMapApi from '../components/googlemap/GoogleMapApi'
import HomeButtons from '../utils/HomeButtons'
import HomeModals from '../utils/HomeModals' 
import reportService from '../services/reportService'

import '../assets/styles/home.css'

const HomePage = () => {

  // Declarations
  const [activeModal, setActiveModal] = useState("planner");
  const [isMarkLocation, setIsMarkLocation] = useState(false)
  const [reportData, setReportData] = useState(null)
  const [hasToken, setHasToken] = useState()
  const [selectedItinerary, setSelectedItinerary] = useState(null)
  const [centerLat, setCenterLat] = useState(14.6515)
  const [centerLng, setCenterLng] = useState(121.0493)
  const [originMarker, setOriginMarker] = useState(null)
  const [destinationMarker, setDestinationMarker] = useState(null)

  // Functions
  const btnModalClick = (modal) => {
    setActiveModal(modal);
  }

  useEffect(() => {
    setHasToken(reportService.getToken())
  }, [])

  const onLocationSelect = (location) => {
    console.log(location)
    setReportData(location)
  };

  const onMarkLocation = (isMarking) => {
    console.log(isMarking)
    setIsMarkLocation(isMarking)
  };

  const handleItinerarySelect = (itinerary) => {
    setSelectedItinerary(itinerary)
  }

  const selectCenterLat = (latitude) => {
    setCenterLat(latitude)
  }

  const selectCenterLng = (longitude) => {
    setCenterLng(longitude)
  }

  const selectOriginMarker = (origin) => {
    setOriginMarker(origin)
  }

  const selectDestinationMarker = (destination) => {
    setDestinationMarker(destination)
  }
    
  return (
    <>
      <div className='home-modal'>
        <HomeModals 
          routeReportModal={activeModal === "report"}
          routePlannerModal={activeModal === "planner"}
          routeUpdateModal={activeModal === "updates"}
          routeListModal={activeModal === "list"}
          routeMenuModal={activeModal === "menu"}
          onMarkLocation={onMarkLocation}
          reportData={reportData}
          onItinerarySelect={handleItinerarySelect}
          selectCenterLat={selectCenterLat}
          selectCenterLng={selectCenterLng}
          selectOriginMarker={selectOriginMarker}
          selectDestinationMarker={selectDestinationMarker}
        />
      </div>

      <GoogleMapApi 
        isMarkLocation={isMarkLocation}
        onMarkLocation={onMarkLocation}
        onLocationSelect={onLocationSelect}
        selectedItinerary={selectedItinerary}
        centerLat={centerLat}
        centerLng={centerLng}
        originMarker={originMarker}
        destinationMarker={destinationMarker}
        selectOriginMarker={selectOriginMarker}
        selectDestinationMarker={selectDestinationMarker}
      />  

      <div className="home-buttons">
        <HomeButtons 
          routeReport = {hasToken}
          routePlanner = {true}
          routeUpdate = {true}
          routeList = {true}
          routeMenu = {true}
          btnModalClick={btnModalClick}
        />
      </div>
    </>
  )
}

export default HomePage
