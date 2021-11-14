import "./style.css"
import React, { useState } from "react"
import { Link } from "react-router-dom"

import auth from "../../utils/auth"

const Login = (props) => {

    const [credential, setCredential] = useState({
        login: "",
        password: "",
    })
    const loginSubmit =(e) => {
        
        const url = "https://thawing-ravine-84836.herokuapp.com/login"
        fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    "login": credential.login,
                    "password": credential.password
                })
            })
            .then((res) => res.json())
            .then(response => {
                if(response.code === 200) {
                    auth.login(() => {
                        const myStorage = window.sessionStorage;
                        myStorage.setItem("usernameResta",response.userName)
                        myStorage.setItem("userIdResta",response.id)
                        myStorage.setItem("LoggedInResta",response.successfull)
                        const l1 = myStorage.getItem("usernameResta")
                        const l2 =myStorage.getItem("userIdResta")
                        const l3 =myStorage.getItem("LoggedInResta")
                        console.log(l1,l2,l3)
                        props.history.push("/home")
                    })
                }
                else if(response.code === 404) {
                    alert("Incorrect Email or Password")
                }
                else 
                    alert("Error")
                // userName: rows[0].user_name,
                // id: rows[0].iduserLogin,
                // successfull: true
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
                            Email<br/>
                            <input type="email" name="login" placeholder="Eg. kabilan@gmail.com" value={credential.login} onChange={handlechange} />
                        </label>
                        <br/>
                        <label>
                            Password<br/>
                            <input type="text" name="password" placeholder="password" value={credential.password} onChange={handlechange}/>
                        </label>
                        <br/>
                        <button onClick={loginSubmit}>Login</button>
                    </form>
                    <Link className="signup-btn" to="/signup">
                        <p>Signup</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;