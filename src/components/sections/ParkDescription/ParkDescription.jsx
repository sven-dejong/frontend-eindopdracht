import "./ParkDescription.css"
import React from "react";
import {useNavigate} from "react-router-dom";
import BackButton from "../../ui/BackButton/BackButton.jsx";
import Button from "../../ui/Button/Button.jsx";

function ParkDescription({park, webcams}) {
    useNavigate();

    const handleViewWebcam = () => {
        if (webcams && webcams.length === 1) {
            window.open(webcams[0].url, '_blank');
        } else if (webcams && webcams.length > 1) {
            window.open(webcams[0].url, '_blank');
        }
    };

    return (
        <div className="park-description">
            <h2>About {park.fullName}</h2>
            <p>{park.description}</p>

            {park.directionsInfo && (
                <div className="directions-info">
                    <h3>Getting There</h3>
                    <p>{park.directionsInfo}</p>
                </div>
            )}

            <div className="park-actions">
                <BackButton className="primary">
                    Back to overview
                </BackButton>

                {webcams && webcams.length > 0 ? (
                    <Button
                        onClick={handleViewWebcam}
                        className="primary"
                    >
                        View Webcam
                    </Button>
                ) : (
                    <Button
                        disabled={true}
                        className="secondary disabled"
                    >
                        No Webcam Available
                    </Button>
                )}
            </div>
        </div>
    )
}

export default ParkDescription;