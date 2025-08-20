/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { configurationSelector } from "@xala/common/src/store/configuration/selectors";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { AppHeader } from "../../components";
import { AddAssetDialog } from "../Dialog/AddAssetDialog";

export const Events = () => {
  const { t } = useTranslation();
  const configuration = useSelector(configurationSelector);

  return (
    <>
      <AppHeader configuration={configuration} />

      <div className="event-container">
        <div className="event-container__actions">
          <p>{t("EVENT__FILTERS_MY_EVENTS", "My events")}</p>
          <AddAssetDialog>
            <p>{t("EVENT__FORM_ADD_EVENT", "Add event")}</p>
          </AddAssetDialog>
          <p>{t("EVENT__FORM_UPLOAD_VIDEO", "Upload video")}</p>
        </div>

        <div className="__event-picker">
          <p>{t("EVENT__MONTH_PICKER")}</p>
        </div>

        <div className="__filters">
          <p>{t("EVENT__FILTERS", "Filters")}</p>
        </div>
      </div>
    </>
  );
};
