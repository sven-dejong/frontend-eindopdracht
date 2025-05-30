import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const API_BASE_URL = 'https://api.datavortex.nl/parkpal';
    const API_KEY = import.meta.env.VITE_X_API_KEY;

    const authenticatedAxios = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': API_KEY
        }
    });

    useEffect(() => {
        try {
            const savedToken = localStorage.getItem('parkpal-token');
            const savedUser = localStorage.getItem('parkpal-user');

            if (savedToken && savedUser) {
                const parsedUser = JSON.parse(savedUser);

                setToken(savedToken);
                setUser(parsedUser);
                setIsAuthenticated(true);

            } else {
                console.log('No saved authentication found');
            }
        } catch (error) {
            console.error('Error loading authentication from localStorage:', error);
            localStorage.removeItem('parkpal-token');
            localStorage.removeItem('parkpal-user');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = (userData, accessToken) => {
        try {
            localStorage.setItem('parkpal-token', accessToken);
            localStorage.setItem('parkpal-user', JSON.stringify(userData));

            setToken(accessToken);
            setUser(userData);
            setIsAuthenticated(true);

        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    };

    const logout = () => {
        try {

            localStorage.removeItem('parkpal-token');
            localStorage.removeItem('parkpal-user');

            setToken(null);
            setUser(null);
            setIsAuthenticated(false);

        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const register = async (userData) => {
        try {

            const payload = {
                username: userData.username,
                email: userData.email,
                password: userData.password,
                info: userData.info || "ParkPal user",
                authorities: [
                    {
                        authority: "USER"
                    }
                ]
            };

            const response = await axios.post(`${API_BASE_URL}/users`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': API_KEY
                },
                timeout: 10000
            });

            return response.data;

        } catch (error) {
            console.error('❌ Registration error:', error);
            throw new Error(error.response?.data?.message || 'Registration failed');
        }
    };

    const loginUser = async (credentials) => {
        try {

            const response = await axios.post(`${API_BASE_URL}/users/authenticate`, {
                username: credentials.username,
                password: credentials.password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': API_KEY
                },
                timeout: 10000
            });

            const jwtToken = response.data.jwt;

            if (!jwtToken) {
                throw new Error('No JWT token received from server');
            }

            try {
                const tokenParts = jwtToken.split('.');
                if (tokenParts.length !== 3) {
                    throw new Error('Invalid JWT format');
                }

                const tokenPayload = JSON.parse(atob(tokenParts[1]));

                const userData = {
                    id: tokenPayload.userId,
                    username: tokenPayload.sub,
                    role: tokenPayload.role,
                    applicationName: tokenPayload.applicationName
                };

                login(userData, jwtToken);

                return { userData, accessToken: jwtToken };

            } catch (decodeError) {
                console.error('Failed to decode JWT:', decodeError);
                throw new Error('Invalid JWT token received from server');
            }

        } catch (error) {
            console.error('Login error details:', error);

            if (error.response?.status === 403) {
                throw new Error('Access denied. Please check your API key or credentials.');
            }

            if (error.response?.status === 401) {
                throw new Error('Invalid username or password.');
            }

            throw new Error(error.response?.data?.message || 'Login failed');
        }
    };

    const value = {
        user,
        token,
        isLoading,
        isAuthenticated,

        authenticatedAxios,

        login,
        logout,
        register,
        loginUser,

        getUserId: () => user?.id,
        getUsername: () => user?.username,
        getUserEmail: () => user?.email
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};