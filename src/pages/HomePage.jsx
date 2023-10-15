import '../assets/styles/home.css'
import GoogleMapApi from '../components/GoogleMapApi'
import HomeButtons from '../components/HomeButtons'

const HomePage = () => {

    const aboutClick = () => {
        alert("About Us Clicked")
    }

    const reportClick = () => {
        alert("Report Clicked")
    }

    const notifClick = () => {
        alert("Notification Clicked")
    }

    const routeClick = () => {
        alert("Search Routes Clicked")
    }

    const condClick = () => {
        alert("Road Condition Clicked")
    }

    const hindranceClick = () => {
        alert("Hindrance Clicked")
    }
    
    return (
        <>
            <div className='home-modal'>

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
                    condClick = {e => condClick()}
                    hindranceClick = {e => hindranceClick()}
                />
            </div>
            <div className='home-Component'>

            </div>

        </>
    )
}

export default HomePage
