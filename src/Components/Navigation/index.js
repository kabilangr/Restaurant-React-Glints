import "./style.css"

import React from "react"
import { Link } from "react-router-dom"

import auth from "../../utils/auth"

const Navigation = (props) => {

    const logoutBtn = () => {
        auth.logout(() => {
            const myStorage = window.sessionStorage;
            myStorage.removeItem("username")
            myStorage.removeItem("userId")
            myStorage.removeItem("LoggedIn")
            props.history.push("/login");
        })
    }
    return(
        <nav>
            <h3>R-T</h3>
            <ul className="nav-links-list">
                <Link className="nav-link" to="/home">
                <li>Home</li>
                </Link>
                <Link className="nav-link" to="/collection">
                <li>Collection</li>
                </Link>
                <li className="logout-btn" onClick={logoutBtn}>Logout</li>
            </ul>
        </nav>
    )
}

export default Navigation;