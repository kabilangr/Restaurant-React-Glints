import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={
            (props) => {
                if(auth.isAuthentication()) {
                    if(rest.name === "login")
                        return (
                            <Redirect to={
                                {
                                    pathname: "/signup",
                                    state: {
                                        from: props.location
                                    }
                                }
                            } />
                        )
                    else
                        return (
                            <Component {...props}/>
                        )
                }
                else if(rest.name === "signup")
                    return (
                        <Redirect to={
                            {
                                pathname: "/signup",
                                state: {
                                    from: props.location
                                }
                            }
                        } />
                    )
                else
                    return (
                        <Redirect to={
                            {
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }
                        } />
                    )
            }
        } />
    )
}