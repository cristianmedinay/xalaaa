/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { TimeHelper, useEpgDaySwitcherComponent } from "@xala/common";
import cx from "classnames";
import i18next from "i18next";
import React, { memo, useCallback } from "react";

import { Button } from "components/Button";
import { InputSelect } from "components/InputSelect";
import { Option } from "components/Select";

import "./DaySwitcher.scss";

const DaySwitcherRaw = () => {
  const { currentDay, onDaySelect, dates } = useEpgDaySwitcherComponent();

  const language = i18next.language;

  const renderButton = useCallback(
    (date: Date): React.ReactNode => {
      const active = TimeHelper.createDate(date).isSame(currentDay, "date");
      const format = active ? "dddd D MMM" : "D MMM";
      const formattedDate = TimeHelper.format(date, format, language);

      const buttonClass = cx("epg-desktop-day-switcher-button", {
        ["epg-desktop-day-switcher-button-active"]: active,
      });

      return (
        <Button
          buttonClassName={buttonClass}
          key={formattedDate}
          onClick={() => onDaySelect(date)}
        >
          {formattedDate}
        </Button>
      );
    },
    [currentDay, language, onDaySelect]
  );

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

  const renderButtonSelector = useCallback(
    () => dates.map(renderButton),
    [dates, renderButton]
  );

  const renderInputSelector = useCallback(() => {
    const formattedDate = TimeHelper.format(
      currentDay,
      "dddd DD MMM",
      language
    );

    return (
      <div className="epg-desktop-day-switcher-dropdown">
        <label htmlFor="epg-day-select">Select date</label>
        <InputSelect
          onSelect={(date) => onDaySelect(TimeHelper.getDate(date as string))}
          placeholder={formattedDate}
          value={[]}
          id="epg-day-select"
        >
          {dates.map(renderOption)}
        </InputSelect>
      </div>
    );
  }, [currentDay, dates, language, onDaySelect, renderOption]);

  return (
    <div className="epg-desktop-day-switcher">
      {renderButtonSelector()}
      {renderInputSelector()}
    </div>
  );
};

export const DaySwitcher = memo(DaySwitcherRaw);

DaySwitcher.whyDidYouRender = true;
