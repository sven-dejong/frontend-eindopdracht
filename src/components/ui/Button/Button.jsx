import React from "react";
import "./Button.css";

function Button({
                    buttonType = "button",
                    className = "",
                    children,
                    variant = "primary",
                    size = "medium",
                    fullWidth = false,
                    disabled = false,
                    onClick,
                    // Link props
                    href,
                    target,
                    rel,
                    asLink = false
                }) {
    // Build the complete class string
    const buttonClasses = [
        "button",
        variant === "secondary" ? "secondary" : "",
        size === "small" ? "small" : "",
        size === "large" ? "large" : "",
        fullWidth ? "full-width" : "",
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