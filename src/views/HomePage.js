import { useState } from 'react'
import '../assets/styles/home.css'
import GoogleMapApi from '../components/GoogleMapApi'
import HomeButtons from '../utils/HomeButtons'
import HomeModals from '../utils/HomeModals' 

const HomePage = () => {

  const [activeModal, setActiveModal] = useState("planner");
  console.log("homepage")

  const btnModalClick = (modal) => {
    setActiveModal(modal);
  };
    
  return (
    <>
      <div className='home-modal'>
        <HomeModals 
          aboutModal={activeModal === "about"}
          routeReportModal={activeModal === "report"}
          notifModal={activeModal === "notif"}
          routePlannerModal={activeModal === "planner"}
          routeUpdateModal={activeModal === "updates"}
        />
      </div>

      <GoogleMapApi />  

      <div className="home-buttons">
        <HomeButtons 
          about = {true}
          routeReport = {true}
          routePlanner = {true}
          routeUpdate = {true}
          notif = {false}

          btnModalClick={btnModalClick}
        />
      </div>
    </>
  )
}

export default HomePage
