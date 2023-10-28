import AboutModal from '../views/modals/AboutModal'
import RouteReportModal from '../views/modals/ReportModal'
import NotifModal from '../views/modals/NotifModal'
import RouteUpdateModal from '../views/modals/HindranceModal'
import RoutePlannerModal from '../views/modals/RouteModal'


const HomeModals = (props) => {
  return (
    <>
      {props.aboutModal ? <AboutModal /> : <></>}
      {props.routeReportModal ? <RouteReportModal /> : <></>}
      {props.notifModal ? <NotifModal /> : <></>}
      {props.routePlannerModal ? <RoutePlannerModal /> : <></>}
      {props.routeUpdateModal ? <RouteUpdateModal /> : <></>}
    </>
  )
}

export default HomeModals
