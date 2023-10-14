import '../assets/styles/home.css'
import GoogleMapApi from '../components/GoogleMapApi'
import HomeBtns from '../components/HomeBtns'
import ProfileIcon from '../assets/img/profile-icon.png'

const HomePage = () => {

    const aboutBtn = () => {
        alert("About Us Clicked")
    }

    const reportBtn = () => {
        alert("Report Clicked")
    }

    const notifBtn = () => {
        alert("Notification Clicked")
    }

    const condBtn = () => {
        alert("Road Condition Clicked")
    }

    const routeBtn = () => {
        alert("Search Routes Clicked")
    }
    
    return (
        <>
            <GoogleMapApi />  
            <div className="home-buttons">
                <HomeBtns title='ABOUT US' onClickFunction={() => aboutBtn()}/>
                <HomeBtns title='REPORT' onClickFunction={() => reportBtn()}/>
                <HomeBtns title='NOTIFICATION' onClickFunction={() => notifBtn()}/>
                <HomeBtns title='ROAD CONDITION' onClickFunction={() => condBtn()}/>
                <HomeBtns title='SEARCH ROUTES' onClickFunction={() => routeBtn()}/>
                <img className='profile-icon' src={ProfileIcon} alt="prof-icon" />
            </div>
            <div className='home-Component'>

            </div>

        </>
    )
}

export default HomePage
