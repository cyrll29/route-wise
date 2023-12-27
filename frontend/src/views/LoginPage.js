import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/loginService'
import reportService from '../services/reportService'

import '../assets/styles/login.css'
import logo from '../assets/img/logo.png'


const LoginPage = () => {

  // Declarations
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // Functions
  const handleLoginClick = async (event) => {
    event.preventDefault()
    
    try {
      const user = await login({
        email, password
      })

      console.log("Login Successful: ", user)
      alert("Login Successful")
      
      reportService.setToken(user.token)
      setUser(user)
      setEmail('')
      setPassword('')

    } catch (exception) {
      setTimeout(() => {
      }, 5000)
    }
  }

  useEffect(() => {
    // Navigate after the component is rendered and user is set
    if (user !== null) {
      navigate('/HomePage');
    }
  }, [user, navigate]);


  return (
    <div className="login-page">
      <div className='login-container'>
        <div className='login-logo'>
            <img src= {logo} alt="logo" />
            <h1><span>R</span>oute<span>W</span>ise</h1>
        </div>

        <h4>Login to your Account</h4>

        {user === null ? (
        <div className='form-container'>
          <div className='mb20'>
            <h6>Email: </h6>
            <input
              type="text" 
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              autoComplete='on'
            />
          </div>

          <div className='mb20'>
            <h6>Password: </h6>
            <input 
              type="password"
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <div className='form-button mb20'>
            <button onClick={handleLoginClick}>Login</button>
          </div>
        </div>
        ) : null}

        <div className='back-button-div'>
          <button className='back-btn' onClick={() => navigate('/')}>Back</button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
