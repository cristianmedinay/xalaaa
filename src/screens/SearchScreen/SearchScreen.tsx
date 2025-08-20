/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  CellType,
  ComponentType,
  IAppState,
  IConfigurationModel,
  IMediaListModel,
  IMediaSearchFilterModel,
  MediaStore,
  MIN_SEARCH_LENGTH,
  Orientation,
  UrlHelper,
} from "@xala/common";
import { debounce } from "debounce";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { MediaButtonVariant } from "enums";
import ChevronDown from "resources/icons/chevron-down.svg";

import {
  AppFooter,
  AppHeader,
  GridComponent,
  LoaderSpinner,
  MediaButton,
  MediaCategoryDrawer,
  PageHeader,
} from "../../components";

import "./SearchScreen.scss";

interface SearchScreenQueryParams {
  category?: string;
  query?: string;
}

const MEDIA_LIST_SEARCH = MediaStore.Consts.MEDIA_LIST_SEARCH_KEY;
const SEARCH_PAGE_SIZE = 12;

export const SearchScreen = () => {
  const previousParams = useRef(
    UrlHelper.parse(location.search) as SearchScreenQueryParams
  );

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const mediaList = useSelector<IAppState, IMediaListModel | undefined>(
    (state) => state.media.mediaList[MEDIA_LIST_SEARCH] || {}
  );

  const configuration = useSelector<IAppState, IConfigurationModel | undefined>(
    (state) => state.configuration.configuration
  );

  const currentParams = useMemo(() => {
    return UrlHelper.parse(location.search) as SearchScreenQueryParams;
  }, [location.search]);

  const basePayload: IMediaSearchFilterModel = useMemo(() => {
    const payload: IMediaSearchFilterModel = {
      ...mediaList?.Filter,
      IncludeCategories: true,
      IncludeImages: true,
      IncludeAllPagesCategories: true,
      FullTextSearch: "",
      PageSize: SEARCH_PAGE_SIZE,

      PageNumber: 1,
    };

    return payload;
  }, [mediaList]);

  useEffect(() => {
    dispatch(MediaStore.Actions.searchMedia(basePayload));
  }, []);

  const debouncedSearchMedia = useCallback(
    debounce((payload?: IMediaSearchFilterModel) => {
      if (!payload) {
        return;
      }

      dispatch(MediaStore.Actions.searchMedia(payload));
    }, 200),
    [mediaList]
  );

  useEffect(() => {
    const hasQueryChanged =
      currentParams.query !== previousParams.current.query;

    const payload = {
      ...basePayload,
      IncludeAllPagesCategories: hasQueryChanged,
      FullTextSearch: currentParams.query,
      Categories: currentParams.category
        ? [parseInt(currentParams.category)]
        : undefined,
    };

    const hasCategoryChanged =
      currentParams.category !== previousParams.current.category;

    if (hasCategoryChanged) {
      dispatch(MediaStore.Actions.searchMedia(payload));
    }

    const isQueryEmpty = !currentParams.query;
    const shouldBeginSearch =
      currentParams.query && currentParams.query.length >= MIN_SEARCH_LENGTH;

    if (hasQueryChanged && (isQueryEmpty || shouldBeginSearch)) {
      debouncedSearchMedia(payload);
    }

    return () => {
      previousParams.current = {
        category: currentParams.category,
        query: currentParams.query,
      };
    };
  }, [currentParams, basePayload]);

  const getMore = useCallback(() => {
    if (!mediaList?.Filter?.PageNumber) {
      return;
    }

    dispatch(
      MediaStore.Actions.searchMedia({
        ...basePayload,
        IncludeAllPagesCategories: false,
        FullTextSearch: currentParams.query,
        Categories: currentParams.category
          ? [parseInt(currentParams.category)]
          : undefined,
        PageNumber: mediaList.Filter.PageNumber + 1,
      })
    );
  }, [dispatch, mediaList, basePayload, currentParams]);

  const hasMoreItems =
    mediaList && mediaList?.TotalCount > mediaList?.Entities?.length;
  const isOnFirstPage =
    !mediaList?.Filter?.PageNumber || mediaList?.Filter?.PageNumber === 1;
  const isOnNextPage =
    mediaList?.Filter?.PageNumber && mediaList?.Filter?.PageNumber > 1;

  const renderContent = useMemo(() => {
    if (!mediaList) {
      return null;
    }

    if (mediaList.TotalCount < 1) {
      return (
        <div>
          <h2 className="SearchScreen__no-data">
            {t("SEARCH__NO_RESULTS_MESSAGE")}
          </h2>
        </div>
      );
    }

    return mediaList.IsLoading && isOnFirstPage ? (
      <div className="SearchScreen__loader">
        <LoaderSpinner width={150} height={150} />
      </div>
    ) : (
      <>
        <GridComponent
          rows={0}
          component={{
            ComponentTypeCode: ComponentType.List,
            CellType: CellType.Frame,
            Orientation: Orientation.Grid,
            MediaList: mediaList.Entities,
          }}
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
                {t("COMMON__BUTTON_MORE", "Show more")}
              </MediaButton>
            )}
          </div>
        )}
      </>
    );
  }, [getMore, hasMoreItems, isOnFirstPage, isOnNextPage, mediaList, t]);

  return (
    <div className="SearchScreen">
      <AppHeader configuration={configuration} />

      <section>
        <PageHeader title={t("SEARCH__HEADER", "Search results")} />

        <MediaCategoryDrawer />

        {renderContent}
      </section>

      <AppFooter />
    </div>
  );
};
