import React, { lazy, Suspense } from "react"
import axios from "axios"
import PrivateRoute from "./routing/PrivateRoute"
import "croppie/croppie.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Profile from "./views/Profile"
const Home = lazy(() => import("./views/Home"))
const Login = lazy(() => import("./views/Login"))
const Register = lazy(() => import("./views/Register"))
const UpdateProfile = lazy(() => import("./views/UpdateProfile"))

axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.defaults.withCredentials = true

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
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
            </Suspense>
        </Router>
    )
}

export default App
