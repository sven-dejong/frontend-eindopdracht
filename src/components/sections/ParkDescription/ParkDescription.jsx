import "./ParkDescription.css"
import React from "react";
import {useNavigate} from "react-router-dom";
import BackButton from "../../ui/BackButton/BackButton.jsx";

function ParkDescription({park}) {
    useNavigate();
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
            <BackButton
                className="primary">
                Back to All Parks
            </BackButton>
        </div>
    )
}

export default ParkDescription;