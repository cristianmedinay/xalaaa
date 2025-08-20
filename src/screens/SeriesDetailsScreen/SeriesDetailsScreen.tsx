/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  CellType,
  MediaStreamType,
  ScreenType,
  useGetMediaPlayInfo,
  useIdRouteParam,
  useIsLoggedIn,
  useRecommendationsList,
} from "@xala/common";
import cx from "classnames";
import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  ClipboardCopyButton,
  ListComponent,
  MediaAdditionalInfo,
  MediaPeople,
  MediaStartInfo,
  MyListButton,
  PlayButton,
  TrailerButton,
} from "components";
import { MediaButtonVariant } from "enums";
import MuteIcon from "resources/icons/mute.svg";
import UnmuteIcon from "resources/icons/unmute.svg";
import {
  MediaDetailsScreen,
  SeasonEpisodesPicker,
  useMediaDetailsLoadingSelector,
  useMediaDetailsMediaSelector,
} from "screens/MediaDetailsScreen";

import "./SeriesDetailsScreen.scss";

export const SeriesDetailsScreen = () => {
  const { t } = useTranslation();
  const mediaId = useIdRouteParam();
  const media = useMediaDetailsMediaSelector();
  const loading = useMediaDetailsLoadingSelector();
  const isLoggedIn = useIsLoggedIn();
  const { recommendationsList } = useRecommendationsList({
    media,
    loading,
    cellType: CellType.Frame,
    visibleItemsCount: innerWidth > 1100 ? 3 : 2,
  });
  const muteButton = useRef<HTMLButtonElement>(null);
  const [muted, setMuted] = useState<boolean>(true);

  const { playInfo } = useGetMediaPlayInfo({
    mediaId,
    streamType: MediaStreamType.Promo,
  });

  const changeMuted = (value: boolean) => {
    setMuted(value);
  };

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

  const showDescription = Boolean(media?.LongDescription);
  const showPeople = media?.People?.length !== 0;

  return (
    <MediaDetailsScreen
      className="SeriesDetails"
      media={media}
      muteButton={muteButton}
    >
      {media && (
        <>
          <div className="SeriesDetails__info-container">
            <div
              className={cx("SeriesDetails__info", {
                "SeriesDetails__info--flex-end": !media?.Genre,
              })}
            >
              {media?.Genre && (
                <div className="SeriesDetails__genres">
                  <span>{media.Genre}</span>
                </div>
              )}
              <div className="SeriesDetails__main-info">
                <h1 className="SeriesDetails__title">{media.Title}</h1>
                <MediaAdditionalInfo media={media} />
                <MediaStartInfo media={media} />
                <div className="SeriesDetails__actions">
                  <PlayButton media={media} />
                  {isLoggedIn && <MyListButton media={media} />}
                  <TrailerButton media={media} />
                  <ClipboardCopyButton media={media} />
                </div>
              </div>
            </div>
            {playInfo?.ContentUrl && (
              <button
                className={[
                  cx(
                    "MediaButton",
                    `MediaButton--${MediaButtonVariant.Primary}`
                  ),
                  "mute-button",
                ].join(", ")}
                ref={muteButton}
                onClick={() => changeMuted(!muted)}
              >
                <i className={cx("MediaButton__icon")}>
                  {muted ? <MuteIcon /> : <UnmuteIcon />}
                </i>
              </button>
            )}
          </div>
          <div className="SeriesDetails__details-container">
            {showDescription && (
              <div className="SeriesDetails__details__description">
                <h2 className="SeriesDetails__details__description-header">
                  {t("DETAILS__INFORMATION")}
                </h2>
                <div
                  className="SeriesDetails__details__description-text"
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
                <MediaPeople
                  people={media.People}
                  loading={showPeople && loading}
                />
              </div>
            )}
            <div className="SeriesDetails__season-section"></div>
          </div>
          <SeasonEpisodesPicker
            media={media}
            screenType={ScreenType.SeriesDetails}
          />
          {renderRecommendationList}
        </>
      )}
    </MediaDetailsScreen>
  );
};
