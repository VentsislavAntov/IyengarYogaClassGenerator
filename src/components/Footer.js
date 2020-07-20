import React from "react"

const Footer = () => {
    return(
        <div className="main-footer">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>col/</h4>
                        <ul className="list-unstyled">
                            <li>Number</li>
                            <li>Location</li>
                            <li>Address</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>col2</h4>
                        <ul className="list-unstyled">
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>col3</h4>
                        <ul className="list-unstyled">
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                        </ul>
                    </div>
                </div>
<hr/>
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} Copyright as per Glasgow University Policies
                    </p>
                </div>

            </div>

        </div>)
}

export default Footer;