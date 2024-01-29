import ReportModal from '../views/modals/ReportModal'
import HindranceModal from '../views/modals/HindranceModal'
import PlannerModal from '../views/modals/PlannerModal'
import ListModal from '../views/modals/ListModal'
import MenuModal from '../views/modals/MenuModal'



const HomeModals = (props) => {


  return (
    <>
      {props.routeReportModal 
        ? <ReportModal 
          onMarkLocation={props.onMarkLocation}
          onLocationSelect={props.onLocationSelect}
          reportData={props.reportData}
          selectReportMarker={props.selectReportMarker}
          selectMapZoom={props.selectMapZoom}
        /> 
        : <></>
      }

      {props.routePlannerModal 
        ? <PlannerModal 
          onItinerarySelect={props.onItinerarySelect}
          selectPlannerCenterLat={props.selectPlannerCenterLat}
          selectPlannerCenterLng={props.selectPlannerCenterLng}
          selectOriginMarker={props.selectOriginMarker}
          selectDestinationMarker={props.selectDestinationMarker}
        /> 
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
