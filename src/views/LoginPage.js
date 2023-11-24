import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/styles/login.css'
import logo from '../assets/img/logo.png'


const LoginPage = () => {

  // Declarations
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  // Functions
  const handleEmailChange = (e) => {
    setUserEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value)
  }

  const handleLoginClick = () => {
    if (userEmail === "admin" && userPassword === "admin") {
      navigate('/HomePage')
    } else {
      alert("Wrong Email/Password")
    }
  }

  return (
    <div className="login-page">
      <div className='login-container'>
        <div className='login-logo'>
            <img src= {logo} alt="logo" />
            <h1><span>R</span>oute<span>W</span>ise</h1>
        </div>

        <h4>Login to your Account</h4>

        <div className='form-container'>
          <div className='mb20'>
            <h6>Email: </h6>
            <input
              type="text" 
              id='userEmail'
              value={userEmail}
              onChange={handleEmailChange} 
              autoComplete='on'
            />
          </div>

          <div className='mb20'>
            <h6>Password: </h6>
            <input 
              type="password"
              id='userPassword'
              value={userPassword}
              onChange={handlePasswordChange} 
            />
          </div>

          <div className='form-button mb20'>
            <button onClick={handleLoginClick}>Login</button>
          </div>
        </div>

        <div className='back-button-div'>
          <button className='back-btn' onClick={() => navigate('/')}>Back</button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
