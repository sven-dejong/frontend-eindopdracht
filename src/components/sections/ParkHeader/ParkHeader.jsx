import "./ParkHeader.css"
import React, { useState } from "react";
import heartHollow from "/src/assets/heart-hollow.png";
import heartFilled from "/src/assets/heart-filled.png";

function ParkHeader({park}) {
    const [isFavorited, setIsFavorited] = useState(false); // This will eventually come from your favorites state/context

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFavorited(!isFavorited);
        console.log('Favorite toggled for:', park.fullName, 'New state:', !isFavorited);
        // TODO: Add logic to save/remove from favorites
    };

    return (
        <header className="park-detail-header">
            <img src={park.images[0].url} alt={park.fullName}/>
            <div className="header-overlay">
                <h1>{park.fullName}</h1>
                <p>{park.designation}</p>
            </div>
            <button
                className={`favorite-button ${isFavorited ? 'favorited' : ''}`}
                onClick={handleFavoriteClick}
                aria-label={`${isFavorited ? 'Remove' : 'Add'} ${park.fullName} ${isFavorited ? 'from' : 'to'} favorites`}
            >
                <img
                    src={isFavorited ? heartFilled : heartHollow}
                    alt="Favorite"
                    className="heart-icon"
                />
            </button>
        </header>
    )
}

export default ParkHeader;