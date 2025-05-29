// contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

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

    // Load user and token from localStorage on mount
    useEffect(() => {
        try {
            const savedToken = localStorage.getItem('parkpal-token');
            const savedUser = localStorage.getItem('parkpal-user');

            if (savedToken && savedUser) {
                const parsedUser = JSON.parse(savedUser);
                setToken(savedToken);
                setUser(parsedUser);
                setIsAuthenticated(true);
                console.log('✅ User loaded from localStorage:', parsedUser);
            } else {
                console.log('📝 No saved authentication found');
            }
        } catch (error) {
            console.error('Error loading authentication from localStorage:', error);
            // Clear potentially corrupted data
            localStorage.removeItem('parkpal-token');
            localStorage.removeItem('parkpal-user');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = (userData, accessToken) => {
        try {
            console.log('🔐 Logging in user:', userData);

            // Store in localStorage
            localStorage.setItem('parkpal-token', accessToken);
            localStorage.setItem('parkpal-user', JSON.stringify(userData));

            // Update state
            setToken(accessToken);
            setUser(userData);
            setIsAuthenticated(true);

            console.log('✅ Login successful, user data saved');
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    };

    const logout = () => {
        try {
            console.log('🚪 Logging out user');

            // Clear localStorage
            localStorage.removeItem('parkpal-token');
            localStorage.removeItem('parkpal-user');

            // Clear state
            setToken(null);
            setUser(null);
            setIsAuthenticated(false);

            console.log('✅ Logout successful');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const updateUser = (updatedUserData) => {
        try {
            console.log('📝 Updating user data:', updatedUserData);

            const newUserData = { ...user, ...updatedUserData };

            // Update localStorage
            localStorage.setItem('parkpal-user', JSON.stringify(newUserData));

            // Update state
            setUser(newUserData);

            console.log('✅ User data updated');
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    // Check if token is expired (basic check)
    const isTokenValid = () => {
        if (!token) return false;

        try {
            // JWT tokens have 3 parts separated by dots
            const payload = token.split('.')[1];
            if (!payload) return false;

            // Decode the payload (basic check)
            const decodedPayload = JSON.parse(atob(payload));
            const currentTime = Date.now() / 1000;

            // Check if token is expired
            if (decodedPayload.exp && decodedPayload.exp < currentTime) {
                console.log('⚠️ Token has expired');
                logout(); // Auto-logout if token is expired
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error validating token:', error);
            return false;
        }
    };

    // Get authorization header for API requests
    const getAuthHeader = () => {
        if (!token || !isTokenValid()) {
            return {};
        }

        return {
            'Authorization': `Bearer ${token}`,
            'X-Api-Key': 'parkpal:eCBGnZ1sIu7QwZZja1D3'
        };
    };

    // Make authenticated API requests
    const authenticatedFetch = async (url, options = {}) => {
        const authHeaders = getAuthHeader();

        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...authHeaders,
                ...options.headers
            }
        });

        // Handle unauthorized responses
        if (response.status === 401) {
            console.log('🚫 Unauthorized request, logging out');
            logout();
            throw new Error('Session expired. Please log in again.');
        }

        return response;
    };

    const value = {
        // State
        user,
        token,
        isLoading,
        isAuthenticated,

        // Methods
        login,
        logout,
        updateUser,
        isTokenValid,
        getAuthHeader,
        authenticatedFetch,

        // User info helpers
        getUserId: () => user?.id,
        getUsername: () => user?.username,
        getUserEmail: () => user?.email,
        getUserRoles: () => user?.roles || [],
        isAdmin: () => user?.roles?.includes('ROLE_ADMIN') || false,
        isModerator: () => user?.roles?.includes('ROLE_MODERATOR') || false
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};