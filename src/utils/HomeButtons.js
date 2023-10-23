import AboutIcon from '../assets/img/about-icon.png'
import ReportIcon from '../assets/img/report-icon.png'
import NotifIcon from '../assets/img/notification-icon.png'
import RouteIcon from '../assets/img/route-icon.png'
import HindranceIcon from '../assets/img/hindrance-icon.png'

const HomeButtons = (props) => {
  return (
    <>
      {props.about ? <button className="home-btn" onClick={() => props.btnModalClick('about')}><img className="home-icon" src={ AboutIcon } alt=''/> about </button> : <></>}
      {props.routeReport ? <button className="home-btn" onClick={() => props.btnModalClick('report')}><img className="home-icon" src={ ReportIcon } alt=''/> route report </button> : <></>}
      {props.notif ? <button className="home-btn" onClick={() => props.btnModalClick('notif')}><img className="home-icon" src={ NotifIcon } alt=''/> notification </button> : <></>}
      {props.routePlanner ? <button className="home-btn" onClick={() => props.btnModalClick('planner')}><img className="home-icon" src={ RouteIcon } alt=''/> route planner </button> : <></>}
      {props.routeUpdate ? <button className="home-btn" onClick={() => props.btnModalClick('updates')}><img className="home-icon" src={ HindranceIcon } alt=''/> route updates </button> : <></>}
    </>
  )
}

export default HomeButtons
