import React, { lazy, Suspense } from "react"

import PrivateRoute from "./routing/PrivateRoute"
import "croppie/croppie.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
const Profile = lazy(() => import("./views/Profile"))
const Home = lazy(() => import("./views/Home"))
const Login = lazy(() => import("./views/Login"))
const Register = lazy(() => import("./views/Register"))
const UpdateProfile = lazy(() => import("./views/UpdateProfile"))

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
