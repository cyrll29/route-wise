import ReportModal from '../views/modals/ReportModal'
import HindranceModal from '../views/modals/HindranceModal'
import PlannerModal from '../views/modals/PlannerModal'
import ListModal from '../views/modals/ListModal'
import MenuModal from '../views/modals/MenuModal'


const HomeModals = (props) => {
  return (
    <>
      {props.routeReportModal 
        ? <ReportModal /> 
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
