import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import validator from 'validator'
import userService from '../services/userService'
import CmnPopupModal from '../components/CmnPopupModal'

import logo from '../assets/img/logo.png'
import '../assets/styles/signup.css'


const SignupPage = () => {

  // Declarations
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [correctPassword, setCorrectPassword] = useState(null)

  const clearInputFields = () => {
    setName('')
    setEmail('')
    setPassword('')
    setCorrectPassword(null)
  }


  // Functions
  const handleSignupClick = (e) => {
    e.preventDefault()

    // Email Validation
    const emailValidation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailValidation.test(email)) {
      setModalMessage("Invalid Email Format")
      setShowModal(true)
      return;
    }

    // Password Validation
    if (!correctPassword) {
      setModalMessage("Set a Strong password")
      setShowModal(true)
      return
    }

    // http Post
    const data = {name, password, email}
    userService
      .create(data)
      .then((data) => {
        setModalMessage("Registration Successful")
        setShowModal(true)
        clearInputFields();
      })
      .catch((error) => {
        console.log(error)
      })
  } 
  
  // Password Validator
  const validate = (value) => { 
    setPassword(value)
    if (validator.isStrongPassword(value, { 
      minLength: 8, minLowercase: 1, 
      minUppercase: 1, minNumbers: 1, minSymbols: 1 
    })) { 
      setPasswordMessage('Strong Password') 
      setCorrectPassword(true)
    } else { 
      setPasswordMessage('Not Strong Password') 
    } 
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
            <h6>Name: </h6>
            <input 
              type="text"
              id='name'
              value={name}
              onChange={e => setName(e.target.value)} 
              autoComplete='on'
            />
          </div>

          <div className='mb20'>
            <h6>Email: </h6>
            <input 
              type="email"
              id='email'
              value={email}
              onChange={e => setEmail(e.target.value)} 
              autoComplete='on'
            />
          </div>

          <div>
            <h6>Password: </h6>
            <input 
              type="password"
              id='password'
              value={password}
              onChange={e => validate(e.target.value)} 
            />
          </div>
          {password === '' ? <></> : 
            <span style={{ 
                fontWeight: 'bold', 
                color: 'red', 
                fontSize: '12px'
            }}>{passwordMessage}</span>
          }
          

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
              message={modalMessage}
              onClose={() => {
                setShowModal(false)
                setModalMessage('')
              }}/>
          : <></>}
      </div>
    </div>
  )
}

export default SignupPage
