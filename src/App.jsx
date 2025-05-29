import './App.css'
import {Route, Routes} from "react-router-dom";
import {FavoritesProvider} from "./context/FavoritesContext.jsx";
import Home from "./pages/Home/Home.jsx"
import AllParks from "./pages/AllParks/AllParks.jsx"
import SearchResults from "./pages/SearchResults/SearchResults.jsx"
import Login from "./pages/Login/Login.jsx"
import Register from "./pages/Register/Register.jsx"
import NotFound from "./pages/NotFound/NotFound.jsx"
import Navigation from "./components/ui/Navigation/Navigation.jsx";
import Footer from "./components/ui/Footer/Footer.jsx";
import ParkDetail from "./pages/ParkDetail/ParkDetail.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";

function App() {

    return (
        <>
            <AuthProvider>
            <FavoritesProvider>
                <Navigation/>
                <main>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/parks" element={<AllParks/>}/>
                        <Route path="/parks/:id" element={<ParkDetail/>}/>
                        <Route path="/search" element={<SearchResults/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </main>
                <Footer/>
            </FavoritesProvider>
            </AuthProvider>
        </>
    )
}

export default App
