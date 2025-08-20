/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  isSubscription,
  IUserPurchasesModel,
  TimeHelper,
  useGetUserPurchasesAggregated,
  useSearchMedia,
  useUserPurchasesSelector,
} from "@xala/common";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { StatusTabs, TableRow } from "../..";

import "./SettingsMyOrders.scss";
import "./components/TableRow.scss";
import { StatusFilter } from "./components/types";

const HeadersRow = () => {
  const { t } = useTranslation();
  return (
    <div className="TableRow TableRow__BasicInfoContainer">
      <div className="TableRow__Column"></div>
      <div className="TableRow__Column"></div>
      <div className="TableRow__Column">{t("MY_ORDERS__COLUMN_TITLE")}</div>
      <div className="TableRow__Column">{t("MY_ORDERS__COLUMN_DATE")}</div>
      <div className="TableRow__Column">
        {t("MY_ORDERS__COLUMN_PAYMENT_TYPE")}
      </div>
      <div className="TableRow__Column">{t("MY_ORDERS__COLUMN_STATUS")}</div>
    </div>
  );
};

export const SettingsMyOrders = () => {
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState(StatusFilter.All);

  const userAssetPurchases = useUserPurchasesSelector();
  const getUserPurchasesAggregated = useGetUserPurchasesAggregated();
  const searchMedia = useSearchMedia();

  const loadData = () => {
    getUserPurchasesAggregated();
  };

  useEffect(() => {
    loadData();
  }, []);

  const sortedPurchases = useMemo<IUserPurchasesModel[]>(() => {
    const { IsProcessing, Data } = userAssetPurchases;
    if (!IsProcessing && Data) {
      return [
        ...Data.OneTimePurchases,
        ...Data.Rentals,
        ...Data.Subscriptions,
      ].sort((a, b) => {
        const getTimestamp = (payment: IUserPurchasesModel) =>
          TimeHelper.getTimestamp(
            isSubscription(payment) ? payment.ValidFrom : payment.PaymentDate
          );

        return getTimestamp(b) - getTimestamp(a);
      });
    }
    return [];
  }, [userAssetPurchases]);

  const TableRows = useMemo(() => {
    const filterActiveStatus = (item: IUserPurchasesModel): boolean => {
      switch (selectedFilter) {
        case StatusFilter.Active:
          return item.Active;
        case StatusFilter.Inactive:
          return !item.Active;
        default:
          return true;
      }
    };

    return sortedPurchases
      .filter(filterActiveStatus)
      .map((purchase: IUserPurchasesModel) => {
        return <TableRow key={purchase.Guid} purchase={purchase} />;
      });
  }, [sortedPurchases, selectedFilter]);

  useEffect(() => {
    if (sortedPurchases.length) {
      searchMedia({
        Ids: sortedPurchases.map((item) => item.MediaId),
        PageNumber: 1,
      });
    }
  }, [sortedPurchases]);

  return (
    <div className="SettingsMyOrders">
      <StatusTabs
        selectedFilter={selectedFilter}
        onSelectedFilter={setSelectedFilter}
        purchases={sortedPurchases}
      />
      <div className="Table">
        <HeadersRow />
        {TableRows}
        {/* Empty list */}
        {!sortedPurchases?.length && (
          <div className="SettingsMyOrders__EmptyList">
            {t("MY_ORDERS__NO_ELEMENTS")}
          </div>
        )}
      </div>
    </div>
  );
};
