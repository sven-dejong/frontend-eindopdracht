import "./ParkHeader.css"
import React from "react";

function ParkHeader({park}) {
    return (
        <header className="park-detail-header">
            <img src={park.images[0].url} alt={park.fullName}/>
            <div className="header-overlay">
                <h1>{park.fullName}</h1>
                <p>{park.designation}</p>
            </div>
        </header>
    )
}

export default ParkHeader;