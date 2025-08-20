/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAppState, UrlHelper } from "@xala/common";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import { AppFooter, AppHeader } from "../../components";

import { PaymentChangeCancelStatusScreen } from "./PaymentChangeCancelStatusScreen";
import "./PaymentChangeStatusScreen.scss";
import { PaymentChangeSuccessStatusScreen } from "./PaymentChangeSuccessStatusScreen";

export type PaymentChangeStatusScreenRouteParams = {
  paymentKey: string;
  paymentStatus: string;
};

export const PaymentChangeStatusScreen: React.FC = () => {
  const location = useLocation();
  const configuration = useSelector(
    (state: IAppState) => state.configuration.configuration
  );
  const { paymentStatus } = UrlHelper.parse(
    location.search
  ) as PaymentChangeStatusScreenRouteParams;

  return (
    <div className="PaymentChangeStatus">
      <AppHeader configuration={configuration} />
      <section>
        <div className="PaymentChangeStatus__content">
          {paymentStatus === "CANCELLED" ? (
            <PaymentChangeCancelStatusScreen />
          ) : (
            <PaymentChangeSuccessStatusScreen />
          )}
        </div>
      </section>
      <AppFooter />
    </div>
  );
};
