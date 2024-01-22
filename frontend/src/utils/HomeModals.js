import ReportModal from '../views/modals/ReportModal'
import HindranceModal from '../views/modals/HindranceModal'
import PlannerModal from '../views/modals/PlannerModal'
import ListModal from '../views/modals/ListModal'
import MenuModal from '../views/modals/MenuModal'


const HomeModals = (props) => {
  const onMarkLocation = props.onMarkLocation
  const onLocationSelect = props.onLocationSelect
  const reportData = props.reportData
  return (
    <>
      {props.routeReportModal 
        ? <ReportModal 
          onMarkLocation={onMarkLocation}
          onLocationSelect={onLocationSelect}
          reportData={reportData}
        /> 
        : <></>
      }

      {props.routePlannerModal 
        ? <PlannerModal /> 
        : <></>
      }

      {props.routeUpdateModal 
        ? <HindranceModal /> 
        : <></>
      }

      {props.routeListModal 
        ? <ListModal /> 
        : <></>
      }

      {props.routeMenuModal 
        ? <MenuModal /> 
        : <></>
      }
    </>
  )
}

export default HomeModals
