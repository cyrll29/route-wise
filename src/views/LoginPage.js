import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/styles/login.css'
import logo from '../assets/img/logo.png'


const LoginPage = () => {

  // Declarations
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  // End 


  // onChange input functions
  const handleEmailChange = (event) => setUserEmail(event.target.value);
  const handlePasswordChange = (event) => setUserPassword(event.target.value);
  // End


  // onClick function of the Login Button
  const loginClick = () => {
    if (userEmail === "admin" && userPassword === "admin") {
      navigate('/HomePage');
    } else {
      alert("Wrong Email/Password");
    }
  }
  // End


  // Others
  const navigateToLandingPage = () => navigate('/');
  // End


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
              value={userEmail}
              onChange={handleEmailChange} 
            />
          </div>

          <div className='mb20'>
            <h6>Password: </h6>
            <input 
              type="password"
              value={userPassword}
              onChange={handlePasswordChange} 
            />
          </div>

          <div className='form-button mb20'>
            <button onClick={() => loginClick()}>Login</button>
          </div>
        </div>

        <div className='back-button-div'>
          <button className='back-btn' onClick={() => navigateToLandingPage()}>Back</button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
