import AboutIcon from '../assets/img/about-icon.png'
import ReportIcon from '../assets/img/report-icon.png'
import NotifIcon from '../assets/img/notification-icon.png'
import RouteIcon from '../assets/img/route-icon.png'
import CondIcon from '../assets/img/road-condition-icon.png'
import HindranceIcon from '../assets/img/hindrance-icon.png'

const HomeButtons = (props) => {
    return (
        <>
            {props.about ? <button className="home-btn" onClick={props.aboutClick}><img className="home-icon" src={ AboutIcon } alt=''/> about </button> : <></>}
            {props.report ? <button className="home-btn" onClick={props.reportClick}><img className="home-icon" src={ ReportIcon } alt=''/> report </button> : <></>}
            {props.notif ? <button className="home-btn" onClick={props.notifClick}><img className="home-icon" src={ NotifIcon } alt=''/> notification </button> : <></>}
            {props.route ? <button className="home-btn" onClick={props.routeClick}><img className="home-icon" src={ RouteIcon } alt=''/> routes </button> : <></>}
            {props.road ? <button className="home-btn" onClick={props.condClick}><img className="home-icon" src={ CondIcon } alt=''/> road </button> : <></>}
            {props.hindrance ? <button className="home-btn" onClick={props.hindranceClick}><img className="home-icon" src={ HindranceIcon } alt=''/> hindrance </button> : <></>}
        </>
    )
}

export default HomeButtons
