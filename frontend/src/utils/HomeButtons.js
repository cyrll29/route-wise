import ReportIcon from '../assets/img/report-icon.png'
import RouteIcon from '../assets/img/route-icon.png'
import HindranceIcon from '../assets/img/hindrance-icon.png'
import ListIcon from '../assets/img/list-icon.png'
import MenuIcon from '../assets/img/menu-icon.png'



const HomeButtons = (props) => {
  return (
    <>
      {props.routeReport ? <button className="home-btn" onClick={() => props.btnModalClick('report')}><img className="home-icon" src={ ReportIcon } alt=''/> report </button> : <></>}
      {props.routePlanner ? <button className="home-btn" onClick={() => props.btnModalClick('planner')}><img className="home-icon" src={ RouteIcon } alt=''/> planner </button> : <></>}
      {props.routeUpdate ? <button className="home-btn" onClick={() => props.btnModalClick('updates')}><img className="home-icon" src={ HindranceIcon } alt=''/> hindrance </button> : <></>}
      {props.routeList ? <button className="home-btn" onClick={() => props.btnModalClick('list')}><img className="home-icon" src={ ListIcon } alt=''/> routes </button> : <></>}
      {props.routeMenu ? <button className="home-btn" onClick={() => props.btnModalClick('menu')}><img className="home-icon" src={ MenuIcon } alt=''/> menu </button> : <></>}
    </>
  )
}

export default HomeButtons
