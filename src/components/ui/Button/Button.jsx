import React from "react";
import "./Button.css";

function Button({
                    buttonType = "button",
                    className = "",
                    children,
                    variant = "primary",
                    disabled = false,
                    onClick,
                }) {
    // Build the complete class string
    const buttonClasses = [
        "button",
        variant === "secondary" ? "secondary" : "",
        className
    ].filter(Boolean).join(" ");
    // Otherwise render as a button
    return (
        <button
            type={buttonType}
            className={buttonClasses}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;