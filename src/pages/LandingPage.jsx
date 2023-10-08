import { Link } from 'react-router-dom'

const LandingPage = () => {
    return (
        <div>
            <h1>Landing Page</h1>
            <Link to='/LoginPage'><button>To Login Page</button></Link>
        </div>
    )
}

export default LandingPage
