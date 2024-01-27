import ModalHeader from "../../components/ModalHeader";
import StaticRouteList from "../../components/list/StaticRouteLIst";
import TerminalRouteList from "../../components/list/TerminalRouteList";
import "../../assets/styles/routelist.css"
import { useState } from "react";

const ListModal = () => {
  const [openModal, setOpenModal] = useState('')

  const handleClick = (event) => {
     if (event.target.value == "Routes") {
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
        {openModal == 'TERMINAL' ? (
          <TerminalRouteList/>
        ) : 
        (
          <StaticRouteList/>
        )}
      </div>
    </>
  )
}

export default ListModal