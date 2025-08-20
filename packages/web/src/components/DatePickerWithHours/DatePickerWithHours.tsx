/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import dayjs from "dayjs";
import React, { useState } from "react";

import { LabelField } from "../";
import { DatePickerField } from "../DatePickerField";
import { TimePickerField } from "../TimePickerField";

import "./DatePickerWithHours.scss";

import { Rule } from "rc-field-form/es/interface";
import { FormInstance } from "rc-field-form/lib/interface";

export type AddPillCallback = (value: string) => void;

export interface IPillsListProps {
  label: string;
  dateName: string;
  timeName: string;
  form: FormInstance;
  initialValue?: Date | string;
  rulesDate?: Rule[];
  rulesTime?: Rule[];
  errors?: string[];
  calendarPopperPosition?: "auto" | "top" | "bottom";
  requiredIcon?: boolean;
  disabled?: boolean;
}

export const DatePickerWithHours = ({
  label,
  dateName,
  timeName,
  form,
  initialValue,
  rulesDate,
  rulesTime,
  errors,
  calendarPopperPosition,
  requiredIcon,
  disabled,
}: IPillsListProps) => {
  const [timeState, setTimeState] = useState<any>(initialValue);
  const [dateState, setDateState] = useState<any>(initialValue);

  const mergeDateAndTime = (dateValue: any, timeValue: any) => {
    let date = dateValue as
      | { day: number; month: number; year: number }
      | Date
      | string;
    const time = timeValue;

    if (!date && time) {
      date = new Date(Date.now());
    }

    if (date) {
      if (typeof date === "object" && Object.keys(date).includes("day")) {
        const convertedTime = time ? dayjs(time).format("HH:mm:ss") : "";
        const simpleDate = date as { day: number; month: number; year: number };
        return dayjs(
          `${simpleDate.year}, ${simpleDate.month}, ${simpleDate.day}, ${convertedTime}`
        ).format();
      } else {
        let dateObject;
        if (typeof date === "object") {
          dateObject = new Date(date as Date);
        } else {
          dateObject = new Date(date as string);
        }
        const simpleDate = dayjs(dateObject);
        const convertedTime = time ? dayjs(time).format("HH:mm:ss") : "";
        return dayjs(
          `${simpleDate.year()}, ${
            simpleDate.month() + 1
          }, ${simpleDate.date()}, ${convertedTime}`
        ).format();
      }
    }

    return undefined;
  };

  const onChangeTime = (timeValue: any) => {
    const merged = mergeDateAndTime(dateState, timeValue);
    form.setFieldsValue({
      [dateName]: merged,
      [timeName]: merged,
    });
    return merged;
  };

  const onChangeDate = (dateValue: any) => {
    const merged = mergeDateAndTime(dateValue, timeState);
    form.setFieldsValue({
      [dateName]: merged,
      [timeName]: merged,
    });
    return merged;
  };

  return (
    <div className="date-time-container">
      <div className={`date-and-time-picker ${disabled ? "disabled" : ""}`}>
        <LabelField
          label={label}
          name={dateName}
          initialValue={initialValue}
          rules={rulesDate}
          requiredIcon={requiredIcon}
          shouldUpdate={(prevValues, curValues) => {
            return prevValues[dateName] !== curValues[dateName];
          }}
          dependencies={[dateName]}
        >
          {(field) => {
            return (
              <DatePickerField
                calendarPopperPosition={calendarPopperPosition}
                defaultValue={field.value}
                onChange={(value) => {
                  setDateState(value);
                  field.onChange(onChangeDate(value));
                }}
              />
            );
          }}
        </LabelField>

        <LabelField
          name={timeName}
          initialValue={initialValue}
          rules={rulesTime}
          shouldUpdate={(prevValues, curValues) => {
            return prevValues[timeName] !== curValues[timeName];
          }}
          dependencies={[timeName]}
        >
          {(field) => {
            return (
              <TimePickerField
                defaultValue={field.value}
                onChange={(value) => {
                  setTimeState(value);
                  field.onChange(onChangeTime(value));
                }}
              />
            );
          }}
        </LabelField>
      </div>
      <ul className="Error">
        {errors?.map((error: React.ReactNode, index: number) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
};
