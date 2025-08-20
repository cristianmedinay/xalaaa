/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { TimeHelper, useEpgDaySwitcherComponent } from "@xala/common";
import i18next from "i18next";
import React, { useCallback } from "react";

import { InputSelect } from "components/InputSelect";
import { Option } from "components/Select";

import "./DaySwitcher.scss";

export const DaySwitcher = () => {
  const { currentDay, onDaySelect, dates } = useEpgDaySwitcherComponent();

  const language = i18next.language;

  const renderOption = useCallback(
    (date: Date): React.ReactNode => {
      const formattedDate = TimeHelper.format(date, "dddd DD MMM", language);

      return (
        <Option key={formattedDate} value={date.toDateString()}>
          {formattedDate}
        </Option>
      );
    },
    [language]
  );

  const renderInputSelector = useCallback(() => {
    const formattedDate = TimeHelper.format(
      currentDay,
      "dddd DD MMM",
      language
    );

    return (
      <div className="epg-mobile-day-switcher-dropdown">
        <InputSelect
          onSelect={(date) => onDaySelect(TimeHelper.getDate(date as string))}
          placeholder={formattedDate}
          value={[]}
        >
          {dates.map(renderOption)}
        </InputSelect>
      </div>
    );
  }, [currentDay, dates, language, onDaySelect, renderOption]);

  return <div className="epg-mobile-day-switcher">{renderInputSelector()}</div>;
};
