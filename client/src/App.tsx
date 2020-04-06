import React, { useState, useEffect, FC } from 'react';
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

interface Props{
  auth: boolean;
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const App:FC<Props> =  function App(props) {
  return (
      <Router>
        <Switch>
          <Route exact path = "/" >
            <Home></Home>
          </Route>
          <Route exact path ="/login">
            <Login></Login>
          </Route>
          <PrivateRoute
          path='/dashboard'
          redirect ="/"
          >
            <Dashboard></Dashboard>
          </PrivateRoute>
        </Switch>
      </Router>
  );
}

export default App;