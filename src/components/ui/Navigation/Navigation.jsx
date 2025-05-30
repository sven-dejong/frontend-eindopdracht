import React, { useEffect, useState } from 'react';
import './Navigation.css';
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from '/src/context/AuthContext'; // Adjust path as needed
import SearchBar from "../SearchBar/SearchBar.jsx";
import Button from "../Button/Button.jsx";

function Navigation() {
    const location = useLocation();
    const [isTransparentPage, setIsTransparentPage] = useState(false);
    const { isAuthenticated, user, logout, isLoading } = useAuth();

    useEffect(() => {
        // Pages where navigation should be transparent
        const transparentPages = ['/', '/login', '/register', '/profile'];
        setIsTransparentPage(transparentPages.includes(location.pathname));
    }, [location]);

    // Debug logging
    useEffect(() => {
        console.log('🧭 Navigation render - Auth state:');
        console.log('   - isLoading:', isLoading);
        console.log('   - isAuthenticated:', isAuthenticated);
        console.log('   - user:', user);
        console.log('   - username:', user?.username);
        console.log('   - isTransparentPage:', isTransparentPage);
    }, [isLoading, isAuthenticated, user, isTransparentPage]);

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className={`main-navigation outer-content-container ${!isTransparentPage ? 'with-background' : ''}`}>
            <div className="inner-nav-container">
                <div className="nav-home">
                    <Link to="/"><h1>ParkPal</h1></Link>
                </div>
                <SearchBar />
                <ul className="main-navigation-links">
                    {!isLoading && (
                        <>
                            {isAuthenticated ? (
                                <>
                                    <div className="welcome-message">
                                        Welcome, {user?.username}!
                                    </div>
                                    <Button className="primary">
                                        <NavLink to="/parks"
                                                 className={({isActive}) => isActive ? "active-link" : "default-link"}>
                                            All Parks
                                        </NavLink>
                                    </Button>
                                    <Button className="primary">
                                        <NavLink to="/profile"
                                                 className={({isActive}) => isActive ? "active-link" : "default-link"}>
                                            Profile
                                        </NavLink>
                                    </Button>
                                    <Button
                                        className="secondary"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button className="primary">
                                        <NavLink to="/parks"
                                                 className={({isActive}) => isActive ? "active-link" : "default-link"}>
                                            All Parks
                                        </NavLink>
                                    </Button>
                                    <Button className="secondary">
                                        <NavLink to="/login"
                                                 className={({isActive}) => isActive ? "active-link" : "default-link"}>
                                            Login
                                        </NavLink>
                                    </Button>
                                    <Button className="primary">
                                        <NavLink to="/register"
                                                 className={({isActive}) => isActive ? "active-link" : "default-link"}>
                                            Register
                                        </NavLink>
                                    </Button>
                                </>
                            )}
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;