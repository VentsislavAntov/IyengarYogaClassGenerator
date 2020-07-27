/**
 * Footer Component. Its parent is App.
 */

import React from "react"

const Footer = () => {
    return (
        <div className="main-footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm">
                        <h4>Contact Me</h4>
                        <ul className="list-unstyled">
                            <li>Phone: +44 7481474243</li>
                            <li>Email: ven.antov@gmail.com</li>
                            <li>Address: Glasgow, United Kingdom</li>
                        </ul>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col align-items-center">
                        <hr/>
                        &copy;{new Date().getFullYear()} Copyright as per Glasgow University Policies
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Footer;