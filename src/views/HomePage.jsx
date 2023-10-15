import { useState } from 'react'
import '../assets/styles/home.css'
import GoogleMapApi from '../components/GoogleMapApi'
import HomeButtons from '../components/HomeButtons'
import HomeModals from '../components/HomeModals' 

const HomePage = () => {

    const [aboutModal, setAboutModal] = useState(false)
    const [reportModal, setReportModal] = useState(false)
    const [notifModal, setNotifModal] = useState(false)
    const [routeModal, setRouteModal] = useState(true)
    const [roadModal, setRoadModal] = useState(false)
    const [hindranceModal, setHindranceModal] = useState(false)


    const aboutClick = () => {
        setAboutModal(true);
        setReportModal(false);
        setNotifModal(false);
        setRouteModal(false);
        setRoadModal(false);
        setHindranceModal(false);
    }

    const reportClick = () => {
        setAboutModal(false);
        setReportModal(true);
        setNotifModal(false);
        setRouteModal(false);
        setRoadModal(false);
        setHindranceModal(false);
    }

    const notifClick = () => {
        setAboutModal(false);
        setReportModal(false);
        setNotifModal(true);
        setRouteModal(false);
        setRoadModal(false);
        setHindranceModal(false);
    }

    const routeClick = () => {
        setAboutModal(false);
        setReportModal(false);
        setNotifModal(false);
        setRouteModal(true);
        setRoadModal(false);
        setHindranceModal(false);
    }

    const roadClick = () => {
        setAboutModal(false);
        setReportModal(false);
        setNotifModal(false);
        setRouteModal(false);
        setRoadModal(true);
        setHindranceModal(false);
    }

    const hindranceClick = () => {
        setAboutModal(false);
        setReportModal(false);
        setNotifModal(false);
        setRouteModal(false);
        setRoadModal(false);
        setHindranceModal(true);
    }
    
    return (
        <>
            <div className='home-modal'>
                <HomeModals 
                    aboutModal = {aboutModal}
                    reportModal = {reportModal}
                    notifModal = {notifModal}
                    routeModal = {routeModal}
                    roadModal = {roadModal}
                    hindranceModal = {hindranceModal}
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

                    aboutClick = {e => aboutClick()}
                    reportClick = {e => reportClick()}
                    notifClick = {e => notifClick()}
                    routeClick = {e => routeClick()}
                    roadClick = {e => roadClick()}
                    hindranceClick = {e => hindranceClick()}
                />
            </div>
            <div className='home-Component'>

            </div>

        </>
    )
}

export default HomePage
