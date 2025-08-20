/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  BasePurchaseModel,
  isRental,
  isSubscription,
  RentalsModel,
  SubscriptionsModel,
  TimeHelper,
} from "@xala/common";
import React, { useState } from "react";

import { ITableRowProps } from "./types";
import "./ExpandedDetails.scss";
import { ActionButtons } from "./ActionButtons";

import { useTranslation } from "react-i18next";

type SubscriptionDetailsProps = {
  purchase: SubscriptionsModel;
};

const SubscriptionDetails = ({ purchase }: SubscriptionDetailsProps) => {
  const { t } = useTranslation();

  return (
    <div className="Section">
      <div className="Section__Title">{t("MY_ORDERS__SECTION_DETAILS")}</div>
      <hr className="Section__HorizontalLine" />
      <div className="Section__HeadersRow">
        <div>{t("MY_ORDERS__LABEL_AVAILABLE_FROM")}</div>
        <div>{t("MY_ORDERS__LABEL_AVAILABLE_UNTIL")}</div>
        <div>{t("MY_ORDERS__LABEL_MEDIA_TYPE")}</div>
        <div />
      </div>
      <div className="Section__DetailsRow">
        <div>{TimeHelper.format(purchase.ValidFrom, "DD-MM-YYYY")}</div>
        <div>{TimeHelper.format(purchase.ValidTo, "DD-MM-YYYY")}</div>
        <div>{purchase.MediaType}</div>
        <div />
      </div>
    </div>
  );
};

type DefaultDetailsProps = {
  purchase: BasePurchaseModel | RentalsModel;
};

const DefaultDetails = ({ purchase }: DefaultDetailsProps) => {
  const { t } = useTranslation();
  return (
    <div className="Section">
      <div className="Section__Title">{t("MY_ORDERS__SECTION_DETAILS")}</div>
      <hr className="Section__HorizontalLine" />
      <div className="Section__HeadersRow">
        <div>{t("MY_ORDERS__LABEL_AVAILABLE_FROM")}</div>
        <div>{t("MY_ORDERS__LABEL_MEDIA_TYPE")}</div>
        <div>{t("MY_ORDERS__LABEL_PRICE")}</div>
        <div>{t("MY_ORDERS__LABEL_STATUS")}</div>
      </div>
      <div className="Section__DetailsRow">
        <div>
          {TimeHelper.format(
            isRental(purchase) ? purchase.PaymentDate : purchase.PaymentDate,
            "DD-MM-YYYY"
          )}
        </div>
        <div>{purchase.MediaType}</div>
        <div>{purchase.Amount}</div>
        <div>{purchase.Status}</div>
      </div>
      <div className="Section__HeadersRow">
        <div>{isRental(purchase) && "Available until:"}</div>
        <div>{t("MY_ORDERS__LABEL_PAYMENT_ID")}</div>
        <div>{t("MY_ORDERS__LABEL_CURRENCY")}</div>
        <div>{t("MY_ORDERS__LABEL_PAYMENT_PROVIDER")}</div>
      </div>
      <div className="Section__DetailsRow">
        <div>
          {isRental(purchase) &&
            TimeHelper.format(purchase.ValidTo, "DD-MM-YYYY")}
        </div>
        <div>{purchase.Guid}</div>
        <div>{purchase.Currency}</div>
        <div>{purchase.PaymentProvider}</div>
      </div>
    </div>
  );
};

type BillingsSectionProps = {
  purchase: SubscriptionsModel;
};

const BillingsSection = ({ purchase }: BillingsSectionProps) => {
  const { t } = useTranslation();
  const COLLAPSED_ITEMS_COUNT = 4;
  const allPaymentsCount = purchase.Payments.length;
  const [isExpanded, setIsExpanded] = useState(
    allPaymentsCount <= COLLAPSED_ITEMS_COUNT
  );

  const visibleEntries = isExpanded
    ? allPaymentsCount
    : Math.min(allPaymentsCount, COLLAPSED_ITEMS_COUNT);

  const PaymentsEntries = purchase.Payments.slice(0, visibleEntries).map(
    (payment) => {
      return (
        <div key={payment.Guid} className="Section__DetailsRow">
          <div>{payment.Guid}</div>
          <div>{payment.Amount}</div>
          <div>{purchase.Currency}</div>
          <div>{TimeHelper.format(payment.PaymentDate, "DD-MM-YYYY")}</div>
          <div>{payment.Status}</div>
          <div>{purchase.PaymentProvider}</div>
        </div>
      );
    }
  );

  const SeeAllButton = () => {
    const { t } = useTranslation();
    return (
      <div
        className="Section__BillingsExpandButton"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {isExpanded
          ? t("MY_ORDERS__BUTTON_SHOW_LESS")
          : t("MY_ORDERS__BUTTON_SEE_ALL")}
      </div>
    );
  };

  return (
    <div className="Section">
      <div className="Section__Title">{t("MY_ORDERS__SECTION_BILLINGS")}</div>
      <hr className="Section__HorizontalLine" />
      <div className="Section__HeadersRow">
        <div>{t("MY_ORDERS__LABEL_PAYMENT_ID")}</div>
        <div>{t("MY_ORDERS__LABEL_PRICE")}</div>
        <div>{t("MY_ORDERS__LABEL_CURRENCY")}</div>
        <div>{t("MY_ORDERS__LABEL_DATE")}</div>
        <div>{t("MY_ORDERS__LABEL_STATUS")}</div>
        <div>{t("MY_ORDERS__LABEL_PAYMENT_PROVIDER")}</div>
      </div>
      {PaymentsEntries}
      {allPaymentsCount > COLLAPSED_ITEMS_COUNT && <SeeAllButton />}
    </div>
  );
};

export const ExpandedDetails = ({ purchase }: ITableRowProps) => {
  return (
    <div className="ExpandedDetails">
      <div>
        {isSubscription(purchase) ? (
          <SubscriptionDetails purchase={purchase} />
        ) : (
          <DefaultDetails purchase={purchase} />
        )}

        {isSubscription(purchase) && Boolean(purchase.Payments.length) && (
          <BillingsSection purchase={purchase} />
        )}

        <ActionButtons purchase={purchase} />
      </div>
    </div>
  );
};
