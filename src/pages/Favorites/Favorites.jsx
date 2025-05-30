import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import ParkCard from '../../components/ui/ParkCard/ParkCard';
import Button from '../../components/ui/Button/Button';
import Pagination from '../../components/ui/Pagination/Pagination';
import './Favorites.css';

function Favorites() {
    const { isAuthenticated } = useAuth();
    const { favorites, clearAllFavorites, getFavoriteCount } = useFavorites();
    const navigate = useNavigate();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const parksPerPage = 20; // Zelfde als AllParks component

    // Redirect if not authenticated
    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleClearAll = () => {
        const confirmClear = window.confirm(
            `Are you sure you want to remove all ${getFavoriteCount()} parks from your favorites? This action cannot be undone.`
        );
        if (confirmClear) {
            clearAllFavorites();
            // Reset naar eerste pagina na het wissen
            setCurrentPage(1);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Bereken welke parks getoond moeten worden op huidige pagina
    const getDisplayParks = () => {
        const startIndex = (currentPage - 1) * parksPerPage;
        const endIndex = startIndex + parksPerPage;
        return favorites.slice(startIndex, endIndex);
    };

    const displayParks = getDisplayParks();

    if (!isAuthenticated) {
        return (
            <div className="favorites-container">
                <div className="favorites-header">
                    <h1>Access Denied</h1>
                    <p>Please log in to view your favorites.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-container">
            <div className="favorites-header">
                <h1>My Favorite Parks</h1>
                <p>
                    {getFavoriteCount() === 0
                        ? 'You haven\'t added any parks to your favorites yet'
                        : `You have ${getFavoriteCount()} park${getFavoriteCount() !== 1 ? 's' : ''} in your favorites`
                    }
                </p>

                {getFavoriteCount() > 0 && (
                    <div className="favorites-actions">
                        <Button
                            variant="primary"
                            onClick={() => navigate('/parks')}
                            className="primary"
                        >
                            Discover More Parks
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={handleClearAll}
                            className="secondary"
                        >
                            Clear All Favorites
                        </Button>
                    </div>
                )}
            </div>

            <div className="favorites-content">
                {getFavoriteCount() === 0 ? (
                    <div className="empty-favorites">
                        <h2>No Favorites Yet</h2>
                        <p>Start exploring and add parks to your favorites by clicking the heart icon on any park card.</p>
                        <Button
                            variant="primary"
                            onClick={() => navigate('/parks')}
                            className="primary"
                        >
                            Explore Parks
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="parks-container">
                            {displayParks.map((park) => (
                                <ParkCard
                                    key={park.parkCode}
                                    parkData={{
                                        parkCode: park.parkCode,
                                        name: park.name,
                                        fullName: park.fullName,
                                        designation: park.designation,
                                        states: park.states,
                                        images: park.image ? [{ url: park.image }] : []
                                    }}
                                />
                            ))}
                        </div>

                        {/* Voeg pagination toe als er meer dan parksPerPage favorites zijn */}
                        <Pagination
                            currentPage={currentPage}
                            totalItems={getFavoriteCount()}
                            itemsPerPage={parksPerPage}
                            onPageChange={handlePageChange}
                            scrollToTop={true}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default Favorites;