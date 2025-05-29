import "./PhotoGallery.css"
import React from "react";

function PhotoGallery({ park }) {
    return (
        <div className="gallery-grid">
            {park.images.map((image, index) => (
                <div key={index} className="gallery-image">
                    <img src={image.url} alt={image.altText}/>
                    <p className="image-caption">{image.caption}</p>
                </div>
            ))}
        </div>
    )
}

export default PhotoGallery;