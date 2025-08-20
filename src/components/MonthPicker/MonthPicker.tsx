/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "react-i18next";

import LeftArrowIcon from "../../resources/icons/left-arrow.svg";
import RightArrowIcon from "../../resources/icons/right-arrow.svg";

import "./MonthPicker.scss";

import { Month } from "../../screens/EventsScreen/Events";

interface IMonthPickerProps {
  month: Month;
  setMonth: (newMonth: Month) => void;
}
export const MonthPicker = ({ month, setMonth }: IMonthPickerProps) => {
  const { t } = useTranslation();

  const addMonth = () => dayjs(month).add(1, "month").format();
  const subtractMonth = () => dayjs(month).subtract(1, "month").format();

  return (
    <div className="month-picker">
      <div
        className="picker-icon left"
        onClick={() => setMonth(subtractMonth())}
      >
        <LeftArrowIcon />
      </div>
      <p className="selected-month">
        {t(dayjs(month).format("MMMM"))} {dayjs(month).format("YYYY")}
      </p>
      <div className="picker-icon" onClick={() => setMonth(addMonth())}>
        <RightArrowIcon />
      </div>
    </div>
  );
};
