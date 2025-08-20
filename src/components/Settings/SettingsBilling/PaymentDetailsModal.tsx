/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IPaymentModel, RouteHelper, TimeHelper } from "@xala/common";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Dialog, IDialogProps } from "../..";

import "./PaymentDetailsModal.scss";

export interface IPaymentDetailsModalProps extends IDialogProps {
  payment?: IPaymentModel;
}

export const PaymentDetailsModal: React.FC<IPaymentDetailsModalProps> = ({
  payment,
  ...props
}) => {
  const { t } = useTranslation();

  const fields = [
    {
      label: t("MODEL_PAYMENT_KEY"),
      value: payment?.PaymentKey,
    },
    {
      label: t("MODEL_GUID"),
      value: payment?.Guid,
    },
    {
      label: t("MODEL_DESCRIPTION"),
      value: payment?.Description,
    },
    {
      label: t("MODEL_PRICE"),
      value: payment?.TotalAmount,
    },
    {
      label: t("MODEL_CURRENCY"),
      value: payment?.Currency,
    },
    {
      label: t("MODEL_DATE"),
      value:
        payment?.Created && TimeHelper.format(payment.Created, "YYYY-MM-DD"),
    },
    {
      label: t("MODEL_TYPE_NAME"),
      value: payment?.TypeDisplayName,
    },
    {
      label: t("MODEL_PAYMENT_METHOD"),
      value: payment?.PaymentMethod,
    },
    {
      label: t("MODEL_PAYMENT_STATUS"),
      value: payment?.StatusCode,
    },
    {
      label: t("MODEL_METADATA_LINK"),
      value: payment?.AssetPayment?.AssetId && (
        <Link
          to={RouteHelper.getDetailsPath({
            Id: payment?.AssetPayment?.AssetId,
            MediaTypeCode: payment?.AssetPayment?.AssetTypeCode,
          })}
        >
          {t("LINK")}
        </Link>
      ),
    },
  ];

  return (
    <Dialog
      className="PaymentDetailsModal"
      destroyOnClose={true}
      footer={null}
      {...props}
    >
      {fields.map((field, index: number) => {
        if (!field.value) {
          return null;
        }

        return (
          <div key={index} className="PaymentDetailsModal__field">
            <div className="PaymentDetailsModal__label">{field.label}:</div>
            <div>{field.value}</div>
          </div>
        );
      })}
    </Dialog>
  );
};
