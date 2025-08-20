/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import loadable from "@loadable/component";
import {
  CellType,
  IAppState,
  IListComponentModel,
  IMediaListModel,
  MediaListType,
  MediaStore,
  ROUTES,
  SourceType,
  ThemeContext,
} from "@xala/common";
import cx from "classnames";
import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { InView } from "react-intersection-observer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { useListItemCount } from "hooks";

import { LoaderSpinner } from "../../../..";
import RightArrowIcon from "../../../../../resources/icons/right-arrow.svg";
import { IListComponentProps } from "../../types";
import { ListComponentArrow } from "../ListComponentArrow";
import { ListComponentItem } from "../ListComponentItem";

import "./ListComponentHorizontal.scss";

const Slider = loadable(() => import("react-slick"));

const useSourceSelector = (
  component: IListComponentModel,
  isChannelContent: boolean
): IMediaListModel | undefined => {
  const { SourceId } = component;

  const mediaList = useSelector(
    (state: IAppState) =>
      isChannelContent
        ? state.media.channelList
        : SourceId
        ? state.media.mediaList[SourceId as number]
        : undefined,
    shallowEqual
  );

  if (component.MediaList) {
    return {
      SourceType: SourceType.MediaList,
      Entities: component.MediaList,
      TotalCount: component.MediaList.length,
    };
  }

  return mediaList;
};

const useGetMediaList = () => {
  const dispatch = useDispatch();
  const getMediaList = useCallback(
    (options: IListComponentModel) => {
      dispatch(
        MediaStore.Actions.getMediaListFromCache({
          MediaListId: options.SourceId!,
          Type:
            options.SourceType === SourceType.MyList
              ? MediaListType.MyList
              : undefined,
          IncludeCategories: true,
          IncludeImages: true,
          IncludeMedia: false,
          IncludeCount: true,
          PageNumber: 1,
          PageSize: options.CellType === CellType.Round ? 999 : 12,
        })
      );
    },
    [dispatch]
  );

  return getMediaList;
};

const useChannelsForUser = () => {
  const dispatch = useDispatch();
  const getChannelsForUser = useCallback(() => {
    dispatch(MediaStore.Actions.getMediaChannelsForUser());
  }, [dispatch]);

  return getChannelsForUser;
};

export interface IListComponentHorizontalProps extends IListComponentProps {
  className?: string;
  placeholder?: React.ReactElement;
}

