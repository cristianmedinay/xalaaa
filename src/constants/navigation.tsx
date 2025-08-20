/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  ActionType,
  ComponentType,
  IApplicationMenuItemComponentModel,
  ScreenType,
} from "@xala/common";
import { TFunction } from "i18next";

import { ROUTES } from "./routes";

export const ARROW_DOWN = "ArrowDown";
export const ARROW_UP = "ArrowUp";
export const ARROW_LEFT = "ArrowLeft";
export const ARROW_RIGHT = "ArrowRight";
export const HORIZONTAL = "HORIZONTAL";
export const VERTICAL = "VERTICAL";
export const ENTER_UP = "EnterUp";

const showMyList = import.meta.env.VITE_MY_LIST_NAVIGATION === "true";
const showMyOrders = import.meta.env.VITE_MY_ORDERS_NAVIGATION === "true";

export const userApplicationMenuItems = (
  t: TFunction,
  isLoggedIn: boolean
): IApplicationMenuItemComponentModel[] => {
  const elements: IApplicationMenuItemComponentModel[] = isLoggedIn
    ? [
        {
          Action: {
            ActionType: ActionType.OpenScreen,
            ScreenName: ROUTES.PROFILE,
            ScreenTypeCode: ScreenType.Custom,
          },
          Title: t("COMMON__PROFILE", "Profile"),
          ComponentTypeCode: ComponentType.ApplicationMenuItem,
        },
        {
          Action: {
            ActionType: ActionType.OpenScreen,
            ScreenName: ROUTES.MY_LIST,
            ScreenTypeCode: ScreenType.Custom,
          },
          Title: t("COMMON__MY_LIST", "My favourites"),
          ComponentTypeCode: ComponentType.ApplicationMenuItem,
        },
        {
          Action: {
            ActionType: ActionType.OpenScreen,
            ScreenName: ROUTES.SETTINGS_MY_ORDERS,
            ScreenTypeCode: ScreenType.Custom,
          },
          Title: t("COMMON__MY_ORDERS", "My orders"),
          ComponentTypeCode: ComponentType.ApplicationMenuItem,
        },
        {
          Action: {
            ActionType: ActionType.OpenScreen,
            ScreenName: ROUTES.SETTINGS_TERMS_AND_CONDITIONS,
            ScreenTypeCode: ScreenType.Custom,
          },
          Title: t("COMMON__TERMS_AND_CONDITIONS", "Terms & Conditions"),
          ComponentTypeCode: ComponentType.ApplicationMenuItem,
        },
        {
          Action: {
            ActionType: ActionType.OpenScreen,
            ScreenName: ROUTES.SETTINGS_LOGOUT,
            ScreenTypeCode: ScreenType.Custom,
          },
          Title: t("COMMON__LOGOUT", "Logout"),
          ComponentTypeCode: ComponentType.ApplicationMenuItem,
        },
      ]
    : [
        {
          Action: {
            ActionType: ActionType.OpenScreen,
            ScreenTypeCode: ScreenType.Login,
          },
          Title: t("LOGIN_LABEL", "Login"),
          ComponentTypeCode: ComponentType.ApplicationMenuItem,
        },
      ];

  return elements.filter((item) => {
    const disableMyList =
      !showMyList && item.Action?.ScreenName === ROUTES.MY_LIST;

    const disableMyOrders =
      !showMyOrders && item.Action?.ScreenName === ROUTES.SETTINGS_MY_ORDERS;

    return !(disableMyList || disableMyOrders);
  });
};

export const userSelectApplicationMenuItems = (
  t: TFunction
): IApplicationMenuItemComponentModel[] => {
  const elements: IApplicationMenuItemComponentModel[] = [
    {
      Action: {
        ActionType: ActionType.OpenScreen,
        ScreenName: ROUTES.PROFILE,
        ScreenTypeCode: ScreenType.Custom,
      },
      Title: t("COMMON__PROFILE", "Profile"),
      ComponentTypeCode: ComponentType.ApplicationMenuItem,
    },
    {
      Action: {
        ActionType: ActionType.OpenScreen,
        ScreenName: ROUTES.SETTINGS_MY_ORDERS,
        ScreenTypeCode: ScreenType.Custom,
      },
      Title: t("COMMON__MY_ORDERS", "My orders"),
      ComponentTypeCode: ComponentType.ApplicationMenuItem,
    },
    {
      Action: {
        ActionType: ActionType.OpenScreen,
        ScreenName: ROUTES.SETTINGS_TERMS_AND_CONDITIONS,
        ScreenTypeCode: ScreenType.Custom,
      },
      Title: t("COMMON__TERMS_AND_CONDITIONS", "Terms & Conditions"),
      ComponentTypeCode: ComponentType.ApplicationMenuItem,
    },
    {
      Action: {
        ActionType: ActionType.OpenScreen,
        ScreenName: ROUTES.SETTINGS_LOGOUT,
        ScreenTypeCode: ScreenType.Custom,
      },
      Title: t("COMMON__LOGOUT", "Logout"),
      ComponentTypeCode: ComponentType.ApplicationMenuItem,
    },
  ];

  return elements.filter((item) => {
    const disableMyOrders =
      !showMyOrders && item.Action?.ScreenName === ROUTES.SETTINGS_MY_ORDERS;

    return !disableMyOrders;
  });
};
