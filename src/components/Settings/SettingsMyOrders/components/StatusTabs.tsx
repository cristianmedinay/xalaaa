/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React, { useCallback, useMemo } from "react";

import "./StatusTabs.scss";
import { StatusFilter } from "./types";

import { useTranslation } from "react-i18next";
import { IUserPurchasesModel } from "@xala/common";

export interface IStatusTabsProps {
  selectedFilter: StatusFilter;
  onSelectedFilter?: (filter: StatusFilter) => void;
  /**
   * Required for calculating status counts.
   */
  purchases?: IUserPurchasesModel[];
}

export const StatusTabs = ({
  selectedFilter,
  onSelectedFilter,
  purchases = [],
}: IStatusTabsProps) => {
  const { t } = useTranslation();
  const statusCounts = useMemo(() => {
    const allCount = purchases.length;
    const activeCount = purchases.filter((item) => item.Active).length;
    const inactiveCount = allCount - activeCount;
    return {
      [StatusFilter.All]: allCount,
      [StatusFilter.Active]: activeCount,
      [StatusFilter.Inactive]: inactiveCount,
    };
  }, [purchases]);

  const getTabTitle = useCallback((status: string | StatusFilter) => {
    switch (status) {
      case StatusFilter.All:
        return t("MY_ORDERS__TAB_ALL");
      case StatusFilter.Active:
        return t("MY_ORDERS__STATUS_ACTIVE");
      case StatusFilter.Inactive:
        return t("MY_ORDERS__STATUS_INACTIVE");
    }
  }, []);

  const filters = useMemo(
    () =>
      Object.values(StatusFilter)
        .filter((v) => isNaN(Number(v)))
        .map((filter) => {
          return (
            <div
              key={filter}
              onClick={() => onSelectedFilter?.(filter as StatusFilter)}
              className={
                selectedFilter === filter
                  ? "StatusTab__Tab SelectedTab"
                  : "StatusTab__Tab"
              }
            >
              {getTabTitle(filter)}
              <div className="StatusTab__Counter">{statusCounts[filter]}</div>
            </div>
          );
        }),
    [getTabTitle, onSelectedFilter, selectedFilter, statusCounts]
  );

  return (
    <div className="StatusTab">
      <div className="StatusTab__TabsContainer">
        {filters}
        <div className="StatusTab__Tab DummyTab" />
      </div>
    </div>
  );
};
