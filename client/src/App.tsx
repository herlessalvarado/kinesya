import React, { useState, useEffect } from 'react';
import Home from './views/Home';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './views/Login';
import PrivateRoute from './routing/PrivateRoute';
import Dashboard from './views/Dashboard';
import { LoginContext } from './context/loginContext';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

export default function App() {
  const [auth,setAuth] = useState(true);
  //falta que el context consumer se guarde en auth para poder usarlo
  return (
    <Router>
      <Switch>
        <Route exact path = "/">
          <Home></Home>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <PrivateRoute
    path='/dashboard'
    isAuthenticated={auth}
    component={Dashboard}
/>
      </Switch>
    </Router>
  );
}

