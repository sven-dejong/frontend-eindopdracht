import React from 'react';
import './Footer.css'

function Footer() {
    return (
        <footer className="footer-navigation">
                    <p>© ParkPal {new Date().getFullYear()}</p>
        </footer>
    )
}

export default Footer