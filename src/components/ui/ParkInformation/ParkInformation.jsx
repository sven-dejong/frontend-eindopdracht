import React from "react";
import "./ParkInformation.css"

function ParkInformation({ parkData }) {
    return (
        <div className="park-quick-info">
            <div className="info-card">
                <h3>Information</h3>
                <ul>
                    <li>
                        <strong>States:</strong>
                        <p>{parkData.states}</p>
                    </li>

                    {parkData.entranceFees && parkData.entranceFees.length > 0 && (
                        <li>
                            <strong>Entrance fee:</strong>
                            <p>${parkData.entranceFees[0].cost}</p>
                        </li>
                        )}

                    {parkData.entranceFees && parkData.entranceFees.length > 0 && (
                        <li>
                                <strong>Fee description:</strong>
                                <p>{parkData.entranceFees[0].description}</p>
                        </li>
                    )}

                    {parkData.operatingHours && parkData.operatingHours.length > 0 && (
                        <li>
                            <strong>Opening hours:</strong>
                            <p>{parkData.operatingHours[0].description}</p>
                        </li>
                    )}

                    {parkData.weatherInfo && (
                        <li>
                            <strong>Weather:</strong>
                            <p>{parkData.weatherInfo}</p>
                        </li>
                    )}

                </ul>
            </div>
        </div>
    )
}

export default ParkInformation;