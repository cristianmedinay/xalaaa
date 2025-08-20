/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  CellType,
  ComponentType,
  IListComponentModel,
  Orientation,
  useMediaListByIdSelector,
  useSearchMediaInMedia,
} from "@xala/common";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import {
  GridComponent,
  LoaderSpinner,
  MediaButton,
  PlayButton,
} from "components";
import { MediaButtonVariant } from "enums";
import ChevronDown from "resources/icons/chevron-down.svg";
import {
  IMediaDetailsParams,
  MediaDetailsScreen,
  useMediaDetailsMediaSelector,
} from "screens/MediaDetailsScreen";

import "./PackageDetailsScreen.scss";

export const PackageDetailsScreen = () => {
  const { t } = useTranslation();
  const params = useParams<IMediaDetailsParams>();
  const media = useMediaDetailsMediaSelector();
  const mediaList = useMediaListByIdSelector(params.id ?? -1);

  const searchMediaInMedia = useSearchMediaInMedia();

  useEffect(() => {
    searchMediaInMedia({
      MediaParentId: +params.id,
    });
  }, []);

  const getMore = () => {
    if (mediaList?.Filter?.PageNumber) {
      searchMediaInMedia({
        ...mediaList.Filter,
        PageNumber: mediaList.Filter.PageNumber + 1,
      });
    }
  };

  const renderIncludedMediaList = () => {
    const hasMoreItems =
      mediaList && mediaList?.TotalCount > mediaList?.Entities?.length;
    const isOnFirstPage = mediaList?.Filter?.PageNumber === 1;
    const isOnNextPage =
      mediaList?.Filter?.PageNumber && mediaList?.Filter?.PageNumber > 1;
    const includedMedia: IListComponentModel = {
      CellType: CellType.Frame,
      ComponentTypeCode: ComponentType.List,
      Orientation: Orientation.Grid,
      MediaList: mediaList?.Entities,
    };

    return (
      <div className="PackageDetails__list-container">
        <p className="PackageDetails__list--title">
          {t("AVAILABLE_IN_PACKAGE", "Available in a package")}
        </p>
        <GridComponent
          component={includedMedia}
          rows={isOnFirstPage && mediaList.IsLoading ? 3 : 0}
          loading={isOnFirstPage && mediaList.IsLoading}
        />

        {hasMoreItems && (
          <div className="SearchScreen__loader">
            {mediaList?.IsLoading && isOnNextPage ? (
              <LoaderSpinner />
            ) : (
              <MediaButton
                icon={<ChevronDown />}
                iconElevated={true}
                variant={MediaButtonVariant.Transparent}
                onClick={getMore}
              >
                {t("COMMON__BUTTON_MORE")}
              </MediaButton>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <MediaDetailsScreen>
      {media && (
        <>
          <div className="PackageDetails__info-container">
            <div className="PackageDetails__info">
              <div className="PackageDetails__type">
                {media.MediaTypeDisplayName}
              </div>
              <div className="PackageDetails__title">{media.Title}</div>

              <div className="PackageDetails__actions">
                <PlayButton media={media} />
              </div>
            </div>
          </div>
          <div
            className="PackageDetails__description"
            dangerouslySetInnerHTML={{
              __html: media.LongDescription || "",
            }}
          ></div>

          {renderIncludedMediaList()}
        </>
      )}
    </MediaDetailsScreen>
  );
};
