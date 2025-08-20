/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IEpgComponentModel, TimeHelper, useEpgLoader } from "@xala/common";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

import { Epg } from "components/Epg";
import { Breakpoints } from "components/Responsive";

import "./EpgComponent.scss";

interface EpgComponentProps {
  component: IEpgComponentModel;
}

export const EpgComponent = (props: EpgComponentProps) => {
  const {
    component: { SourceId },
  } = props;

  const currentDate = TimeHelper.getStartOfDay(TimeHelper.getCurrentDateTime());

  const { isLoading, channels, programs, load } = useEpgLoader({
    mediaListId: SourceId,
  });

  const { t } = useTranslation();
  const onLoadDay = useCallback((day: Date) => load(day), [load]);

  const useCompactMode = useMediaQuery({
    maxWidth: Breakpoints.LG,
  });

  useEffect(() => {
    load(currentDate);
  }, [load]);

  return (
    <div className="epg-component">
      <Epg
        channels={channels}
        programs={programs}
        isLoading={isLoading}
        onLoadDay={onLoadDay}
        currentDay={currentDate}
        timeFrame={{ start: 0, end: 24 }}
        daySwitcher={{ daysBefore: 6, daysAfter: 2 }}
        baseDayWidth={24 * 350}
        verticalTimeScale={1 / 4}
        lineHeight={useCompactMode ? 100 : 100}
        useCompactMode={useCompactMode}
      >
        <h1 className="epg-component-header">{t("EPG__TITLE")}</h1>
      </Epg>
    </div>
  );
};
