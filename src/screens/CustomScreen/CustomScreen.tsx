/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ConfigurationHelper, IAppState } from "@xala/common";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";

import { BaseScreen } from "../BaseScreen";

import "./CustomScreen.scss";

import { useSelector } from "react-redux";

export const CustomScreen = () => {
  const [screenKey, setScreenKey] = useState<string | undefined>(undefined);
  const match = useRouteMatch<{ id: string }>();
  const getConfiguration = useSelector(
    (state: IAppState) => state.configuration.configuration
  );

  useEffect(() => {
    const newScreenKey = match.params.id;

    if (screenKey !== newScreenKey) {
      setScreenKey(newScreenKey);
    }
  }, [match.params.id, screenKey]);

  if (!getConfiguration || !getConfiguration.Screens) {
    return null;
  }

  const screen = screenKey
    ? ConfigurationHelper.getScreenByRouteKey(getConfiguration, screenKey)
    : undefined;

  if (!screen || screen.ScreenTypeCode === undefined) {
    return null;
  }

  return (
    <BaseScreen>
      {({ renderScreen }) => (
        <div className="CustomScreen">
          <section>{renderScreen(screen)}</section>
        </div>
      )}
    </BaseScreen>
  );
};
