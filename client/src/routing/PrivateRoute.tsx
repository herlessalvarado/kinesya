import React from "react"
import { Redirect, Route, RouteProps } from "react-router-dom"
import { getJWT, getRefreshToken } from "../cache/CookieManager"

interface PrivateRoutes extends RouteProps {
    redirect: any
}

const PrivateRoute = ({ children, redirect, ...rest }: PrivateRoutes) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                getJWT() && getRefreshToken() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: redirect,
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    )
}

export default PrivateRoute
