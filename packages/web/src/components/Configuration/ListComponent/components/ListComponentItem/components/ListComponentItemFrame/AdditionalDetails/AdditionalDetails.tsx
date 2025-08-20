/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { IMediaModel } from "@xala/common";
import i18n from "i18next";
import React from "react";

import { translateDate } from "helpers/dateHelpers";

import "./AdditionalDetails.scss";

interface AdditionalDetailsProps {
  data: IMediaModel;
  hideDate: boolean;
}

export const AdditionalDetails = ({
  data,
  hideDate = false,
}: AdditionalDetailsProps) => {
  return (
    <div className="AdditionalDetailsContainer">
      {!hideDate && data.AvailableFrom && (
        <p className="AdditionalDetailsContainer_Date">
          {/* {TimeHelper.getTranslatedStartDate(
            data.AvailableFrom,
            i18n.language,
            "D MMMM YYYY"
          )} */}
          {translateDate({
            date: new Date(data?.AvailableFrom),
            language: i18n.language,
          })}
        </p>
      )}
      <p className="AdditionalDetailsContainer_Description">
        {data.ShortDescription}
      </p>
    </div>
  );
};
