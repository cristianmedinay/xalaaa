/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  isRental,
  isSubscription,
  IUserPurchasesModel,
  RentalsModel,
  RouteHelper,
  SubscriptionsModel,
  useCancelSubscription,
  useChangeSubscriptionPaymentMethod,
  useReactivateSubscription,
  useUserPurchaseSelector,
} from "@xala/common";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { ConfirmDialog } from "../../../Dialog";
import { Message } from "../../../Message";

import "./ActionButtons.scss";

const SubscriptionButtons = (subscription: SubscriptionsModel) => {
  const { t } = useTranslation();
  const [changePaymentModal, setChangePaymentModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [reactivateModal, setReactivateModal] = useState(false);

  const purchase = useUserPurchaseSelector(subscription.SubscriptionId);

  const changeSubscriptionPaymentMethod = useChangeSubscriptionPaymentMethod();
  const cancelSubscription = useCancelSubscription({
    onSuccess: () => {
      Message.success(t("MY_ORDERS__CANCEL_SUCCESS"));
      setCancelModal(false);
    },
    onFailure: () => Message.error(t("MY_ORDERS__CANCEL_FAILURE")),
  });
  const reactivateSubscription = useReactivateSubscription({
    onSuccess: () => {
      Message.success(t("MY_ORDERS__REACTIVATE_SUCCESS"));
      setReactivateModal(false);
    },
    onFailure: () => Message.error(t("MY_ORDERS__REACTIVATE_FAILURE")),
  });

  return (
    <div className="ActionButtons">
      {subscription.CanCancel && (
        <ConfirmDialog
          visible={cancelModal}
          loading={purchase?.IsProcessing}
          onConfirm={() => {
            subscription.SubscriptionId &&
              cancelSubscription(subscription.SubscriptionId);
          }}
          confirmMessage={t("MY_ORDERS__CONFIRM_CANCEL")}
          onClose={() => setCancelModal(false)}
        >
          <button
            className="ActionButtons__Button-secondary"
            type="button"
            onClick={() => setCancelModal(true)}
          >
            {t("MY_ORDERS__BUTTON_CANCEL")}
          </button>
        </ConfirmDialog>
      )}
      {subscription.CanChangePaymentMethod && (
        <ConfirmDialog
          visible={changePaymentModal}
          loading={purchase?.IsProcessing}
          confirmMessage={t("MY_ORDERS__CONFIRM_PAYMENT_CHANGE")}
          onConfirm={() => {
            subscription.SubscriptionId &&
              changeSubscriptionPaymentMethod(
                subscription.SubscriptionId,
                subscription.PaymentProvider
              );
          }}
          onClose={() => setChangePaymentModal(false)}
        >
          <button
            className="ActionButtons__Button"
            type="button"
            onClick={() => setChangePaymentModal(true)}
          >
            {t("MY_ORDERS__BUTTON_CHANGE_CARD")}
          </button>
        </ConfirmDialog>
      )}
      {subscription.CanReactivate && (
        <ConfirmDialog
          visible={reactivateModal}
          loading={purchase?.IsProcessing}
          confirmMessage={t("MY_ORDERS__REACTIVATE")}
          onConfirm={() => {
            subscription.SubscriptionId &&
              reactivateSubscription(subscription.SubscriptionId);
          }}
          onClose={() => setReactivateModal(false)}
        >
          <button
            className="ActionButtons__Button"
            type="button"
            onClick={() => setReactivateModal(true)}
          >
            {t("MY_ORDERS__BUTTON_REACTIVATE")}
          </button>
        </ConfirmDialog>
      )}
    </div>
  );
};

type RentalButtonsProps = {
  purchase: RentalsModel;
};

export const RentalButtons = ({ purchase }: RentalButtonsProps) => {
  const { t } = useTranslation();
  return (
    <div className="ActionButtons">
      {purchase.CanBuyAgain && (
        <button
          className="ActionButtons__Button"
          type="button"
          onClick={() =>
            RouteHelper.goToDetails({
              Id: purchase.MediaId,
              MediaTypeCode: purchase.MediaType,
            })
          }
        >
          {t("MY_ORDERS__BUTTON_BUY_AGAIN")}
        </button>
      )}
    </div>
  );
};

export interface IActionButtonsProps {
  purchase: IUserPurchasesModel;
}

export const ActionButtons = ({ purchase }: IActionButtonsProps) => {
  if (isSubscription(purchase)) {
    return <SubscriptionButtons {...purchase} />;
  } else if (isRental(purchase)) {
    return <RentalButtons purchase={purchase} />;
  }
  return <></>;
};
