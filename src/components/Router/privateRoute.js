import React from "react";
import { Route, Redirect } from "react-router-dom";

function privateRoute({ component: Component, isAuth, ...rest }) {
  
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuth ? <Component {...rest} /> : <Redirect to="/" />
      }
    />
  );
}

export default privateRoute;
