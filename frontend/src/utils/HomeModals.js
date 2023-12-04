import RouteReportModal from '../views/modals/ReportModal'
import RouteUpdateModal from '../views/modals/HindranceModal'
import RoutePlannerModal from '../views/modals/RouteModal'


const HomeModals = (props) => {
  return (
    <>
      {props.routeReportModal ? <RouteReportModal /> : <></>}
      {props.routePlannerModal ? <RoutePlannerModal /> : <></>}
      {props.routeUpdateModal ? <RouteUpdateModal /> : <></>}
    </>
  )
}

export default HomeModals
