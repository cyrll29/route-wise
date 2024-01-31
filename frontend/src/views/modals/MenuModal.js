import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalHeader from "../../components/ModalHeader";
import reportService from '../../services/reportService.js'
import '../../assets/styles/modals.css'


const MenuModal = () => {

  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(null)

  const handleLogoutClick = () => {
    setShowModal(true)
    navigate('/')
    reportService.setLogoutToken(null)
  }

  return (
    <>
      <ModalHeader title="Menu" />
      <div className='menu-modal'>
        <button className='menu-modal-logout' onClick={handleLogoutClick}>Logout</button>
      </div>
    </>
  )
}

export default MenuModal