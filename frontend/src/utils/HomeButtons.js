import ReportIcon from '../assets/img/report-icon.png'
import RouteIcon from '../assets/img/route-icon.png'
import HindranceIcon from '../assets/img/hindrance-icon.png'


const HomeButtons = (props) => {
  return (
    <>
      {props.routeReport ? <button className="home-btn" onClick={() => props.btnModalClick('report')}><img className="home-icon" src={ ReportIcon } alt=''/> route report </button> : <></>}
      {props.routePlanner ? <button className="home-btn" onClick={() => props.btnModalClick('planner')}><img className="home-icon" src={ RouteIcon } alt=''/> route planner </button> : <></>}
      {props.routeUpdate ? <button className="home-btn" onClick={() => props.btnModalClick('updates')}><img className="home-icon" src={ HindranceIcon } alt=''/> route updates </button> : <></>}
    </>
  )
}

export default HomeButtons
