import React, { useEffect, useState } from 'react';
import './Navigation.css';
import { Link, NavLink, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Button from "../Button/Button.jsx";

function Navigation() {
    const location = useLocation();
    const [isHomePage, setIsHomePage] = useState(false);

    useEffect(() => {
        setIsHomePage(location.pathname === '/');
    }, [location]);

    return (
        <nav className={`main-navigation outer-content-container ${!isHomePage ? 'with-background' : ''}`}>
            <div className="inner-nav-container">
                <div className="nav-home">
                    <Link to="/"><h1>ParkPal</h1></Link>
                </div>
                <SearchBar />
                <ul className="main-navigation-links">
                    <Button className="primary">
                        <NavLink to="/parks"
                                 className={({isActive}) => isActive ? "active-link" : "default-link"}>
                            All Parks
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
    );
}

export default Navigation;