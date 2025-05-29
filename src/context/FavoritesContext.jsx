// contexts/FavoritesContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Load favorites from localStorage on mount
    useEffect(() => {
        try {
            const savedFavorites = localStorage.getItem('parkpal-favorites');
            if (savedFavorites) {
                setFavorites(JSON.parse(savedFavorites));
            }
        } catch (error) {
            console.error('Error loading favorites from localStorage:', error);
        }
    }, []);

    // Save favorites to localStorage whenever favorites change
    useEffect(() => {
        try {
            localStorage.setItem('parkpal-favorites', JSON.stringify(favorites));
        } catch (error) {
            console.error('Error saving favorites to localStorage:', error);
        }
    }, [favorites]);

    const addFavorite = (park) => {
        setFavorites(prev => {
            // Check if park is already in favorites
            if (prev.some(fav => fav.parkCode === park.parkCode)) {
                return prev; // Already favorited, no change
            }
            return [...prev, {
                parkCode: park.parkCode,
                name: park.name || park.fullName,
                fullName: park.fullName,
                designation: park.designation,
                states: park.states,
                image: park.images?.[0]?.url,
                dateAdded: new Date().toISOString()
            }];
        });
    };

    const removeFavorite = (parkCode) => {
        setFavorites(prev => prev.filter(fav => fav.parkCode !== parkCode));
    };

    const toggleFavorite = (park) => {
        if (isFavorited(park.parkCode)) {
            removeFavorite(park.parkCode);
        } else {
            addFavorite(park);
        }
    };

    const isFavorited = (parkCode) => {
        return favorites.some(fav => fav.parkCode === parkCode);
    };

    const clearAllFavorites = () => {
        setFavorites([]);
    };

    const getFavoriteCount = () => {
        return favorites.length;
    };

    const value = {
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorited,
        clearAllFavorites,
        getFavoriteCount
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};