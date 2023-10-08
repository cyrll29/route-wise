import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/login.css'
import googleLogo from '../assets/img/google-logo.png'
import facebookLogo from '../assets/img/facebook-logo.png'
import logo from '../assets/img/logo.png'

const LoginPage = () => {
    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const handleEmailChange = (event) => {
        setUserEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setUserPassword(event.target.value)
    }

    const navigateToHomePage = () => {
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
                        <button onClick={navigateToHomePage}>Login</button>
                    </div>
                </div>


                <div className='login-or mb10'>
                    <hr />
                    <p>or</p>
                    <hr />
                </div>


                <div className='login-btn'>
                    <button><img className='login-btn-logo' src={googleLogo} alt="" />Sign in With Google</button>
                    <button><img className='login-btn-logo' src={facebookLogo} alt="" />Sign in With Facebook</button>
                    <div>
                        
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LoginPage
