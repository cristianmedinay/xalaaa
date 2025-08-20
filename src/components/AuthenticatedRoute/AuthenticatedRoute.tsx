/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ROUTES, useIsLoggedIn } from "@xala/common";
import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

export const AuthenticatedRoute: React.FC<RouteProps> = (props) => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <Route {...props}>
      {!isLoggedIn && (
        <Redirect
          to={{
            pathname: ROUTES.HOME,
          }}
        />
      )}
    </Route>
  );
};
