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

                    <li>
                        <strong>Entrance fee:</strong>
                        {parkData.entranceFees && parkData.entranceFees.length > 0 ? (
                            <div className="fee-options">
                                <p className="main-fee">
                                    {parkData.entranceFees.find(fee => fee.title.includes("Private Vehicle")) ?
                                        `$${parkData.entranceFees.find(fee => fee.title.includes("Private Vehicle")).cost} per vehicle` :
                                        parkData.entranceFees.find(fee => parseFloat(fee.cost) > 0) ?
                                            `$${parkData.entranceFees.find(fee => parseFloat(fee.cost) > 0).cost}` : "Free"}
                                </p>
                                <details>
                                    <summary>View all entrance fee options</summary>
                                    <ul className="fee-details">
                                        {parkData.entranceFees.map((fee, index) => (
                                            <li key={index} className="fee-item">
                                                <strong>{fee.title}:</strong> {parseFloat(fee.cost) > 0 ? `$${fee.cost}` : "Free"}
                                                <p className="fee-description">{fee.description}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                            </div>
                        ) : (
                            <p>Free</p>
                        )}
                    </li>

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