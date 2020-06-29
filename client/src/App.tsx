import React, { lazy, Suspense, useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './routing/PrivateRoute'
import { withTranslation } from 'react-i18next';
import "croppie/croppie.css";
import LoadingScreen from './components/progress/LoadingScreen';
import { isPolicyAccepted } from './cache/cookies/cookieManager';
import SecurityPolicy from "./components/policy/SecuryPolicy"
const Home = lazy(() => import('./views/public/home/Home'))
const Login = lazy(()=>import('./views/public/login/Login'))
const Register = lazy(()=>import('./views/public/register/Register'))
const User = lazy(()=>import('./views/public/user/User'));
const Dashboard = lazy(()=>import('./views/user/dashboard/Dashboard')) 
const Info = lazy(()=>import('./views/public/policy/Policy')) 

axios.defaults.baseURL = process.env.REACT_APP_API_URL


function App() {
    const [dialog,setDialog] = useState(isPolicyAccepted())
    return (
        <React.Fragment>
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
                <Route path="/info">
                <Info/>
                </Route>
                <PrivateRoute path="/dashboard" redirect="/login">
                    <Dashboard />
                </PrivateRoute>
            </Switch>
            </Suspense>
        </Router>
        <SecurityPolicy {...{open:dialog,setOpen:setDialog}}/>
        </React.Fragment>
    )
}

export default withTranslation('common')(App);
