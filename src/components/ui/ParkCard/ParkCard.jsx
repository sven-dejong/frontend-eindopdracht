import "./ParkCard.css"
import { Link } from "react-router-dom";

function ParkCard({ parkData }) {
    const image = parkData?.images?.[0]?.url

    return (
        <Link to={`/park/${parkData.parkCode}`} className="park-card-link">
            <div className="park-card">
                <div className="park-image">
                    <img src={image} alt={parkData.name} />
                    <div className="park-info-overlay">
                        <h2 className="park-title">{parkData.name}</h2>
                        <p className="park-type">{parkData.designation}</p>
                        <p className="park-location">{parkData.states}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ParkCard;