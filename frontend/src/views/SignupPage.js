import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userService from '../services/userService'

import logo from '../assets/img/logo.png'
import '../assets/styles/signup.css'


const SignupPage = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState("");
  const [error, setError] = useState('')

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
        setMsg(response.message);
        setError("");
        clearInputFields();
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
          setMsg("");
        }
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

          {error && <div className="signup-page-error-msg">{error}</div>}
          {msg && <div className="signup-page-success-msg">{msg}</div>}

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
