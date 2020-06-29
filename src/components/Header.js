import React from "react"

function Header() {
    return (
        <header className="navbar">
            <img src={require("./images/Yoga_logo.png")}
                 alt="YogaImage"
                 
            />
            <p>IyengarYogaClassGenerator</p>
        </header>
    )
}

export default Header