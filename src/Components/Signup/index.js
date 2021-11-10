import "./style.css"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import auth from "../../utils/auth"

const Signup = (props) => {

    const [credential, setCredential] = useState({
        login: "",
        name: "",
        password: "",
    })
    const signUpSubmit =(e) => {

        const url = "https://thawing-ravine-84836.herokuapp.com/signup"
        fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "email": credential.login,
                "userName": credential.name,
                "password": credential.password,
            })
        })
        .then((res) => res.json())
        .then(response => {
            if(response.code === 200) {
                auth.login(() => {
                    const myStorage = window.sessionStorage;
                    myStorage.setItem("username",response.userName)
                    myStorage.setItem("userId",response.id)
                    myStorage.setItem("LoggedIn",response.successfull)
                    props.history.push("/home")
                })
            }
            else if(response.code === 404) {
                alert("Incorrect Email or Password")
            }
            else 
                alert("Error")
        })
        e.preventDefault()
    }

    const handlechange = (event) => {
        const target = event.target
        let data = {
            ...credential,
            [target.name]: target.value
        }
        setCredential(data)
    }

    return(
        <div className="login-page">
            <div className="login-container">
                <h1 className="title-login">R-T</h1>
                <div className="signin-container">
                    <form className="form-container">
                        <label>
                            Name<br/>
                            <input type="text" name="name" placeholder="name" value={credential.name} onChange={handlechange} />
                        </label>
                        <br/>
                        <label>
                            Email<br/>
                            <input type="text" name="login" placeholder="Eg. kabilan@gmail.com" value={credential.login} onChange={handlechange} />
                        </label>
                        <br/>
                        <label>
                            Password<br/>
                            <input type="text" name="password" placeholder="password" value={credential.password} onChange={handlechange}/>
                        </label>
                        <br/>
                        <button onClick={signUpSubmit}>Signup</button>
                    </form>
                    <Link className="signup-btn1" to="/login">
                        <p>Login</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Signup;