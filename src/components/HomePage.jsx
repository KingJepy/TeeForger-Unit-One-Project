import React from "react";
import homePageImage from "../assets/homePageImage.jpg";
import "./HomePage.css"

function HomePage () {
    return (
        <div className="homePage">
            <p>
                Welcome to the TeeForge! Where you can create your own custom Tee designs and we bring them to life.
            </p>
            <img src={homePageImage} alt="Shirt Rack" />
        </div>
    );
};

export default HomePage;