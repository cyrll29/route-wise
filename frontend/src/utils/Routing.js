import { 
  BrowserRouter as Router,
  Routes, 
  Route
} from 'react-router-dom'
import LandingPage from "../views/LandingPage"
import LoginPage from "../views/LoginPage"
import SignupPage from "../views/SignupPage"
import HomePage from "../views/HomePage"
import EmailVerify from "../views/EmailVerify"


const Routing = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/LoginPage' element={<LoginPage />}></Route>
          <Route path='/SignupPage' element={<SignupPage />}></Route>
          <Route path='/HomePage' element={<HomePage />}></Route>
          <Route path='/users/:id/verify/:token' element={<EmailVerify />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default Routing
