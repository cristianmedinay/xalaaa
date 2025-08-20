/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  ActionType,
  AuthStore,
  IApplicationMenuItemComponentModel,
  RouteHelper,
  useAnalyticsContext,
} from "@xala/common";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { MenuClickEventHandler, MenuItem } from "..";

import "./ApplicationMenuItem.scss";

import { ROUTES } from "../../constants";

export interface IApplicationMenuItemProps {
  component: IApplicationMenuItemComponentModel;
}

export const ApplicationMenuItem: React.FC<IApplicationMenuItemProps> = ({
  component,
  ...props
}: IApplicationMenuItemProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const title = t(component?.TitleTranslationKey || "", component?.Title);

  const { logout } = useAnalyticsContext();

  const onClick: MenuClickEventHandler = ({ key }) => {
    if (key === ROUTES.SETTINGS_LOGOUT) {
      logout();
      return dispatch(AuthStore.Actions.signOut());
    }

    if (component?.Action?.ActionType) {
      switch (component.Action.ActionType) {
        case ActionType.OpenScreen:
          if (key) {
            RouteHelper.goToPath(`/${key}`);
          }
          break;
        case ActionType.OpenUrl:
          if (component.Action.Url) {
            window.open(component.Action.Url, "_blank");
          }
          break;
      }
    }
  };

  return (
    <MenuItem {...props} onClick={onClick}>
      {title}
    </MenuItem>
  );
};
