import { useState } from 'react'
import GoogleMapApi from '../components/googlemap/GoogleMapApi'
import HomeButtons from '../utils/HomeButtons'
import HomeModals from '../utils/HomeModals' 

import '../assets/styles/home.css'

const HomePage = () => {

  // Declarations
  const [activeModal, setActiveModal] = useState("planner");

  // Functions
  const btnModalClick = (modal) => setActiveModal(modal);
    
  return (
    <>
      <div className='home-modal'>
        <HomeModals 
          routeReportModal={activeModal === "report"}
          routePlannerModal={activeModal === "planner"}
          routeUpdateModal={activeModal === "updates"}
        />
      </div>

      <GoogleMapApi />  

      <div className="home-buttons">
        <HomeButtons 
          routeReport = {true}
          routePlanner = {true}
          routeUpdate = {true}
          btnModalClick={btnModalClick}
        />
      </div>
    </>
  )
}

export default HomePage
