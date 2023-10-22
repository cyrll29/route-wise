import { useState } from 'react'
import '../assets/styles/home.css'
import GoogleMapApi from '../components/GoogleMapApi'
import HomeButtons from '../utils/HomeButtons'
import HomeModals from '../utils/HomeModals' 

const HomePage = () => {

  const [activeModal, setActiveModal] = useState("route");
  console.log("homepage")

  const btnModalClick = (modal) => {
    setActiveModal(modal);
  };
    
  return (
    <>
      <div className='home-modal'>
        <HomeModals 
          aboutModal={activeModal === "about"}
          reportModal={activeModal === "report"}
          notifModal={activeModal === "notif"}
          routeModal={activeModal === "route"}
          // roadModal={activeModal === "road"}
          hindranceModal={activeModal === "hindrance"}
        />
      </div>

      <GoogleMapApi />  

      <div className="home-buttons">
        <HomeButtons 
          about = {false}
          report = {true}
          notif = {false}
          route = {true}
          // road = {true}
          hindrance = {true}

          btnModalClick={btnModalClick}
        />
      </div>
    </>
  )
}

export default HomePage
