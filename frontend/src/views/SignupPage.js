import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userService from '../services/userService'
import CmnPopupModal from '../components/CmnPopupModal'

import logo from '../assets/img/logo.png'
import '../assets/styles/signup.css'


const SignupPage = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalErrortype, setModalErrortype] = useState('')
  const [modalMessage, setModalMessage] = useState('')

  // Functions
  const clearInputFields = () => {
    setName('')
    setEmail('')
    setPassword('')
  }

  const handleSignupClick = (e) => {
    e.preventDefault()
    const data = {name, password, email}
    userService
      .create(data)
      .then((response) => {
        setModalMessage(response.message)
        setShowModal(true)
        clearInputFields();
      })
      .catch((error) => {
        console.log(error.response.data)
        setModalErrortype(error.response.data.errorType)
        setModalMessage(error.response.data.message)
        setShowModal(true)
      })
  } 

  return (
    <div className="signup-page">
      <div className='signup-container'>
        <div className='signup-logo'>
            <img src= {logo} alt="logo" />
            <h1><span>R</span>oute<span>W</span>ise</h1>
        </div>

        <h4>Create an Account</h4>

        <div className='form-container'>

          <div className='mb20'>
            <h6><span className='required-asterisk'>*</span>Name: </h6>
            <input 
              type="text"
              id='name'
              value={name}
              onChange={e => setName(e.target.value)} 
              autoComplete='on'
            />
          </div>

          <div className='mb20'>
            <h6><span className='required-asterisk'>*</span>Email: </h6>
            <input 
              type="email"
              id='email'
              value={email}
              onChange={e => setEmail(e.target.value)} 
              autoComplete='on'
            />
          </div>

          <div>
            <h6><span className='required-asterisk'>*</span>Password: </h6>
            <input 
              type="password"
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)} 
            />
          </div>

          <div>

          </div>

          <div className='form-button mb20'>
            <button onClick={handleSignupClick}>Sign Up</button>
          </div>
        </div>
      </div>
      
      <div className='back-button-div'>
        <button className='back-btn' onClick={() => navigate('/')}>Back</button>
      </div>

      <div>
        {showModal
          ? <CmnPopupModal 
              errorType={modalErrortype}
              message={modalMessage}
              onClose={() => {
                setShowModal(false)
                setModalErrortype('')
                setModalMessage('')
                navigate('/')
              }}/>
          : <></>}
      </div>
    </div>
  )
}

export default SignupPage
