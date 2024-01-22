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

  // Functions
  const btnModalClick = (modal) => {
    setActiveModal(modal);
  }

  useEffect(() => {
    setHasToken(reportService.getToken())
  }, [])

  const onLocationSelect = (location) => {
    // Function to handle the location selected on the map
    // Update your location state here
    console.log(location)
    setReportData(location)
  };

  const onMarkLocation = (isMarking) => {
    // Function to handle "Mark Location" button click
    // You can pass this state down to GoogleMapApi
    console.log(isMarking)
    setIsMarkLocation(isMarking)
  };
    
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
        />
      </div>

      <GoogleMapApi 
        isMarkLocation={isMarkLocation}
        onMarkLocation={onMarkLocation}
        onLocationSelect={onLocationSelect}
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