export const ListComponentHorizontal = ({
  className,
  component,
  loading: isLoading,
  placeholder,
  ready = true,
  readOnly,
}: IListComponentHorizontalProps) => {
  const isChannelContent = Boolean(
    component.CellType &&
      [CellType.Channel, CellType.Round].includes(component.CellType)
  );

  const { themeProvider } = useContext(ThemeContext);
  const { t } = useTranslation();
  const source = useSourceSelector(component, isChannelContent);
  const itemCount = useListItemCount(component);
  const slidesToScroll = Math.floor(itemCount);
  const getMediaList = useGetMediaList();
  const getChannelsForUser = useChannelsForUser();
  const skeletonColor = themeProvider.getColor("AppCellsBackgroundColor");

  const listClassName = cx(`ListComponentHorizontal`, className);
  const isListNotEmpty = source?.Entities
    ? source?.Entities?.length > 0
    : false;
  const hasMoreItemToDisplay = source?.Entities
    ? source?.Entities?.length > itemCount
    : false;

  const isListLoading = source?.IsLoading || isLoading;

  useEffect(() => {
    if (getChannelsForUser && isChannelContent && !isListLoading) {
      getChannelsForUser();
    }
  }, [component, getChannelsForUser, isChannelContent]);

  const inViewGetMediaList = useCallback(
    (inView: boolean) => {
      if (inView && component.SourceId && getMediaList) {
        getMediaList(component);
      }
    },
    [component.SourceId, getMediaList]
  );

  const renderItems = useMemo(() => {
    if (source && ready && isListNotEmpty && !isListLoading) {
      const isLandscape = component.CellType === CellType.Landscape;

      const filterSource = isLandscape
        ? source.Entities.slice(0, 1)
        : source.Entities;

      return filterSource.map((media) => (
        <ListComponentItem
          key={`${media.Id}`}
          cellType={component.CellType}
          media={media}
          isPlaceholder={false}
          readOnly={readOnly}
          withProgress={component.Title === "Recently watched"} // FIXME temporary for demo only
          style={{
            fontSize: `${
              themeProvider.getFontSize() *
              themeProvider.getListItemCountFactor(itemCount)
            }px`,
          }}
        />
      ));
    }
    return (
      placeholder ||
      Array(Math.round(itemCount))
        .fill(undefined)
        .map((_, idx) => (
          <ListComponentItem
            key={`placeholder_${idx}`}
            cellType={component.CellType}
            isPlaceholder
          />
        ))
    );
  }, [source, ready, isListNotEmpty, isListLoading]);

  const renderHeader = useMemo(() => {
    const title = t(component.TitleTranslationKey || "", component.Title);
    const hasRedirectLink = !readOnly && component.SourceId;

    if (title || component.SourceId) {
      return (
        <SkeletonTheme color={skeletonColor} highlightColor={skeletonColor}>
          <header className="ListComponentHorizontal-title-container">
            <p className="ListComponentHorizontal-title">
              {ready && isListNotEmpty && !isListLoading ? (
                title
              ) : (
                <Skeleton width="25rem" />
              )}
            </p>

            {ready &&
            isListNotEmpty &&
            !isListLoading &&
            hasMoreItemToDisplay &&
            hasRedirectLink ? (
              <Link
                className="ListComponentHorizontal-see-all"
                to={`${ROUTES.PLAYLIST_SCREEN}/${component.SourceId}/${component.Title}`}
                aria-label={`${title} - ${t("LIST__SEE_ALL", "See all")}`}
              >
                <span>{t("LIST__SEE_ALL", "See all")}</span>
                <RightArrowIcon />
              </Link>
            ) : !ready ? (
              hasRedirectLink && (
                <p className="ListComponentHorizontal-title">
                  <Skeleton width="8rem" />
                </p>
              )
            ) : null}
          </header>
        </SkeletonTheme>
      );
    }
  }, [
    component,
    readOnly,
    isListNotEmpty,
    ready,
    isListLoading,
    t,
    skeletonColor,
  ]);

  const renderContent = useCallback(() => {
    if (source && !isListLoading && source.Entities.length < 1) {
      return;
    }

    const hasEntities = source && source.Entities.length > 0;
    const hasSourceId = !!component.SourceId;

    if (!hasEntities && !hasSourceId) {
      return null;
    }

    let headerVisible = true;

    switch (component.CellType) {
      case CellType.Highlights:
      case CellType.Landscape:
      case CellType.Promo:
        headerVisible = false;
        break;
    }

    return (
      <>
        {headerVisible && renderHeader}
        <div className="ListComponentHorizontal-container">
          <Slider
            slidesToShow={itemCount}
            slidesToScroll={slidesToScroll}
            infinite={component.CellType === CellType.Highlights}
            dots={component.CellType === CellType.Highlights}
            speed={500}
            draggable={false}
            arrows={component.CellType !== CellType.Highlights}
            nextArrow={
              <ListComponentArrow
                direction="right"
                containerStyle={{
                  background:
                    "linear-gradient(89.95deg, rgba(42, 47, 54, 0) 0.04%, var(--bg-color) 86.61%)",
                  justifyContent: "flex-end",
                }}
              />
            }
            prevArrow={
              <ListComponentArrow
                direction="left"
                containerStyle={{
                  background:
                    "linear-gradient(-89.95deg, rgba(42, 47, 54, 0) 0.04%, var(--bg-color) 86.61%)",
                  justifyContent: "flex-start",
                }}
              />
            }
            autoplay={component.CellType === CellType.Highlights}
            autoplaySpeed={5000}
          >
            {renderItems}
          </Slider>

          {isListLoading && (
            <div className="ListComponentHorizontal-loader">
              <LoaderSpinner width={50} height={50} />
            </div>
          )}
        </div>
      </>
    );
  }, [
    component,
    isListLoading,
    itemCount,
    renderHeader,
    renderItems,
    slidesToScroll,
    source,
  ]);

  return renderContent() ? (
    <InView
      as="div"
      id={`list-${component.Id}`}
      className={listClassName}
      rootMargin="25% 0px"
      triggerOnce
      onChange={inViewGetMediaList}
    >
      {renderContent()}
    </InView>
  ) : null;
};
