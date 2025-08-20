/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  IAppState,
  IPaymentModel,
  IPaymentSearchFilterModel,
  PaymentStore,
  TimeHelper,
} from "@xala/common";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { MediaButtonVariant } from "enums";

import { ITableColumnProps, MediaButton, Table } from "../..";

import { PaymentDetailsModal } from "./PaymentDetailsModal";
import "./SettingsBilling.scss";

export interface ISettingsBillingProps {}

export const SettingsBilling: React.FC<ISettingsBillingProps> = () => {
  const [payment, setPayment] = useState<IPaymentModel | undefined>();
  const dispatch = useDispatch();
  const payments = useSelector((state: IAppState) => state.payment.payments);
  const { t } = useTranslation();

  const searchPayments = useCallback(
    (filter: IPaymentSearchFilterModel) => {
      dispatch(
        PaymentStore.Actions.searchPayment({
          ...filter,
          PageSize: 10,
          IncludeCount: true,
        })
      );
    },
    [dispatch]
  );

  const columns: ITableColumnProps<IPaymentModel> = [
    {
      key: "PaymentKey",
      dataIndex: "PaymentKey",
      title: t("MODEL_PAYMENT_KEY"),
      width: 250,
      ellipsis: true,
    },
    {
      key: "TotalAmount",
      dataIndex: "TotalAmount",
      title: t("MODEL_PRICE"),
    },
    {
      key: "Currency",
      dataIndex: "Currency",
      title: t("MODEL_CURRENCY"),
    },
    {
      key: "Created",
      dataIndex: "Created",
      title: t("MODEL_DATE"),
      render: (_text: string, row) =>
        TimeHelper.format(row.Created, "YYYY-MM-DD"),
    },
    {
      key: "PaymentMethod",
      dataIndex: "PaymentMethod",
      title: t("MODEL_PAYMENT_METHOD"),
    },
    {
      key: "TypeDisplayName",
      dataIndex: "TypeDisplayName",
      title: t("MODEL_TYPE_NAME"),
    },
    {
      key: "StatusDisplayName",
      dataIndex: "StatusDisplayName",
      title: t("MODEL_PAYMENT_STATUS"),
    },
  ];

  useEffect(() => {
    searchPayments({
      PageNumber: 1,
    });
  }, []);

  return (
    <div className="SettingsBilling">
      <Table<IPaymentModel>
        rowKey="PaymentKey"
        columns={columns}
        data={payments.Entities}
        onRow={(row) => ({
          onClick: () => setPayment(row),
        })}
      />

      {payments?.Entities?.length < payments.TotalCount && (
        <div className="MediaCategoryList__more">
          <MediaButton
            variant={MediaButtonVariant.Transparent}
            loading={payments.IsLoading}
            onClick={() =>
              searchPayments({
                PageNumber: (payments.Filter?.PageNumber || 0) + 1,
              })
            }
          >
            {t("COMMON__BUTTON_MORE", "Show more")}
          </MediaButton>
        </div>
      )}

      <PaymentDetailsModal
        payment={payment}
        visible={!!payment}
        onCancel={() => setPayment(undefined)}
      />
    </div>
  );
};
