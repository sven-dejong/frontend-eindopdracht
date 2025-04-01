import "./NotFound.css"
import Button from "../../components/ui/Button/Button.jsx";
import {NavLink} from "react-router-dom";
import React from "react";

function NotFound() {
    return (
        <>
            <section className="outer-content-container not-found-page">
                <div className="inner-content-container">
                    <h1>Oops...</h1>
                    <p>This page does not exist. Click the button below to go back to the homepage.</p>
                    <Button buttonType="button" className="primary">
                        <NavLink to="/">
                            Home
                        </NavLink>
                    </Button>
                </div>
            </section>
        </>
    )
}

export default NotFound