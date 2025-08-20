/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { AuthorizationHelper, AuthStore, RouteHelper } from "@xala/common";
import cx from "classnames";
import React from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";

import "./SettingsMenuItem.scss";

import { MenuKeys } from "../SettingsMenu";

export interface ISettingsMenuItemModel {
  key: number;
  title: string;
  componentPath: string;
}

export interface ISettingsMenuItemProps {
  item: ISettingsMenuItemModel;
}

export const SettingsMenuItem: React.FC<ISettingsMenuItemProps> = ({
  item,
}: ISettingsMenuItemProps) => {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const isActive = `${item.componentPath}` === match.url;
  const onClick = async () => {
    const isAnonymous = await AuthorizationHelper.isAnonymous();
    if (item.key === MenuKeys.PROFILE && isAnonymous) {
      RouteHelper.goToLogin();
    } else if (item.key === MenuKeys.LOGOUT) {
      dispatch(AuthStore.Actions.signOut());
    } else {
      RouteHelper.goToPath(`/${item.componentPath}`);
    }
  };

  return (
    <li
      className={cx("SettingsMenuItem", {
        "SettingsMenuItem--active": isActive,
      })}
      onClick={onClick}
    >
      {item.title}
      {isActive && <div className="SettingsMenuItem--active__indicator" />}
    </li>
  );
};
