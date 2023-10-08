import { 
    BrowserRouter as Router,
    Routes, 
    Route
} from 'react-router-dom'
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/HomePage"

const Routing = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<LandingPage />}></Route>
                    <Route path='/LoginPage' element={<LoginPage />}></Route>
                    <Route path='/SignupPage' element={<SignupPage />}></Route>
                    <Route path='/HomePage' element={<HomePage />}></Route>
                    
                </Routes>
            </Router>

        </>
    )
}

export default Routing
