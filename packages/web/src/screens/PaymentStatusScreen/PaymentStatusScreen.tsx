/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAppState, PaymentStatus, usePaymentStatus } from "@xala/common";
import React from "react";
import { useSelector } from "react-redux";

import { AppFooter, AppHeader } from "../../components";
import { PaymentCancelScreen } from "../PaymentCancelScreen";
import { PaymentProcessingScreen } from "../PaymentProcessingScreen";
import { PaymentSuccessScreen } from "../PaymentSuccessScreen";

import "./PaymentStatusScreen.scss";

interface IScreenForPaymentStatusProps {
  paymentStatus?: PaymentStatus;
  validTo?: Date;
}

const ScreenForPaymentStatus = ({
  paymentStatus,
  validTo,
}: IScreenForPaymentStatusProps) => {
  switch (paymentStatus) {
    case PaymentStatus.Successed:
    case PaymentStatus.Completed:
      return <PaymentSuccessScreen />;
    case PaymentStatus.Cancelled:
    case PaymentStatus.Failed:
    case PaymentStatus.NotExists:
      return <PaymentCancelScreen />;
    case PaymentStatus.Processing:
    case PaymentStatus.Created:
    default:
      return <PaymentProcessingScreen paymentValidTo={validTo} />;
  }
};
export const PaymentStatusScreen = () => {
  const { paymentStatus, statusState } = usePaymentStatus();
  const configuration = useSelector(
    (state: IAppState) => state.configuration.configuration
  );

  return (
    <div className="PaymentStatus">
      <AppHeader configuration={configuration} />
      {statusState.processing ? null : (
        <section>
          <div className="PaymentStatus__content">
            <ScreenForPaymentStatus
              paymentStatus={paymentStatus}
              validTo={statusState.result?.validTo}
            />
          </div>
        </section>
      )}
      <AppFooter />
    </div>
  );
};
