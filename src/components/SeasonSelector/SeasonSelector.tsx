/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import {
  DataProvider,
  IErrorModel,
  IMediaModel,
  ROUTES,
  useDataLoader,
} from "@xala/common";
import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Message, Option, Select } from "components";

import "./SeasonSelector.scss";

import { useTranslation } from "react-i18next";

interface SeasonSelectorProps {
  seriesId: number;
  currentSeasonId: number;
}

export const SeasonSelector = ({
  seriesId,
  currentSeasonId,
}: SeasonSelectorProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { data, error } = useDataLoader<IMediaModel, IErrorModel>({
    loader: () =>
      DataProvider.getMedia({
        MediaId: seriesId,
        IncludeCategories: false,
        IncludeImages: false,
        IncludePeople: false,
        IncludePurchaseOffers: false,
        IncludeSimilarMedia: false,
      })
        .then((response: IMediaModel) => {
          return {
            ok: true,
            data: response,
            error: {},
          };
        })
        .catch((error: IErrorModel) => {
          return {
            ok: false,
            error: error,
          };
        }),
    deps: [],
  });

  const onChange = useCallback((id: number) => {
    history.push(`${ROUTES.MOVIE_DETAILS_SCREEN}/${id}`);
  }, []);

  useEffect(() => {
    if (error) {
      const { MessageKey } = error;

      if (Array.isArray(MessageKey)) {
        MessageKey.map((error) => Message.error(t(error)));
      } else {
        Message.error(t(MessageKey ?? "MODEL_VALIDATION_ERROR"));
      }
    }
  }, [error]);

  return (
    <Select
      className="SeasonSelector"
      defaultValue={currentSeasonId}
      onChange={onChange}
    >
      {data?.Media?.map((season: IMediaModel) => (
        <Option value={season.Id} key={season.Id}>
          {season.Title}
        </Option>
      ))}
    </Select>
  );
};
