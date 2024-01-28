import ReportModal from '../views/modals/ReportModal'
import HindranceModal from '../views/modals/HindranceModal'
import PlannerModal from '../views/modals/PlannerModal'
import ListModal from '../views/modals/ListModal'
import MenuModal from '../views/modals/MenuModal'



const HomeModals = (props) => {
  
  const onMarkLocation = props.onMarkLocation
  const onLocationSelect = props.onLocationSelect
  const reportData = props.reportData
  const onItinerarySelect = props.onItinerarySelect
  const selectCenterLat = props.selectCenterLat
  const selectCenterLng = props.selectCenterLng
  const selectOriginMarker = props.selectOriginMarker
  const selectDestinationMarker = props.selectDestinationMarker

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
        ? <PlannerModal 
          onItinerarySelect={onItinerarySelect}
          selectCenterLat={selectCenterLat}
          selectCenterLng={selectCenterLng}
          selectOriginMarker={selectOriginMarker}
          selectDestinationMarker={selectDestinationMarker}
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
