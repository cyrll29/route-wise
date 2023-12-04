import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/img/logo.png'
import '../assets/styles/signup.css'
import userService from '../services/user'


const SignupPage = () => {

  // Declarations
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState('')

  // Functions
  const handleSignupClick = (e) => {
    e.preventDefault()
    
    const data = {
      username,
      name,
      password
    }
    console.log(data)

    userService
      .create(data)
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }
  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
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
              onChange={handleNameChange} 
              autoComplete='on'
            />
          </div>

          <div className='mb20'>
            <h6>Username: </h6>
            <input 
              type="text"
              id='username'
              value={username}
              onChange={handleUsernameChange} 
              autoComplete='on'
            />
          </div>

          <div className='mb20'>
            <h6>Password: </h6>
            <input 
              type="password"
              id='password'
              value={password}
              onChange={handlePasswordChange} 
            />
          </div>

          <div className='mb20'>
            <h6>Confirm Password: </h6>
            <input 
              type="password"
              id='confirmPassword'
              value={confirmPassword}
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
