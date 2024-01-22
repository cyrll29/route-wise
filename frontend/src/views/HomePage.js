import { useState, useEffect } from 'react'
import GoogleMapApi from '../components/googlemap/GoogleMapApi'
import HomeButtons from '../utils/HomeButtons'
import HomeModals from '../utils/HomeModals' 
import reportService from '../services/reportService'

import '../assets/styles/home.css'

const HomePage = () => {

  // Declarations
  const [activeModal, setActiveModal] = useState("planner");
  const [hasToken, setHasToken] = useState()

  // Functions
  const btnModalClick = (modal) => setActiveModal(modal);

  useEffect(() => {
    setHasToken(reportService.getToken())
  }, [])
    
  return (
    <>
      <div className='home-modal'>
        <HomeModals 
          routeReportModal={activeModal === "report"}
          routePlannerModal={activeModal === "planner"}
          routeUpdateModal={activeModal === "updates"}
          routeListModal={activeModal === "list"}
          routeMenuModal={activeModal === "menu"}
        />
      </div>

      <GoogleMapApi />  

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
