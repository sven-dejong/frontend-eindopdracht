import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ParkCard from '../../components/ui/ParkCard/ParkCard';
import Pagination from '../../components/ui/Pagination/Pagination';
import './SearchResults.css';

function SearchResults() {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('term') || '';

    const [parks, setParks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalParks, setTotalParks] = useState(0);
    const parksPerPage = 20;

    useEffect(() => {
        const abortController = new AbortController();
        let isMounted = true;

        const fetchParks = async () => {
            try {
                setLoading(true);
                setError(null);

                const start = (currentPage - 1) * parksPerPage;

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
                    setParks(response.data.data || []);

                    setTotalParks(response.data.total || 0);
                    setLoading(false);
                }
            } catch (err) {
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
            abortController.abort();
        };
    }, [searchTerm, currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

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
                    <h1>Search results</h1>
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

                            <Pagination
                                currentPage={currentPage}
                                totalItems={totalParks}
                                itemsPerPage={parksPerPage}
                                onPageChange={handlePageChange}
                                scrollToTop={true}
                            />
                        </>
                    )}
                </div>
            </section>
        </>
    );
}

export default SearchResults;