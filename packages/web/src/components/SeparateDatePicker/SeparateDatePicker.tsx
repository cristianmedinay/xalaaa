/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { TimeHelper } from "@xala/common";
import { DefaultOptionType } from "rc-select/lib/Select";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { InputSelect, LabelField, Option } from "components";

import "./SeparateDatePicker.scss";

type DateType = { day?: number; month?: string; year?: number } | undefined;

const YEAR_START = 1918;
const YEAR_COUNT = TimeHelper.getCurrentYear() - YEAR_START + 1;

interface ISeparateDatePickerProps {
  initialDate?: string;
}

export const SeparateDatePicker = ({
  initialDate,
}: ISeparateDatePickerProps) => {
  const { t } = useTranslation();
  const [days, setDays] = useState([0]);
  const [date, setDate] = useState<DateType>();
  const years = Array.from(
    { length: YEAR_COUNT },
    (_, i) => i + YEAR_START
  ).reverse();
  const months = TimeHelper.getMonths() as string[];

  useEffect(() => {
    const daysInMonth =
      TimeHelper.getDaysInMonth(`${date?.year} ${date?.month} 1`) || 31;
    setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
  }, [date]);

  const handleMonthSelect = (value: DefaultOptionType) => {
    setDate({ ...date, month: value.toString() });
  };

  const handleYearSelect = (value: DefaultOptionType) => {
    setDate({ ...date, year: +value });
  };

  return (
    <div className="SeparateDatePicker">
      <p className="SeparateDatePicker__label">{t("REGISTER__BIRTH")}</p>
      <div className="SeparateDatePicker__container">
        <LabelField
          initialValue={
            initialDate && TimeHelper.parseValueFromDate(initialDate, "DD")
          }
          name="date-day"
          label={t("REGISTER__DATE_DAY")}
          displayLabel={false}
          labelFor="date-day"
        >
          <InputSelect
            className="SeparateDatePicker__input SeparateDatePicker__input_day"
            placeholder={t("REGISTER__DATE_DAY")}
            id="date-day"
          >
            {days.map((day) => (
              <Option
                value={day}
                key={`date-day-${day}`}
                className="SeparateDatePicker__input_option"
              >
                {day}
              </Option>
            ))}
          </InputSelect>
        </LabelField>
        <LabelField
          initialValue={initialDate && TimeHelper.getMonthName(initialDate)}
          name="date-month"
          label={t("REGISTER__DATE_MONTH")}
          displayLabel={false}
          labelFor="date-month"
        >
          <InputSelect
            className="SeparateDatePicker__input SeparateDatePicker__input_month"
            placeholder={t("REGISTER__DATE_MONTH")}
            onSelect={handleMonthSelect}
            id="date-month"
          >
            {months.map((month) => (
              <Option
                value={month}
                key={`date-month-${month}`}
                className="SeparateDatePicker__input_option"
              >
                {t(month.toUpperCase(), month)}
              </Option>
            ))}
          </InputSelect>
        </LabelField>
        <LabelField
          initialValue={
            initialDate && TimeHelper.parseValueFromDate(initialDate, "YYYY")
          }
          name="date-year"
          label={t("REGISTER__DATE_YEAR")}
          displayLabel={false}
          labelFor="date-year"
        >
          <InputSelect
            className="SeparateDatePicker__input SeparateDatePicker__input_year"
            placeholder={t("REGISTER__DATE_YEAR")}
            onSelect={handleYearSelect}
            id="date-year"
          >
            {years.map((year) => (
              <Option
                value={year}
                key={`date-year-${year}`}
                className="SeparateDatePicker__input_option"
              >
                {year}
              </Option>
            ))}
          </InputSelect>
        </LabelField>
      </div>
    </div>
  );
};
