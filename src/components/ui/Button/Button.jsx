import React from "react";
import "./Button.css";

function Button({ buttonType = "button", className = "", children }) {
    return (
        <button
            type={buttonType}
            className={`button ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;
