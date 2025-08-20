/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import {
  CellType,
  ComponentType,
  IMediaModel,
  Orientation,
  TimeHelper,
  useGetMediaChannelPrograms,
  useRecommendationsList,
} from "@xala/common";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
  GridComponent,
  ListComponent,
  LoaderSpinner,
  MediaButton,
  PlayButton,
} from "components";
import { MediaButtonVariant } from "enums";
import ChevronDown from "resources/icons/chevron-down.svg";

import "./ChannelDetails.scss";

export interface IChannelDetailsProps {
  id: number;
  media: IMediaModel | undefined;
}

export const ChannelDetails = ({ id, media }: IChannelDetailsProps) => {
  const { t } = useTranslation();

  const dateOf7DaysBefore = dayjs()
    .subtract(7, "day")
    .format("YYYY-MM-DDTHH:mm:ssZ");

  const { channel, isLoading, getNextPage, haveNextPage } =
    useGetMediaChannelPrograms(id, dateOf7DaysBefore, 8);

  const { recommendationsList } = useRecommendationsList({
    media,
    cellType: CellType.Frame,
    visibleItemsCount: innerWidth > 1100 ? 3 : 2,
    title: "CHANNEL_RECOMMENDATIONS",
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

  const genre = media?.Genre;
  const mediaEntry = media?.Media?.[0];
  const tvShowTitle = mediaEntry?.Title;
  const tvShowDescription = mediaEntry?.ShortDescription;
  const tvShowStartTime = mediaEntry?.StartDateTime;
  const tvShowEndTime = mediaEntry?.EndDateTime;

  if (!media) {
    return null;
  }

  return (
    <>
      <div className="ChannelDetails__info-container">
        <div className="ChannelDetails__info">
          {genre && <p className="ChannelDetails__genres">{genre}</p>}
          <div className="ChannelDetails__main-info">
            <p className="ChannelDetails__title text--shadow">{tvShowTitle}</p>
            <p className="ChannelDetails__description">{tvShowDescription}</p>
            <div className="ChannelDetails__TVshowTime">
              <div>
                {`${TimeHelper.format(
                  tvShowStartTime || "",
                  "DD-MM-YYYY"
                )} ${TimeHelper.format(
                  tvShowStartTime || "",
                  "HH.mm"
                )}h - ${TimeHelper.format(tvShowEndTime || "", "HH.mm")}h`}
              </div>
            </div>
            <div className="ChannelDetails__actions text--shadow">
              <PlayButton media={media} />
            </div>
          </div>
        </div>
      </div>
      {renderRecommendationList}
      <div className="ChannelDetails__programs">
        <p className="ChannelDetails__programs_title">
          {t("DETAILS__PROGRAMS_PAST")}
        </p>
        {renderChannelProgramsGrid} {renderGetMoreProgramsButton}
      </div>
    </>
  );

  /* return (
    <div className="ChannelDetails">
      <section className="ChannelDetails__section">
        <div className="ChannelDetails__info-wrapper">
          <p className="ChannelDetails__TVshowTitle">{tvShowTitle}</p>
          <p className="ChannelDetails__TVshowDescription">
            {tvShowDescription}
          </p>
          <div className="ChannelDetails__TVshowTime">
            <div>{TimeHelper.format(tvShowStartTime || "", "DD-MM-YYYY")}</div>
            <div>
              {TimeHelper.format(tvShowStartTime || "", "HH:mm")}h -
              {TimeHelper.format(tvShowEndTime || "", "HH:mm")}h
            </div>
          </div>
          <PlayButton media={media} />
        </div>
      </section>
      {renderRecommendationList}
      <div className="ChannelDetails__programs">
        <p className="ChannelDetails__programs_title">
          {t("DETAILS__PROGRAMS_PAST")}
        </p>
        {renderChannelProgramsGrid} {renderGetMoreProgramsButton}
      </div>
    </div>
  ); */
};
