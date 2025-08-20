/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";
import { useTranslation } from "react-i18next";

import { ROUTES } from "../../../constants/routes";
import { ISettingsMenuItemModel, SettingsMenuItem } from "../SettingsMenuItem";

import "./SettingsMenu.scss";

export interface ISettingsScreenProps {}
export enum MenuKeys {
  PROFILE,
  MY_ORDERS,
  BILLING,
  TERMS_AND_CONDITIONS,
  HELP,
  EMPTY,
  LANGUAGE,
  LOGOUT,
}

export const SettingsMenu: React.FC<
  ISettingsScreenProps
> = ({}: ISettingsScreenProps) => {
  const { t } = useTranslation();
  const menuItems: ISettingsMenuItemModel[] = [
    {
      key: MenuKeys.MY_ORDERS,
      title: t("COMMON__MY_ORDERS", "My orders"),
      componentPath: ROUTES.SETTINGS_MY_ORDERS,
    },

    {
      key: MenuKeys.TERMS_AND_CONDITIONS,
      title: t("COMMON__TERMS_AND_CONDITIONS", "Terms & Conditions"),
      componentPath: ROUTES.SETTINGS_TERMS_AND_CONDITIONS,
    },
    // TODO: ADD HELP OR ABOUT LATER ON
    // {
    //   key: MenuKeys.HELP,
    //   title: t("COMMON__HELP", "Help"),
    //   componentPath: "settings/help",
    // },
    {
      key: MenuKeys.EMPTY,
      title: "empty",
      componentPath: "",
    },
    {
      key: MenuKeys.LANGUAGE,
      title: t("COMMON__LANGUAGE", "Language"),
      componentPath: ROUTES.SETTINGS_LANGUAGE,
    },
    {
      key: MenuKeys.LOGOUT,
      title: t("COMMON__LOGOUT", "Logout"),
      componentPath: ROUTES.SETTINGS_LOGOUT,
    },
  ];

  return (
    <div className="SettingsMenu__Container">
      <ul className="SettingsMenu">
        {menuItems.map((item: ISettingsMenuItemModel) => {
          if (item.title === "empty") {
            return <div className="empty" key="empty" />;
          }
          return <SettingsMenuItem item={item} key={item.key} />;
        })}
      </ul>
    </div>
  );
};
