import { 
    Routes, 
    Route
} from 'react-router-dom'
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"

function App() {
    return (
        <>
            <header>
                <Routes>
                    <Route path='/' element={<LandingPage />}></Route>
                    <Route path='/LoginPage' element={<LoginPage />}></Route>
                </Routes>


            </header>
        </>
    );
}

export default App;
