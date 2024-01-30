import { useState } from "react"
import ModalHeader from "../../components/ModalHeader"
import StaticRouteList from "../../components/list/StaticRouteLIst"
import TerminalRouteList from "../../components/list/TerminalRouteList"
import "../../assets/styles/routelist.css"

const ListModal = (props) => {

  const {testHandleClick} = props

  const [openModal, setOpenModal] = useState('')


  const handleClick = (event) => {
     if (event.target.value === "Routes") {
      setOpenModal('')
     } else {
      setOpenModal('TERMINAL')
     }
  }


  return (
    <>
      <ModalHeader title="List" />
      <div className="list-modal">
        <div className="list-modal-buttons">
          <button value={'Routes'} onClick={(e) => handleClick(e, 'value')}>Routes</button>
          <button value={'Terminal'} onClick={(e) => handleClick(e, 'value')}>Terminal</button>
        </div>
        {openModal === 'TERMINAL' ? (
          <TerminalRouteList/>
        ) : 
        (
          <StaticRouteList testHandleClick={testHandleClick}/>
        )}
      </div>
    </>
  )
}

export default ListModal