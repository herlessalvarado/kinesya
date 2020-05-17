import React from "react"
import axios from "axios"
import PrivateRoute from "./routing/PrivateRoute"
import Home from "./views/Home"
import Login from "./views/Login"
import Register from "./views/Register"
import "croppie/croppie.css"

import UpdateProfile from "./views/UpdateProfile"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Profile from "./views/Profile"

axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.defaults.withCredentials = true

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/user/:username">
                    <Profile />
                </Route>

                <PrivateRoute path="/dashboard" redirect="/login">
                    {/* <Dashboard /> */}
                    <UpdateProfile />
                </PrivateRoute>
            </Switch>
        </Router>
    )
}

export default App
