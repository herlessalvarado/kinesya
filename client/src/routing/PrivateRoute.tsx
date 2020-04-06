import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {checkAuth} from '../cache/CookieManager'
const PrivateRoute = ({ children,  redirect, ...rest }:any) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
        checkAuth() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: redirect,
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

export default PrivateRoute;