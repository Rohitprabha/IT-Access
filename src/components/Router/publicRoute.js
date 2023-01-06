import React from "react";
import { Route, Redirect } from "react-router-dom";

function publicRoute({ component: Component, isAuth, restricted, ...rest }) {
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuth && restricted ? (
          <Redirect to="/itaccess" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default publicRoute;
