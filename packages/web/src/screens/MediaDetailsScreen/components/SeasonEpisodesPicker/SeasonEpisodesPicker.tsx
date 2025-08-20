/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  CellType,
  ComponentType,
  IListComponentModel,
  IMediaModel,
  MediaType,
  Orientation,
  RouteHelper,
  ScreenType,
} from "@xala/common";
import cx from "classnames";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

import { InputSelect, ListComponent, Option } from "components";
import { Breakpoints } from "components/Responsive";

import "./SeasonEpisodesPicker.scss";

enum ListTypeText {
  ALL = "SEE_ALL",
  LESS = "SEE_LESS",
}

interface SeasonEpisodesPickerProps {
  media?: IMediaModel;
  screenType: ScreenType;
  goToParentOnClick?: boolean;
}

export const SeasonEpisodesPicker = (props: SeasonEpisodesPickerProps) => {
  const [episodesAsGrid, setEpisodesAsGrid] = useState(false);
  const { t } = useTranslation();
  const { media, screenType, goToParentOnClick } = props;
  const [selectedSeason, setSelectedSeason] = useState<IMediaModel | undefined>(
    undefined
  );

  useEffect(() => {
    if (!media) {
      return undefined;
    }

    const isDividedIntoSeasons =
      Array.isArray(media.Media) && media.Media.length > 1;

    if (!isDividedIntoSeasons) {
      return setSelectedSeason(undefined);
    }

    return setSelectedSeason(media.Media?.[0]);
  }, [media]);

  const shouldUseSelectInput = useMediaQuery({
    maxWidth: Breakpoints.MD,
  });

  const toggleGridView = useCallback(
    () => setEpisodesAsGrid((prevState) => !prevState),
    [setEpisodesAsGrid]
  );
  const getListTypeText = useMemo(
    () => (episodesAsGrid ? ListTypeText.LESS : ListTypeText.ALL),
    [episodesAsGrid]
  );

  const renderOptions = useMemo(() => {
    const seasons = media?.Media;

    return seasons?.map((season, index) => (
      <button
        className={cx(
          "SeasonPicker__seasons--text seasonsButton",
          selectedSeason?.Id === season.Id && "seasonsButton-selected"
        )}
        key={season.Id}
        id={"btn" + index}
        onClick={() => {
          setSelectedSeason(season);
        }}
      >
        <p>{season.Title}</p>
      </button>
    ));
  }, [media?.Media, setSelectedSeason, selectedSeason]);

  const hasAnyEpisodes: boolean = useMemo(() => {
    if (!media) {
      return false;
    }

    let childMediaTypeCode: MediaType = MediaType.Episode;

    if (screenType === ScreenType.AlbumDetails) {
      childMediaTypeCode = MediaType.Podcast;
    }

    return !!media?.Media?.find((child) => {
      if (child?.MediaTypeCode === childMediaTypeCode) {
        return true;
      }
      return child?.Media?.find(
        (episode) => episode?.MediaTypeCode === childMediaTypeCode
      );
    });
  }, [media, screenType]);

  const hasSeasons: boolean = useMemo(() => {
    if (!media || !hasAnyEpisodes) {
      return false;
    }

    let childMediaTypeCode: MediaType = MediaType.Episode;

    if (screenType === ScreenType.AlbumDetails) {
      childMediaTypeCode = MediaType.Podcast;
    }

    return !!media?.Media?.find((son) => {
      return son?.MediaTypeCode !== childMediaTypeCode;
    });
  }, [media, screenType]);

  const renderEpisodesList = useMemo(() => {
    if (!media) {
      return null;
    }

    const visibleItemsCount = innerWidth > 1100 ? 3 : 2;

    let cellType: CellType;

    switch (screenType) {
      case ScreenType.AlbumDetails:
        cellType = CellType.Podcast;
        break;
      case ScreenType.SeriesDetails:
      case ScreenType.MovieDetails:
        cellType = CellType.Custom;
        break;
      default:
        cellType = CellType.Frame;
    }

    const episodesList: IListComponentModel = {
      ComponentTypeCode: ComponentType.List,
      CellType: cellType,
      VisibleItemsCount: visibleItemsCount,
      Orientation: episodesAsGrid ? Orientation.Grid : Orientation.Horizontal,
      MediaList: [],
    };

    if (hasSeasons && selectedSeason !== undefined) {
      episodesList.MediaList = selectedSeason.Media || [];
    } else if (hasSeasons) {
      for (const season of media.Media || []) {
        episodesList.MediaList = episodesList.MediaList?.concat(
          season.Media || []
        );
      }
    } else {
      episodesList.MediaList = media.Media || [];
    }

    return (
      <ListComponent
        component={episodesList}
        className={episodesAsGrid ? "EpisodesGrid" : ""}
        gridRows={0}
        gridColumns={screenType === ScreenType.AlbumDetails ? 4 : 3}
      />
    );
  }, [media, episodesAsGrid, screenType, selectedSeason, hasSeasons]);

  const selectInput = useMemo(() => {
    const seasons = media?.Media;

    return (
      <InputSelect
        className="SeasonPicker__season-dropdown"
        value={selectedSeason?.Id || ""}
        onSelect={(seasonId) =>
          setSelectedSeason(
            media?.Media?.find((season) => season.Id === seasonId)
          )
        }
      >
        {seasons?.map((season) => {
          return (
            <Option key={season.Id} value={season.Id}>
              {season.Title}
            </Option>
          );
        })}
      </InputSelect>
    );
  }, [media, selectedSeason]);

  if (!hasAnyEpisodes) {
    return null;
  }

  return (
    <div className="SeasonPicker__season-section">
      <div className="SeasonPicker__listMode">
        <div className="SeasonPicker__listMode--text">
          {goToParentOnClick && media
            ? t("MORE_EPISODES")
            : t("DETAILS__CAPITOLS")}
        </div>
        <div className="vertical-divider"></div>
        <div
          className="SeasonPicker__listMode-button"
          id="btn"
          onClick={
            goToParentOnClick && media
              ? () => RouteHelper.handleClickFromListComponentItem(media)
              : toggleGridView
          }
        >
          {goToParentOnClick && media ? t("SEE_PROGRAM") : t(getListTypeText)}
        </div>
      </div>
      {hasSeasons && (
        <div className="SeasonPicker__seasons">
          <div className="SeasonPicker__seasons--text">{t("SEASON")}</div>
          {shouldUseSelectInput ? (
            selectInput
          ) : (
            <div className="SeasonPicker__buttons-container">
              {renderOptions}
            </div>
          )}
        </div>
      )}
      {renderEpisodesList}
    </div>
  );
};
