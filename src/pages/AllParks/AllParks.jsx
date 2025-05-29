import "./AllParks.css";
import ParkCard from "../../components/ui/ParkCard/ParkCard.jsx";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/ui/Pagination/Pagination.jsx";
import ParksFilter from "../../components/ui/ParksFilter/ParksFilter.jsx";

function AllParks() {
    const [parks, setParks] = useState([]);
    const [filteredParks, setFilteredParks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [displayPage, setDisplayPage] = useState(1);
    const [totalParks, setTotalParks] = useState(0);
    const [activeFilters, setActiveFilters] = useState({ state: '', hasFee: '' });
    const [allParksData, setAllParksData] = useState([]);
    const parksPerPage = 20;

    useEffect(() => {
        if (activeFilters.hasFee) {
            fetchAllParksForFilter(activeFilters.state);
        } else {
            fetchParks(currentPage, activeFilters.state);
        }
    }, [currentPage, activeFilters.state]);

    useEffect(() => {
        if (activeFilters.hasFee) {
            if (allParksData.length === 0 || activeFilters.state !== allParksData.stateFilter) {
                fetchAllParksForFilter(activeFilters.state);
            } else {
                applyFeeFilter();
            }
        } else if (parks.length > 0) {
            setFilteredParks(parks);
        }
    }, [activeFilters.hasFee]);

    async function fetchParks(page, stateCode = '') {
        try {
            setLoading(true);
            setError(false);

            const start = (page - 1) * parksPerPage;

            let apiUrl = `https://developer.nps.gov/api/v1/parks?limit=${parksPerPage}&start=${start}&api_key=${import.meta.env.VITE_API_KEY}`;

            if (stateCode) {
                apiUrl += `&stateCode=${stateCode}`;
            }

            const response = await axios.get(
                apiUrl,
                {
                    headers: {
                        'accept': 'application/json',
                    },
                }
            );

            const parksData = response.data.data;
            setParks(parksData);
            setFilteredParks(parksData);
            setTotalParks(response.data.total);
        } catch (err) {
            console.error("Error fetching parks data:", err);
            setError(true);
            setParks([]);
            setFilteredParks([]);
            setTotalParks(0);
        } finally {
            setLoading(false);
        }
    }

    async function fetchAllParksForFilter(stateCode = '') {
        try {
            setLoading(true);
            setError(false);

            const maxLimit = 100;
            let allParks = [];
            let total = 0;
            let hasMore = true;
            let start = 0;

            while (hasMore) {
                let apiUrl = `https://developer.nps.gov/api/v1/parks?limit=${maxLimit}&start=${start}&api_key=${import.meta.env.VITE_API_KEY}`;

                if (stateCode) {
                    apiUrl += `&stateCode=${stateCode}`;
                }

                const response = await axios.get(
                    apiUrl,
                    {
                        headers: {
                            'accept': 'application/json',
                        },
                    }
                );

                const parksData = response.data.data;
                allParks = [...allParks, ...parksData];

                if (start === 0) {
                    total = response.data.total;
                }

                start += maxLimit;
                hasMore = start < total;
            }

            setAllParksData({
                parks: allParks,
                stateFilter: stateCode
            });

            setTotalParks(total);

            applyFeeFilterToAll(allParks);
        } catch (err) {
            console.error("Error fetching all parks data:", err);
            setError(true);
            setAllParksData({ parks: [], stateFilter: stateCode });
            setFilteredParks([]);
            setTotalParks(0);
        } finally {
            setLoading(false);
        }
    }

    const applyFeeFilterToAll = (allParks) => {
        const hasFeeBoolean = activeFilters.hasFee === 'true';

        const filtered = allParks.filter(park => {
            const hasEntryFee = park.entranceFees &&
                park.entranceFees.some(fee => fee.cost && parseFloat(fee.cost) > 0);
            return hasEntryFee === hasFeeBoolean;
        });

        setFilteredParks(filtered);

        setDisplayPage(1);
    };

    const applyFeeFilter = () => {
        if (!activeFilters.hasFee || !allParksData.parks) {
            return;
        }

        applyFeeFilterToAll(allParksData.parks);
    };

    const handleFilterChange = (newFilters) => {
        setActiveFilters(newFilters);

        setCurrentPage(1);
        setDisplayPage(1);
    };

    const handlePageChange = (newPage) => {
        if (activeFilters.hasFee) {
            setDisplayPage(newPage);
        } else {
            setCurrentPage(newPage);
        }
    };

    const getDisplayParks = () => {
        if (activeFilters.hasFee) {
            const start = (displayPage - 1) * parksPerPage;
            const end = start + parksPerPage;
            return filteredParks.slice(start, end);
        } else {
            return parks;
        }
    };

    const displayParks = getDisplayParks();
    const displayTotal = activeFilters.hasFee ? filteredParks.length : totalParks;

    if (loading && displayParks.length === 0) {
        return (
            <section className="outer-content-container">
                <div className="inner-content-container all-parks">
                    <h1>All Parks</h1>
                    <div className="centered-loading">
                        <span className="loading-message">
                            <span className="loading-spinner"></span>
                            Loading parks...
                        </span>
                    </div>
                </div>
            </section>
        );
    }

    if (error && displayParks.length === 0) {
        return (
            <section className="outer-content-container">
                <div className="inner-content-container all-parks">
                    <h1>All Parks</h1>
                    <p>Error loading parks. Please try again later.</p>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="outer-content-container">
                <div className="inner-content-container all-parks">
                    <h1>All Parks</h1>

                    {/* Add filter component */}
                    <ParksFilter
                        onFilterChange={handleFilterChange}
                        isLoading={loading}
                        currentFilters={activeFilters}
                    />

                    {/* Show filtered count or loading message */}
                    {(activeFilters.state || activeFilters.hasFee) && (
                        <p className="filter-results-count">
                            {loading ? (
                                <span className="loading-message">
                                    <span className="loading-spinner"></span>
                                    Loading parks with selected filters...
                                </span>
                            ) : (
                                `Showing ${displayTotal} parks with selected filters`
                            )}
                        </p>
                    )}

                    {displayParks.length === 0 && !loading ? (
                        <div className="no-results">
                            <p>No parks found matching your filter criteria.</p>
                            <p>Try adjusting your filters or <button onClick={() => handleFilterChange({ state: '', hasFee: '' })}>clear all filters</button>.</p>
                        </div>
                    ) : (
                        <>
                            <div className="parks-container">
                                {displayParks.map((park) => (
                                    <ParkCard key={park.id} parkData={park} />
                                ))}
                            </div>

                            {loading && displayParks.length > 0 && (
                                <div className="loading-indicator">
                                    <span className="loading-spinner"></span>
                                    Loading more parks...
                                </div>
                            )}

                            {!loading && displayParks.length > 0 && (
                                <Pagination
                                    currentPage={activeFilters.hasFee ? displayPage : currentPage}
                                    totalItems={displayTotal}
                                    itemsPerPage={parksPerPage}
                                    onPageChange={handlePageChange}
                                    scrollToTop={true}
                                />
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
}

export default AllParks;