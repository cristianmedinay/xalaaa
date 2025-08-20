/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  ConfigurationHelper,
  IApplicationMenuItemComponentModel,
  RouteHelper,
} from "@xala/common";
import React from "react";
import { useRouteMatch } from "react-router-dom";

import { GlobalSearch, Menu } from "..";
import { ApplicationMenuItem } from "../ApplicationMenuItem";

import "./ApplicationMenu.scss";

export interface IApplicationMenuProps {
  items?: IApplicationMenuItemComponentModel[];
  showSearch: boolean;
  headerRef: React.RefObject<HTMLDivElement>;
}

export const ApplicationMenu: React.FC<IApplicationMenuProps> = (
  props: IApplicationMenuProps
) => {
  const { items, showSearch, headerRef } = props;

  const match = useRouteMatch();

  if (!items) {
    return null;
  }

  return (
    <div className="ApplicationMenu">
      <Menu
        mode="horizontal"
        selectedKeys={[RouteHelper.getScreenRouteKey(match) || ""]}
        triggerSubMenuAction="click"
      >
        {items.map((component) => {
          const screenKey =
            ConfigurationHelper.getApplicationMenuItemScreenKey(component);
          return <ApplicationMenuItem key={screenKey} component={component} />;
        })}
      </Menu>

      {showSearch && <GlobalSearch headerRef={headerRef} />}
    </div>
  );
};
