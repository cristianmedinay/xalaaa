/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  IApplicationMenuScreenModel,
  IConfigurationModel,
  ScreenType,
} from "@xala/common";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router";

import { Breakpoints, SMUp, XS } from "components";
import { ISettingsScreenRouteProps } from "screens/SettingsScreen";

import { ApplicationHeader } from "../ApplicationHeader";
import { ApplicationMenu } from "../ApplicationMenu";
import { OverlayMenu } from "../OverlayMenu/OverlayMenu";

import "./AppHeader.scss";
import {
  HeaderBurgerMenu,
  HeaderLogo,
  HeaderMyList,
  HeaderUserInfo,
} from "./components";

export enum AppHeaderVisibility {
  Logo = 0,
  Menu = 1,
  Header = 2,
  UserInfo = 5,
  UserMyList = 6,
  Default = 7,
}

export interface IAppHeaderProps {
  configuration?: IConfigurationModel;
  visibility?: AppHeaderVisibility;
}

const showSearch = process.env.REACT_APP_SEARCH_NAVIGATION === "true";
const showMyList = process.env.REACT_APP_MY_LIST_NAVIGATION === "true";

export const AppHeader: React.FC<IAppHeaderProps> = ({
  configuration,
  visibility = AppHeaderVisibility.Default,
}: IAppHeaderProps) => {
  const [showOverlayMenu, setShowOverlayMenu] = useState(false);
  const { submenuKey } = useParams<ISettingsScreenRouteProps>();

  useEffect(() => {
    if (submenuKey) {
      setShowOverlayMenu(false);
    }
  }, [submenuKey]);

  const isTablet = useMediaQuery({
    minWidth: Breakpoints.XS,
    maxWidth: Breakpoints.MD,
  });

  const headerRef = useRef<HTMLDivElement>(null);

  const components = configuration?.Screens?.APPLICATION_HEADER?.Components;

  let applicationMenuScreenData: IApplicationMenuScreenModel | undefined =
    undefined;

  if (configuration && configuration.Screens) {
    const screen = configuration.Screens[ScreenType.ApplicationMenu];

    if (screen) {
      applicationMenuScreenData = screen as IApplicationMenuScreenModel;
    }
  }

  const menuItems = useMemo(
    () =>
      applicationMenuScreenData?.Components?.filter(
        (component) => component.IsVisible
      )
        .filter(
          (component) => component.Action?.ScreenTypeCode !== ScreenType.Search
        )
        .filter((component) =>
          component.Action?.ScreenTypeCode === ScreenType.MyList
            ? showMyList
            : true
        ),
    [applicationMenuScreenData?.Components]
  );

  const handleOpenMenu = useCallback((toggle: boolean) => {
    setShowOverlayMenu(toggle);
  }, []);

  return (
    <header className="AppHeader" ref={headerRef}>
      <div className="AppHeader__Left">
        {isTablet && <HeaderBurgerMenu openMenuHandler={handleOpenMenu} />}
        <OverlayMenu
          items={menuItems}
          isVisible={showOverlayMenu}
          openMenuHandler={handleOpenMenu}
          submenuKey={submenuKey}
        />
        <HeaderLogo />
        {!!(visibility & AppHeaderVisibility.Menu) && (
          <ApplicationMenu
            items={menuItems}
            showSearch={showSearch}
            headerRef={headerRef}
          />
        )}
      </div>
      <div className="AppHeader__Right">
        {!!(visibility & AppHeaderVisibility.Header) && (
          <ApplicationHeader items={components} />
        )}
        {!!(visibility & AppHeaderVisibility.UserMyList && showMyList) && (
          <HeaderMyList />
        )}
        {!!(visibility & AppHeaderVisibility.UserInfo) && (
          <SMUp>
            <HeaderUserInfo />
          </SMUp>
        )}
        <XS>
          <HeaderBurgerMenu openMenuHandler={handleOpenMenu} />
        </XS>
      </div>
    </header>
  );
};
