import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalHeader from "../../components/ModalHeader";
import reportService from '../../services/reportService.js'


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
      <button onClick={handleLogoutClick}>Logout</button>
    </>
  )
}

export default MenuModal