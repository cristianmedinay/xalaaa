/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  ConfigurationHelper,
  IApplicationMenuItemComponentModel,
  RouteHelper,
  useIsLoggedIn,
} from "@xala/common";
import React, { useCallback, useEffect, useRef, useState } from "react";

import UserIcon from "resources/icons/user.svg";

import "../../../ApplicationMenuItem/ApplicationMenuItem.scss";

import { useTranslation } from "react-i18next";

import { Menu } from "../../../Menu";
import { userSelectApplicationMenuItems } from "../../../../constants";

import { useRouteMatch } from "react-router-dom";

import { ApplicationMenuItem } from "../../../ApplicationMenuItem";

import "./HeaderUserInfo.scss";

export const HeaderUserInfo = () => {
  const isLoggedIn = useIsLoggedIn();
  const { t } = useTranslation();
  const [showList, setShowList] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const match = useRouteMatch();

  const showUserNavigationList = useCallback(() => {
    if (isLoggedIn) {
      setShowList(!showList);
    } else {
      RouteHelper.goToLogin();
    }
  }, [isLoggedIn, showList]);

  useEffect(() => {
    const onOutsideClick = (event: MouseEvent) => {
      if (ref.current && ref.current?.contains(event.target as Node)) {
        return;
      }

      if (showList) {
        setShowList(false);
      }
    };
    document.addEventListener("mousedown", onOutsideClick);

    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, [showList]);

  const renderMenuItems = useCallback(
    (menuItems: IApplicationMenuItemComponentModel[]) => {
      return menuItems?.map((component) => {
        const screenKey =
          ConfigurationHelper.getApplicationMenuItemScreenKey(component);
        return <ApplicationMenuItem key={screenKey} component={component} />;
      });
    },
    []
  );

  return (
    <div className="dd-container" ref={ref}>
      <div
        className="dd-wrapper ApplicationMenuItem"
        onClick={showUserNavigationList}
      >
        <div className="dd-header">
          <div className="circular">
            <UserIcon />
          </div>
        </div>
      </div>
      {showList && (
        <div className="dd-select">
          <Menu
            mode="vertical"
            selectedKeys={[RouteHelper.getScreenRouteKey(match) || ""]}
            triggerSubMenuAction="click"
          >
            {renderMenuItems(userSelectApplicationMenuItems(t))}
          </Menu>
        </div>
      )}
    </div>
  );
};
