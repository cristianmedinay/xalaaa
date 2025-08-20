/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  CellType,
  ComponentType,
  DataProvider,
  IMediaModel,
  MediaStreamType,
  MediaType,
  Orientation,
  ScreenType,
  useGetMediaChannelPrograms,
  useGetMediaPlayInfo,
  useIdRouteParam,
  useIsLoggedIn,
  useRecommendationsList,
} from "@xala/common";
import cx from "classnames";
import dayjs from "dayjs";
import React, { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  ClipboardCopyButton,
  GridComponent,
  Label,
  ListComponent,
  LoaderSpinner,
  MediaAdditionalInfo,
  MediaButton,
  MediaPeople,
  MediaStartInfo,
  MyListButton,
  PlayButton,
  TrailerButton,
} from "components";
import { MediaButtonVariant } from "enums";
import getAbsoluteParent from "helpers/parentsHelper";
import { removeParentTitle } from "helpers/textHelper";
import ChevronDown from "resources/icons/chevron-down.svg";
import MuteIcon from "resources/icons/mute.svg";
import UnmuteIcon from "resources/icons/unmute.svg";
import {
  MediaDetailsScreen,
  SeasonEpisodesPicker,
  useMediaDetailsLoadingSelector,
  useMediaDetailsMediaSelector,
} from "screens/MediaDetailsScreen";

import "./MovieDetailsScreen.scss";

export const MovieDetailsScreen = () => {
  const [channelDetails, setChannelDetails] = useState<IMediaModel | null>(
    null
  );
  const muteButton = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();
  const isLoggedIn = useIsLoggedIn();
  const media = useMediaDetailsMediaSelector();
  const loading = useMediaDetailsLoadingSelector();
  const { recommendationsList } = useRecommendationsList({
    media: channelDetails || media,
    loading,
    cellType: CellType.Frame,
    visibleItemsCount: innerWidth > 1100 ? 3 : 2,
    title: channelDetails ? "CHANNEL_RECOMMENDATIONS" : undefined,
  });

  const dateOf7DaysBefore = dayjs()
    .subtract(7, "day")
    .format("YYYY-MM-DDTHH:mm:ssZ");

  const { channel, isLoading, getNextPage, haveNextPage } =
    useGetMediaChannelPrograms(media?.ParentMediaId || 0, dateOf7DaysBefore, 8);

  useEffect(() => {
    if (
      media &&
      media.MediaTypeCode === MediaType.Program &&
      media.ParentMediaId
    ) {
      DataProvider.getMedia({
        MediaId: media.ParentMediaId,
        IncludeCategories: false,
        IncludeImages: false,
        IncludePeople: false,
        IncludePurchaseOffers: false,
        IncludeSimilarMedia: true,
      })
        .then((response: IMediaModel) => {
          setChannelDetails(response);
        })
        .catch(() => {
          setChannelDetails(null);
        });
    }
  }, [media]);

  useEffect(() => {
    console.log(channelDetails);
  }, [channelDetails]);

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

  const renderChannelProgramsGrid = useMemo(() => {
    return (
      <GridComponent
        rows={0}
        component={{
          ComponentTypeCode: ComponentType.List,
          CellType: CellType.Frame,
          Orientation: Orientation.Grid,
          MediaList: channel.Media,
          ShowTimeLeft: true,
        }}
      />
    );
  }, [channel.Media]);

  const renderGetMoreProgramsButton = useMemo(() => {
    if (haveNextPage) {
      return (
        <div className="SearchScreen__loader">
          {isLoading && haveNextPage ? (
            <LoaderSpinner />
          ) : (
            <MediaButton
              icon={<ChevronDown />}
              iconElevated={true}
              variant={MediaButtonVariant.Transparent}
              onClick={getNextPage}
            >
              {t("COMMON__BUTTON_MORE", "Show more")}
            </MediaButton>
          )}
        </div>
      );
    }
  }, [getNextPage, isLoading, t, haveNextPage]);

  const RenderDetails = ({
    muteButton,
  }: {
    muteButton: RefObject<HTMLButtonElement>;
  }) => {
    const mediaId = useIdRouteParam();
    const [muted, setMuted] = useState<boolean>(true);

    const { playInfo } = useGetMediaPlayInfo({
      mediaId,
      streamType: MediaStreamType.Promo,
    });

    if (!media) {
      return <></>;
    }

    const showGenre = Boolean(media.Genre);
    const showParentSubtitle = Boolean(media.ParentMedia?.ParentMediaTitle);
    const showDescription = Boolean(media?.LongDescription);
    const showPeople = media.People?.length !== 0;
    const isEvent = media.MediaTypeCode === MediaType.Event;
    const isProgram = media.MediaTypeCode === MediaType.Program;

    const changeMuted = (value: boolean) => {
      setMuted(value);
    };

    return (
      <>
        <div className="MovieDetails__info-container">
          <div className="MovieDetails__info">
            <div>
              <div className="Container__wrapper">
                {showGenre && (
                  <div className="MovieDetails__genres">{media.Genre}</div>
                )}
                {isEvent && (
                  <Label media={media} showTime={true} isOnHighlight={true} />
                )}
              </div>
              {showParentSubtitle && (
                <div className="MovieDetails__parentTitle">
                  {media.ParentMedia && getAbsoluteParent(media.ParentMedia)}
                </div>
              )}
            </div>
            <div className="MovieDetails__main-info">
              <h1 className="MovieDetails__title text--shadow">
                {removeParentTitle(media.Title)}
              </h1>
              <MediaAdditionalInfo media={media} />
              <MediaStartInfo media={media} />
              <div className="MovieDetails__actions text--shadow">
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
                cx("MediaButton", `MediaButton--${MediaButtonVariant.Primary}`),
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
        <div className="MovieDetails__details-container">
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
              <MediaPeople
                people={media.People}
                loading={showPeople && loading}
              />
            </div>
          )}
        </div>
        <SeasonEpisodesPicker
          media={media?.ParentMedia}
          screenType={
            media?.MediaTypeCode === MediaType.Podcast
              ? ScreenType.AlbumDetails
              : ScreenType.MovieDetails
          }
          goToParentOnClick
        />
        {renderRecommendationList}
        {isProgram && (
          <div className="ChannelDetails__programs">
            <p className="ChannelDetails__programs_title">
              {t("DETAILS__PROGRAMS_PAST")}
            </p>
            {renderChannelProgramsGrid} {renderGetMoreProgramsButton}
          </div>
        )}
      </>
    );
  };

  return (
    <MediaDetailsScreen
      className="MovieDetails"
      media={media}
      muteButton={muteButton}
    >
      <RenderDetails muteButton={muteButton} />
    </MediaDetailsScreen>
  );
};
