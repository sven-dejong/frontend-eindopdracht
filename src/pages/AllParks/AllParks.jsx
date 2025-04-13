import "./AllParks.css"
import ParkCard from "../../components/ui/ParkCard/ParkCard.jsx";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../components/ui/Button/Button.jsx";

function AllParks() {
    const [parks, setParks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalParks, setTotalParks] = useState(0);
    const parksPerPage = 20;

    useEffect(() => {

        // Fetch parks data when component mounts or page changes
        fetchParks(currentPage);
    }, [currentPage]);

    async function fetchParks(page) {
        try {
            setLoading(true);
            setError(false);

            // Calculate start index based on current page
            const start = (page - 1) * parksPerPage;

            // Fetch parks with limit and start parameters
            const response = await axios.get(
                `https://developer.nps.gov/api/v1/parks?limit=${parksPerPage}&start=${start}&api_key=${import.meta.env.VITE_API_KEY}`,
                {
                    headers: {
                        'accept': 'application/json',
                    },
                }
            );

            setParks(response.data.data);
            setTotalParks(response.data.total);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching parks data:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

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
                    <h1>All Parks</h1>
                    <p>Loading...</p>
                </div>
            </section>
        );
    }

    if (error && parks.length === 0) {
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

                    <div className="parks-container">
                        {parks.map((park) => (
                            <ParkCard key={park.id} parkData={park} />
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
                </div>
            </section>
        </>
    );
}

export default AllParks;