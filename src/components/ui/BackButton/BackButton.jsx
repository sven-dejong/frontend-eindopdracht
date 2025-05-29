import "./BackButton.css"
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button.jsx";

function BackButton({
                        className = "",
                        children = "Go Back",
                        variant = "primary",
                        size = "medium",
                        fullWidth = false,
                        disabled = false
                    }) {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <Button
            buttonType="button"
            className={className}
            variant={variant}
            size={size}
            fullWidth={fullWidth}
            disabled={disabled}
            onClick={goBack}
        >
            {children}
        </Button>
    );
}

export default BackButton;