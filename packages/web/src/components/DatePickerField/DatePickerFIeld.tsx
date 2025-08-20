/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";
import DatePicker, { DayValue } from "react-modern-calendar-datepicker";

import CalendarIcon from "../../resources/icons/calendar-icon.svg";

import "react-modern-calendar-datepicker/lib/DatePicker.css";

import "./DatePickerField.scss";

import dayjs from "dayjs";
import { useEffect } from "react";

export interface IDatePickerFieldProps {
  onChange?: (newValue: DayValue) => void;
  defaultValue?: string;
  calendarPopperPosition?: "auto" | "top" | "bottom";
}
export const DatePickerField: React.FC<IDatePickerFieldProps> = (props) => {
  const parseValue = (value?: any) => {
    if (typeof value === "object" && Object(value).hasOwnProperty("day")) {
      return value;
    } else {
      return value
        ? {
            year: Number(dayjs(value).format("YYYY")),
            month: Number(dayjs(value).format("MM")),
            day: Number(dayjs(value).format("DD")),
          }
        : undefined;
    }
  };
  const defaultDate = parseValue(props.defaultValue);

  useEffect(() => {
    setDay(parseValue(props.defaultValue));
  }, [props.defaultValue]);

  const [day, setDay] = React.useState<DayValue | undefined>(defaultDate);

  const handleOnChange = (newValue: DayValue) => {
    setDay(newValue);
    props.onChange?.(newValue);
  };

  return (
    <div className="date-picker">
      <DatePicker
        value={day}
        calendarPopperPosition={props.calendarPopperPosition || "auto"}
        onChange={(newValue) => {
          handleOnChange(newValue);
        }}
        inputPlaceholder="Select Date"
      />
      <CalendarIcon />
    </div>
  );
};
