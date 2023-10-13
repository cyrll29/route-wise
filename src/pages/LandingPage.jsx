import { useNavigate } from 'react-router-dom'
import '../assets/styles/landing.css'
import logo from '../assets/img/logo.png'

const LandingPage = () => {

    const navigate = useNavigate();

    const navigateToLoginPage = () => {
        navigate('/LoginPage')
    }

    const navigateToGuestPage = () => {
        navigate('/HomePage')
    }

    const navigateToSignupPage = () => {
        navigate('/SignupPage')
    }
    
    return (
        <div className='landing-page'>
            <div className='landing-container'>

                <div className='landing-logo'>
                    <img src= {logo} alt="logo" />
                </div>

                <div className='landing-title'>
                    <h1><span>R</span>oute<span>W</span>ise</h1>
                </div>

                <div className='landing-btn'>
                    <button onClick={navigateToLoginPage}>Sign in with Email</button>
                    <button onClick={navigateToGuestPage}>Continue as Guest</button>
                </div>

                <div className='landing-txt'>
                    <h5>No Account? <span onClick={navigateToSignupPage}>Create One</span></h5>
                </div>

            </div>
        </div>
    )
}

export default LandingPage
