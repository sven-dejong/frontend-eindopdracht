import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import "./ParkDetail.css";
import Button from "../../components/ui/Button/Button.jsx";
import ParkInformation from "../../components/ui/ParkInformation/ParkInformation.jsx";
import PhotoGallery from "../../components/ui/PhotoGallery/PhotoGallery.jsx";
import ParkHeader from "../../components/sections/ParkHeader/ParkHeader.jsx";
import ParkDescription from "../../components/sections/ParkDescription/ParkDescription.jsx";
import BackButton from "../../components/ui/BackButton/BackButton.jsx";

function ParkDetail() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [park, setPark] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Create an AbortController for canceling the fetch request
        const abortController = new AbortController();
        let isMounted = true;

        async function fetchParkDetail(parkCode) {
            try {
                if (isMounted) {
                    setLoading(true);
                    setError(false);
                }

                const response = await axios.get(
                    `https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=${import.meta.env.VITE_API_KEY}`,
                    {
                        headers: {
                            'accept': 'application/json',
                        },
                        signal: abortController.signal // Connect abort controller to the request
                    }
                );

                // Only update state if component is still mounted
                if (isMounted) {
                    if (response.data.data && response.data.data.length > 0) {
                        setPark(response.data.data[0]);
                    } else {
                        // No park found with this code
                        setError(true);
                    }
                    setLoading(false);
                }
            } catch (err) {
                // Only update error state if this isn't an abort error and component is mounted
                if (err.name !== 'CanceledError' && isMounted) {
                    console.error("Error fetching park details:", err);
                    setError(true);
                    setLoading(false);
                }
            }
        }

        fetchParkDetail(id);

        // Add event listener for the "Back to Top" functionality
        const backToTopButton = document.querySelector(".back-to-top-container button");
        const handleBackToTop = () => window.scrollTo({top: 0, behavior: 'smooth'});

        if (backToTopButton) {
            backToTopButton.addEventListener("click", handleBackToTop);
        }

        // Cleanup function that runs when component unmounts or dependencies change
        return () => {
            isMounted = false;
            abortController.abort(); // Cancel any pending requests

            // Remove the event listener if it was added
            if (backToTopButton) {
                backToTopButton.removeEventListener("click", handleBackToTop);
            }
        };
    }, [id]);

    if (loading) {
        return (
            <section className="outer-content-container">
                <div className="inner-content-container park-detail loading">
                    <h2>Loading...</h2>
                </div>
            </section>
        );
    }

    if (error || !park) {
        return (
            <section className="outer-content-container">
                <div className="inner-content-container park-detail error">
                    <h1>Park Not Found</h1>
                    <p>Sorry, we couldn't find information for this park.</p>
                    <BackButton className="primary">
                        Go Back
                    </BackButton>
                </div>
            </section>
        );
    }

    return (
        <>
            <ParkHeader park={park} />
            <section className="outer-content-container">
                <div className="inner-content-container park-detail">

                    <div className="park-info-grid">
                        <ParkDescription park={park} />
                        <ParkInformation parkData={park} />
                    </div>

                    {park.images && park.images.length > 1 && (
                        <div className="park-gallery">
                            <h2>Photo Gallery</h2>
                            <PhotoGallery park={park} />

                            <div className="back-to-top-container">
                                <Button
                                    onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                                    className="primary"
                                >Back to Top ↑
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default ParkDetail;