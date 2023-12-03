import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/img/logo.png'
import '../assets/styles/signup.css'


const SignupPage = () => {

  // Declarations
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');

  // Functions
  const handleSignupClick = () => {
    // Authentication Conditions
    navigate('/')
  }
  
  const handleNameChange = (event) => setUserName(event.target.value)
  const handleEmailChange = (event) => setUserEmail(event.target.value)
  const handlePasswordChange = (event) => setUserPassword(event.target.value)
  const handleConfirmPasswordChange = (event) => setUserConfirmPassword(event.target.value)

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
            <h6>Username: </h6>
            <input 
              type="text"
              id='userName'
              value={userName}
              onChange={handleNameChange} 
              autoComplete='on'
            />
          </div>

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

          <div className='mb20'>
            <h6>Confirm Password: </h6>
            <input 
              type="password"
              id='userConfirmPassword'
              value={userConfirmPassword}
              onChange={handleConfirmPasswordChange} 
            />
          </div>

          <div className='form-button mb20'>
            <button onClick={handleSignupClick}>Sign Up</button>
          </div>
        </div>
      </div>
      
      <div className='back-button-div'>
        <button className='back-btn' onClick={() => navigate('/')}>Back</button>
      </div>
    </div>
  )
}

export default SignupPage
