import React from "react"
import logo from "./logo.png";

function Header() {
    return (
        <header className="navbar">
            <img src={logo}
                 alt="logo"
            />
            <p>IyengarYogaClassGenerator</p>
        </header>
    )
}

export default Header