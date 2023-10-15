import { useState } from 'react'
import '../assets/styles/home.css'
import GoogleMapApi from '../components/GoogleMapApi'
import HomeButtons from '../components/HomeButtons'
import HomeModals from '../components/HomeModals' 

const HomePage = () => {

    const [activeModal, setActiveModal] = useState("route");

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
                    roadModal={activeModal === "road"}
                    hindranceModal={activeModal === "hindrance"}
                />
            </div>

            <GoogleMapApi />  

            <div className="home-buttons">
                <HomeButtons 
                    about = {true}
                    report = {true}
                    notif = {true}
                    route = {true}
                    road = {true}
                    hindrance = {true}

                    btnModalClick={btnModalClick}
                />
            </div>
        </>
    )
}

export default HomePage
