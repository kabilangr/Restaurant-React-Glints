import "./style.css";

import React from "react";
import { Link } from "react-router-dom"

const Navigation = () => {

    return(
        <nav>
            <h3>logo</h3>
            <ul className="nav-links-list">
                <Link className="nav-link" to="/">
                <li>Home</li>
                </Link>
                <Link className="nav-link" to="/collection">
                <li>Collection</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Navigation;