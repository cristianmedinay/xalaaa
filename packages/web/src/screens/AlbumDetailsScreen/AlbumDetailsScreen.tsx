/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  CellType,
  MediaType,
  ScreenType,
  useIsLoggedIn,
  useRecommendationsList,
} from "@xala/common";
import cx from "classnames";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
  ClipboardCopyButton,
  ListComponent,
  MediaPeople,
  MyListButton,
  PlayButton,
} from "components";

import {
  MediaDetailsScreen,
  SeasonEpisodesPicker,
  useMediaDetailsLoadingSelector,
  useMediaDetailsMediaSelector,
} from "../MediaDetailsScreen";

import "./AlbumDetailsScreen.scss";

export const AlbumDetailsScreen = () => {
  const { t } = useTranslation();
  const media = useMediaDetailsMediaSelector();
  const loading = useMediaDetailsLoadingSelector();
  const isLoggedIn = useIsLoggedIn();
  const { recommendationsList } = useRecommendationsList({
    media,
    loading,
    cellType: CellType.Frame,
    visibleItemsCount: innerWidth > 1100 ? 3 : 2,
  });

  const renderRecommendationList = useMemo(() => {
    return (
      recommendationsList && (
        <ListComponent
          component={recommendationsList}
          className="RecommendationList"
        />
      )
    );
  }, [recommendationsList]);

  const isAlbumAvailable = useMemo(() => {
    return media?.MediaTypeCode === MediaType.Album && media?.UrlSource !== "";
  }, [media?.MediaTypeCode, media?.UrlSource]);

  const showDescription = Boolean(media?.LongDescription);
  const showPeople = media?.People?.length !== 0;

  return (
    <MediaDetailsScreen className="AlbumDetails" media={media}>
      {media && (
        <>
          <div className="AlbumDetails__info-container">
            <div
              className={cx("AlbumDetails__info", {
                "AlbumDetails__info--flex-end": !media?.Genre,
              })}
            >
              {media?.Genre && (
                <div className="AlbumDetails__genres">
                  <span>{media.Genre}</span>
                </div>
              )}
              <div className="AlbumDetails__main-info">
                <h1 className="AlbumDetails__title">{media.Title}</h1>
                <div
                  className="AlbumDetails__details__description-text"
                  dangerouslySetInnerHTML={{
                    __html: media.ShortDescription || "",
                  }}
                />
                <div className="AlbumDetails__actions">
                  {isAlbumAvailable && <PlayButton media={media} />}
                  {isLoggedIn && <MyListButton media={media} />}
                  <ClipboardCopyButton media={media} />
                </div>
              </div>
            </div>
          </div>
          <div className="MovieDetails__details-container">
            <p>{showDescription}</p>
            {showDescription && (
              <div className="MovieDetails__details__description">
                <h2 className="MovieDetails__details__description-header">
                  {t("DETAILS__INFORMATION", "Information")}
                </h2>
                <div
                  className="MovieDetails__details__description-text"
                  dangerouslySetInnerHTML={{
                    __html: media.LongDescription || "",
                  }}
                ></div>
              </div>
            )}
            {showPeople && (
              <div className="MovieDetails__details__people">
                <h2 className="MovieDetails__details__people-header">
                  {t("DETAILS__TECHNICAL_SHEET", "Technical card")}
                </h2>
                <MediaPeople people={media.People} loading={loading} />
              </div>
            )}
          </div>
          <SeasonEpisodesPicker
            screenType={ScreenType.AlbumDetails}
            media={media}
          />
          {renderRecommendationList}
        </>
      )}
    </MediaDetailsScreen>
  );
};
