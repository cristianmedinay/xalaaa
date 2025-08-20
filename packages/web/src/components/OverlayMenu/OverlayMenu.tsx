/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  AppConfig,
  ConfigurationHelper,
  IApplicationMenuItemComponentModel,
  RouteHelper,
  useIsLoggedIn,
} from "@xala/common";
import React, { useCallback } from "react";
import { engineVersion } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { useRouteMatch } from "react-router-dom";

import CloseIcon from "resources/icons/x.svg";

import { userApplicationMenuItems } from "../../constants";
import { ApplicationMenuItem } from "../ApplicationMenuItem";
import { Menu } from "../Menu";

import "./OverlayMenu.scss";

interface IOverlayMenuProps {
  items?: IApplicationMenuItemComponentModel[];
  openMenuHandler: (toggle: boolean) => void;
  isVisible: boolean;
  submenuKey?: string;
}

export const OverlayMenu = (props: IOverlayMenuProps) => {
  const { items, isVisible, openMenuHandler, submenuKey } = props;

  const isLoggedIn = useIsLoggedIn();
  const match = useRouteMatch();
  const { t } = useTranslation();

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

  if (!isVisible) {
    return null;
  }

  const selectedKey = submenuKey
    ? `${RouteHelper.getScreenRouteKey(match)}/${submenuKey}`
    : RouteHelper.getScreenRouteKey(match) || "";

  return (
    <div className="Overlay">
      <div className="Overlay_close" onClick={() => openMenuHandler(false)}>
        <CloseIcon />
      </div>

      <div className="Overlay_menu">
        <Menu
          mode="vertical"
          selectedKeys={[selectedKey]}
          triggerSubMenuAction="click"
        >
          {renderMenuItems(items!)}
        </Menu>

        <div className="Overlay_separator" />

        <Menu
          mode="vertical"
          selectedKeys={[selectedKey]}
          triggerSubMenuAction="click"
        >
          {renderMenuItems(userApplicationMenuItems(t, isLoggedIn))}
        </Menu>
      </div>

      <div className="Overlay_informations">
        <span>{`App: ${AppConfig.PlatformVersion} | Firmware: ${engineVersion}`}</span>
      </div>
    </div>
  );
};
