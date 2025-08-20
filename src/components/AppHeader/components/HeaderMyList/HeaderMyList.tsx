/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { RouteHelper, useIsLoggedIn } from "@xala/common";
import React, { useCallback } from "react";

import MyListIcon from "resources/icons/not-added.svg";

import "../../../ApplicationMenuItem/ApplicationMenuItem.scss";

import "./HeaderMyList.scss";

export const HeaderMyList = () => {
  const isLoggedIn = useIsLoggedIn();

  const handleRedirectMyList = useCallback(() => {
    if (isLoggedIn) {
      RouteHelper.goToMyList();
    } else {
      RouteHelper.goToLogin();
    }
  }, [isLoggedIn]);

  return (
    <div
      className="dd-wrapper ApplicationMenuItem HeaderMyList"
      onClick={handleRedirectMyList}
    >
      <div className="dd-header">
        <div className="circular">
          <MyListIcon />
        </div>
      </div>
    </div>
  );
};
