/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAppState } from "@xala/common";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import { AuthScreen } from "screens/AuthScreen";

import {
  SettingsMyOrders,
  SettingsTerms,
  useBreakpoints,
} from "../../components";

import "./SettingsScreen.scss";

export interface ISettingsScreenRouteProps {
  submenuKey: string;
}

export interface ISettingsScreenProps {}

const configurationSelector = (state: IAppState) =>
  state.configuration.configuration;

export const SettingsScreen = (props: ISettingsScreenProps) => {
  const configuration = useSelector(configurationSelector);
  const { submenuKey } = useParams<ISettingsScreenRouteProps>();
  const { isXS, isSM, isMD } = useBreakpoints();
  const isXSorSMorMD = isXS || isSM || isMD;

  const getSettingsView = () => {
    if (submenuKey === "terms_and_conditions") {
      return <SettingsTerms />;
    }

    if (submenuKey === "my_orders") {
      return <SettingsMyOrders {...props} />;
    }

    return <></>;
  };

  return (
    <AuthScreen configuration={configuration} visibility={7}>
      <section className="SettingsScreen">
        <div className="SettingsScreen__wrapper">
          {((isXSorSMorMD && submenuKey) || (!isXSorSMorMD && submenuKey)) && (
            <div className="view">{getSettingsView()}</div>
          )}
        </div>
      </section>
    </AuthScreen>
  );
};
