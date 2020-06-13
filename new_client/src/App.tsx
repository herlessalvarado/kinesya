import React, { lazy, Suspense } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './routing/PrivateRoute'
import { withTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress'
const Home = lazy(() => import('./views/public/home/Home'))
const Login = lazy(()=>import('./views/public/login/Login'))
const Register = lazy(()=>import('./views/public/register/Register'))
const Dashboard = lazy(()=>import('./views/user/dashboard/Dashboard')) 

axios.defaults.baseURL = process.env.REACT_APP_API_URL
// axios.defaults.withCredentials = true

function App() {

    return (
        <Router>
            <Suspense fallback={<CircularProgress />}>
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
                <PrivateRoute path="/dashboard" redirect="/login">
                    <Dashboard />
                </PrivateRoute>
                {/* <Route path="/dashboard">
                    <Dashboard />
                </Route> */}
            </Switch>
            </Suspense>
        </Router>
    )
}

export default withTranslation('common')(App);
