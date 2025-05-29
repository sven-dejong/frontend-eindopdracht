import "./ParkCard.css"
import { Link } from "react-router-dom";
import { useFavorites } from "/src/context/FavoritesContext.jsx";
import heartHollow from "/src/assets/heart-hollow.png";
import heartFilled from "/src/assets/heart-filled.png";

function ParkCard({ parkData }) {
    const image = parkData?.images?.[0]?.url
    const { toggleFavorite, isFavorited } = useFavorites();
    const isCurrentlyFavorited = isFavorited(parkData.parkCode);

    const handleFavoriteClick = (e) => {
        e.preventDefault(); // Prevent navigation when clicking the heart
        e.stopPropagation();
        toggleFavorite(parkData);
        console.log('Favorite toggled for:', parkData.name, 'New state:', !isCurrentlyFavorited);
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
                        className={`favorite-button ${isCurrentlyFavorited ? 'favorited' : ''}`}
                        onClick={handleFavoriteClick}
                        aria-label={`${isCurrentlyFavorited ? 'Remove' : 'Add'} ${parkData.name} ${isCurrentlyFavorited ? 'from' : 'to'} favorites`}
                    >
                        <img
                            src={isCurrentlyFavorited ? heartFilled : heartHollow}
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