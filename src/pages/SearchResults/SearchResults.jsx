import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ParkCard from '../../components/ui/ParkCard/ParkCard';
import './SearchResults.css';
import Button from "../../components/ui/Button/Button.jsx";

function SearchResults() {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('term') || '';

    const [parks, setParks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalParks, setTotalParks] = useState(0);
    const parksPerPage = 20;

    // Fetch parks data based on search term
    useEffect(() => {

        const abortController = new AbortController();
        let isMounted = true;

        const fetchParks = async () => {
            try {
                setLoading(true);
                setError(null);

                // Calculate start index based on current page
                const start = (currentPage - 1) * parksPerPage;

                // Use the search term in the API query if provided
                const queryParam = searchTerm ? `&q=${encodeURIComponent(searchTerm)}` : '';

                const response = await axios.get(
                    `https://developer.nps.gov/api/v1/parks?limit=${parksPerPage}&start=${start}${queryParam}&api_key=${import.meta.env.VITE_API_KEY}`,
                    {
                        headers: {
                            'accept': 'application/json',
                        },
                        signal: abortController.signal
                    }
                );
                if (isMounted) {
                    // NPS API returns data in a 'data' property
                    setParks(response.data.data || []);

                    // Set total count from the API response
                    setTotalParks(response.data.total || 0);
                    setLoading(false);
                }
            } catch (err) {
                // Only update error state if this isn't an abort error and component is mounted
                if (err.name !== 'CanceledError' && isMounted) {
                    console.error('API Error:', err);
                    setError(
                        err.response?.data?.message ||
                        'Failed to fetch parks data. Please check your API key and try again.'
                    );
                    setLoading(false);
                }
            }
        };

        fetchParks();
        return () => {
            isMounted = false;
            abortController.abort(); // Cancel any pending requests
        };
    }, [searchTerm, currentPage]); // Re-fetch when search term or page changes
    // Handle page navigation
    const goToNextPage = () => {
        if (currentPage * parksPerPage < totalParks) {
            setCurrentPage(currentPage + 1);
            // Scroll to top of the page
            window.scrollTo(0, 0);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            // Scroll to top of the page
            window.scrollTo(0, 0);
        }
    };

    // Calculate total pages
    const totalPages = Math.ceil(totalParks / parksPerPage);

    if (loading && parks.length === 0) {
        return (
            <section className="outer-content-container">
                <div className="inner-content-container all-parks">
                    <h1>Search Results</h1>
                    <p>Loading...</p>
                </div>
            </section>
        );
    }

    if (error && parks.length === 0) {
        return (
            <section className="outer-content-container">
                <div className="inner-content-container all-parks">
                    <h1>Search Results</h1>
                    <p>Error loading parks. Please try again later.</p>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="outer-content-container">
                <div className="inner-content-container all-parks">
                    <h1>Search Results for "{searchTerm}"</h1>

                    {parks.length === 0 ? (
                        <div className="no-results">
                            <p>No parks found matching your search criteria.</p>
                            <p>Try searching by park name or state name.</p>
                        </div>
                    ) : (
                        <>
                            <p className="results-count">{totalParks} parks found</p>
                            <div className="parks-container">
                                {parks.map(park => (
                                    <ParkCard key={park.id} parkData={park}/>
                                ))}
                            </div>

                            {loading && parks.length > 0 && (
                                <div className="loading-indicator">Loading more parks...</div>
                            )}

                            <div className="pagination-controls">
                                <Button
                                    onClick={goToPrevPage}
                                    disabled={currentPage === 1}
                                    className={currentPage === 1 ? "disabled" : ""}
                                >
                                    Previous
                                </Button>

                                <span className="pagination-info">
                                    Page {currentPage} of {totalPages}
                                </span>

                                <Button
                                    onClick={goToNextPage}
                                    disabled={currentPage * parksPerPage >= totalParks}
                                    className={currentPage * parksPerPage >= totalParks ? "disabled" : ""}
                                >
                                    Next
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    );
}

export default SearchResults;