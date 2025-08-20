/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  CellType,
  ComponentType,
  ConfigurationHelper,
  IAppState,
  IConfigurationModel,
  IErrorModel,
  IMediaListOptionsModel,
  IMediaListStateModel,
  IScreenModel,
  MediaStore,
  Orientation,
  RouteHelper,
  ScreenType,
  UrlHelper,
  useDataLoader,
} from "@xala/common";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useLocation, useRouteMatch } from "react-router";

import {
  AppFooter,
  AppHeader,
  GridComponent,
  LoaderSpinner,
  MediaButton,
  PageHeader,
} from "components";
import { MediaButtonVariant } from "enums";
import ChevronDown from "resources/icons/chevron-down.svg";

import { CategoryPicker } from "./CategoryPicker";
import "./MyListScreen.scss";

interface MyListScreenQueryParams {
  category?: string;
}

export type IMyListScreenProps = RouteComponentProps<{
  id?: string;
}>;

export const MyListScreen: React.FC<IMyListScreenProps> = React.memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();

  const mediaList = useSelector<IAppState, IMediaListStateModel | undefined>(
    (state) => state.media.mediaList
  );
  const configuration = useSelector<IAppState, IConfigurationModel | undefined>(
    (state) => state.configuration.configuration
  );
  const match = useRouteMatch();
  const screenKey = RouteHelper.getScreenRouteKey(match);
  const [listId, setListId] = useState<number | null>(null);
  const [prevQuery, setPrevQuery] = useState<MyListScreenQueryParams>({});

  const isOnFirstPage =
    (listId !== null && !mediaList?.[listId]?.Filter?.PageNumber) ||
    (listId !== null && mediaList?.[listId]?.Filter?.PageNumber === 1);
  const hasMoreItems =
    listId !== null &&
    mediaList &&
    mediaList?.[listId]?.TotalCount > mediaList?.[listId]?.Entities?.length;
  const isOnNextPage =
    listId !== null &&
    mediaList?.[listId]?.Filter?.PageNumber &&
    Number(mediaList?.[listId]?.Filter?.PageNumber) > 1;

  const screenLoader = useDataLoader<IScreenModel | undefined, IErrorModel>({
    loader: () => {
      if (!screenKey) return Promise.reject({ ok: false, error: {} });

      const screenData = ConfigurationHelper.getScreenByRouteKey(
        configuration,
        ScreenType.MyList
      );

      if (!screenData) return Promise.reject({ ok: false, error: {} });

      setListId(screenData.Components?.[0]?.SourceId || null);

      return Promise.resolve({ ok: true, data: screenData, error: {} });
    },
    deps: [screenKey],
  });

  useEffect(() => {
    getMediaList();
  }, [listId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (listId === null) return;

    const query = UrlHelper.parse(location.search) as MyListScreenQueryParams;
    const isQueryTheSame = query.category === prevQuery.category;
    if (isQueryTheSame) return;

    const categoryId =
      query.category && +query.category ? [+query.category] : undefined;

    getMediaList({ MediaListId: listId, Categories: categoryId });
    setPrevQuery(query);
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadingState = useMemo(() => {
    return (
      screenLoader.loading ||
      (listId !== null && mediaList?.[listId]?.IsLoading)
    );
  }, [screenLoader, listId, location, mediaList?.IsLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  const getMediaList = (payload?: IMediaListOptionsModel) => {
    if (listId === null) return;

    dispatch(
      MediaStore.Actions.getMediaList({
        MediaListId: listId,
        IncludeCategories: true,
        IncludeImages: true,
        IncludeCount: true,
        PageSize: 12,
        Categories: undefined,
        IncludeAllPagesCategories: true,
        PageNumber: 1,
        ...payload,
      })
    );
  };

  const getMore = () => {
    if (listId === null) return;
    const list = mediaList?.[listId];

    if (list?.Filter?.PageNumber) {
      getMediaList({
        MediaListId: listId,
        PageNumber: list.Filter.PageNumber + 1,
      });
    }
  };

  return (
    <div className="MyListScreen">
      <AppHeader configuration={configuration} />
      <section>
        <PageHeader title={t("COMMON__MY_LIST")} />

        <CategoryPicker listId={listId} />

        {loadingState && isOnFirstPage && listId !== null ? (
          <div className="MyListScreen__loader">
            <LoaderSpinner width={75} height={75} />
          </div>
        ) : (
          <>
            <GridComponent
              rows={0}
              component={{
                ComponentTypeCode: ComponentType.List,
                CellType: CellType.Frame,
                Orientation: Orientation.Grid,
                MediaList: listId ? mediaList?.[listId]?.Entities : undefined,
              }}
            />

            {hasMoreItems && (
              <div className="MyListScreen__loader">
                {loadingState && isOnNextPage ? (
                  <LoaderSpinner width={75} height={75} />
                ) : (
                  <MediaButton
                    icon={<ChevronDown />}
                    iconElevated
                    variant={MediaButtonVariant.Transparent}
                    onClick={getMore}
                  >
                    {t("COMMON__BUTTON_MORE", "Show more")}
                  </MediaButton>
                )}
              </div>
            )}
          </>
        )}
      </section>
      <AppFooter />
    </div>
  );
});
