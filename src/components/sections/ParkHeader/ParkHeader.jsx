import "./ParkHeader.css"
import React from "react";
import { useAuth } from "/src/context/AuthContext";
import { useFavorites } from "/src/context/FavoritesContext";
import heartHollow from "/src/assets/heart-hollow.png";
import heartFilled from "/src/assets/heart-filled.png";

function ParkHeader({park}) {
    const { isAuthenticated } = useAuth();
    const { toggleFavorite, isFavorited } = useFavorites();
    const isCurrentlyFavorited = isFavorited(park.parkCode);

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Double check authentication before allowing toggle
        if (!isAuthenticated) {
            console.log('User not authenticated, cannot toggle favorite');
            return;
        }

        toggleFavorite(park);
        console.log('Favorite toggled for:', park.fullName, 'New state:', !isCurrentlyFavorited);
    };

    return (
        <header className="park-detail-header">
            <img src={park.images[0].url} alt={park.fullName}/>
            <div className="header-overlay">
                <h1>{park.fullName}</h1>
                <p>{park.designation}</p>
            </div>
            {/* Only show favorite button when user is authenticated */}
            {isAuthenticated && (
                <button
                    className={`favorite-button ${isCurrentlyFavorited ? 'favorited' : ''}`}
                    onClick={handleFavoriteClick}
                    aria-label={`${isCurrentlyFavorited ? 'Remove' : 'Add'} ${park.fullName} ${isCurrentlyFavorited ? 'from' : 'to'} favorites`}
                >
                    <img
                        src={isCurrentlyFavorited ? heartFilled : heartHollow}
                        alt="Favorite"
                        className="heart-icon"
                    />
                </button>
            )}
        </header>
    )
}

export default ParkHeader;