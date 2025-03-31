import {useState} from 'react'
import './App.css'
import {Link, NavLink, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home.jsx"
import AllParks from "./pages/AllParks/AllParks.jsx"
import Login from "./pages/Login/Login.jsx"
import Register from "./pages/Register/Register.jsx"
import NotFound from "./pages/NotFound/NotFound.jsx"
import Button from "./components/ui/Button/Button.jsx";

function App() {

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        console.log("Zoekterm:", event.target.value); // Check de zoekwaarde in de console
    };

    return (
        <>
            <nav className="main-navigation outer-content-container">
                <div className="inner-nav-container">
                    <Link to="/">ParkPal</Link>
                    <input
                        type="text"
                        placeholder="Zoek een park..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="search-bar"
                    />
                    <ul className="main-navigation-links">
                        <Button className="primary">
                            <NavLink to="/all-parks"
                                     className={({isActive}) => isActive ? "active-link" : "default-link"}>
                                All parks
                            </NavLink>
                        </Button>
                        <Button className="primary">
                            <NavLink to="/login" className={({isActive}) => isActive ? "active-link" : "default-link"}>
                                Login
                            </NavLink>
                        </Button>
                        <Button className="secondary">
                            <NavLink to="/register"
                                     className={({isActive}) => isActive ? "active-link" : "default-link"}>
                                Register
                            </NavLink>
                        </Button>
                    </ul>
                </div>
            </nav>
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/all-parks" element={<AllParks/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </main>
            <footer className="footer-navigation outer-content-container">
                ParkPal
            </footer>
        </>
    )
}

export default App
