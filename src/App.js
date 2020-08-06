/**
 * Highest level Parent Component
 */

import React from "react"
import Header from "./components/Header"
import MainArea from "./components/MainArea"
import Footer from "./components/Footer"

function App() {
    return (
        <div>
            <Header/>
            <MainArea/>
            <Footer/>
        </div>
    )
}

export default App