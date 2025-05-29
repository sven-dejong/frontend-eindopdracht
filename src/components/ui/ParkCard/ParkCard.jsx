import "./ParkCard.css"
import { Link } from "react-router-dom";
import { useState } from "react";
import heartHollow from "/src/assets/heart-hollow.png"; // Adjust path as needed
import heartFilled from "/src/assets/heart-filled.png";

function ParkCard({ parkData }) {
    const image = parkData?.images?.[0]?.url
    const [isFavorited, setIsFavorited] = useState(false); // This will eventually come from your favorites state/context

    const handleFavoriteClick = (e) => {
        e.preventDefault(); // Prevent navigation when clicking the heart
        e.stopPropagation();
        setIsFavorited(!isFavorited);
        console.log('Favorite toggled for:', parkData.name, 'New state:', !isFavorited);
        // TODO: Add logic to save/remove from favorites
    };

    return (
        <Link to={`/parks/${parkData.parkCode}`} className="park-card-link">
            <div className="park-card">
                <div className="park-image">
                    <img src={image} alt={parkData.name} />
                    <div className="park-info-overlay">
                        <h2 className="park-title">{parkData.name}</h2>
                        <p className="park-type">{parkData.designation}</p>
                        <p className="park-location">{parkData.states}</p>
                    </div>
                    <button
                        className={`favorite-button ${isFavorited ? 'favorited' : ''}`}
                        onClick={handleFavoriteClick}
                        aria-label={`${isFavorited ? 'Remove' : 'Add'} ${parkData.name} ${isFavorited ? 'from' : 'to'} favorites`}
                    >
                        <img
                            src={isFavorited ? heartFilled : heartHollow}
                            alt="Favorite"
                            className="heart-icon"
                        />
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default ParkCard;