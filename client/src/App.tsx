import React, { lazy, Suspense } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './routing/PrivateRoute'
import { withTranslation } from 'react-i18next';
import "croppie/croppie.css";
import LoadingScreen from './components/progress/LoadingScreen';
const Home = lazy(() => import('./views/public/home/Home'))
const Login = lazy(()=>import('./views/public/login/Login'))
const Register = lazy(()=>import('./views/public/register/Register'))
const User = lazy(()=>import('./views/public/user/User'));
const Dashboard = lazy(()=>import('./views/user/dashboard/Dashboard')) 

axios.defaults.baseURL = process.env.REACT_APP_API_URL
// axios.defaults.withCredentials = true

function App() {

    return (
        <Router>
            <Suspense fallback={<LoadingScreen />}>
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
                    <User />
                </Route>
                <PrivateRoute path="/dashboard" redirect="/login">
                    <Dashboard />
                </PrivateRoute>
            </Switch>
            </Suspense>
        </Router>
    )
}

export default withTranslation('common')(App);
