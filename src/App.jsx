import {useState} from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home.jsx"
import AllParks from "./pages/AllParks/AllParks.jsx"
import Login from "./pages/Login/Login.jsx"
import Register from "./pages/Register/Register.jsx"
import NotFound from "./pages/NotFound/NotFound.jsx"
import Navigation from "./components/ui/Navigation/Navigation.jsx";
import Footer from "./components/ui/Footer/Footer.jsx";
import ParkCard from "./components/ui/ParkCard/ParkCard.jsx";
import ParkDetail from "./pages/ParkDetail/ParkDetail.jsx";

function App() {

    return (
        <>
            <Navigation />
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/all-parks" element={<AllParks/>}/>
                    <Route path="/park/:id" element={<ParkDetail/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App
