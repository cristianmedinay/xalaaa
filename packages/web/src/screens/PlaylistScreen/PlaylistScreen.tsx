/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  CellType,
  ComponentType,
  IConfigurationModel,
  IMediaListModel,
  MediaStore,
  Orientation,
  UrlHelper,
} from "@xala/common";
import React from "react";
import isEqual from "react-fast-compare";
import { WithTranslation } from "react-i18next";
import { RouteComponentProps } from "react-router";
import { ActionCreator } from "redux";

import { MediaButtonVariant } from "enums";

import {
  AppFooter,
  AppHeader,
  GridComponent,
  LoaderSpinner,
  MediaButton,
  PageHeader,
} from "components";
import ChevronDown from "../../resources/icons/chevron-down.svg";

import "./PlaylistScreen.scss";

export interface IPlaylistScreenStateProps {
  configuration?: IConfigurationModel;
  mediaList: IMediaListModel;
}

export interface IPlaylistScreenDispatchProps {
  getMediaListFromCache: ActionCreator<MediaStore.Types.IGetMediaListFromCacheAction>;
  getMediaList: ActionCreator<MediaStore.Types.IGetMediaListAction>;
}

export type IPlaylistScreenOwnProps = RouteComponentProps<{
  id: string;
  title: string;
}>;

export interface IPlaylistScreenProps
  extends IPlaylistScreenStateProps,
    IPlaylistScreenDispatchProps,
    IPlaylistScreenOwnProps,
    WithTranslation {}

interface PlayListScreenQueryParams {
  category?: string;
}

export class PlaylistScreen extends React.Component<IPlaylistScreenProps> {
  componentDidMount() {
    const { getMediaListFromCache, match } = this.props;
    const query = UrlHelper.parse(location.search) as PlayListScreenQueryParams;

    getMediaListFromCache({
      Categories: query.category ? [parseInt(query.category)] : undefined,
      MediaListId: +match.params.id,
      PageSize: 12,
      PageNumber: 1,
      IncludeCount: true,
    });
  }

  componentDidUpdate(prevProps: IPlaylistScreenProps) {
    const { getMediaList, match, location } = this.props;
    const prevQuery = UrlHelper.parse(
      prevProps.location.search
    ) as PlayListScreenQueryParams;
    const query = UrlHelper.parse(location.search) as PlayListScreenQueryParams;

    if (prevQuery.category !== query.category) {
      getMediaList({
        Categories: query.category ? [parseInt(query.category)] : undefined,
        MediaListId: +match.params.id,
        PageSize: 12,
        PageNumber: 1,
      });
    }
  }

  public shouldComponentUpdate = (nextProps: IPlaylistScreenProps) => {
    return !isEqual(nextProps, this.props);
  };

  getMore = () => {
    const { getMediaList, mediaList } = this.props;

    if (mediaList.Filter?.PageNumber) {
      getMediaList({
        ...mediaList.Filter,
        PageSize: 12,
        PageNumber: mediaList.Filter.PageNumber + 1,
      });
    }
  };

  render() {
    const { configuration, match, mediaList, t } = this.props;

    const hasMoreItems = mediaList?.TotalCount > mediaList?.Entities?.length;
    const isOnFirstPage =
      !mediaList?.Filter?.PageNumber || mediaList?.Filter?.PageNumber === 1;
    const isOnNextPage =
      mediaList?.Filter?.PageNumber && mediaList?.Filter?.PageNumber > 1;

    return (
      <div className="PlaylistScreen">
        <AppHeader configuration={configuration} />
        <section>
          <PageHeader title={match.params.title} />

          {mediaList.IsLoading && isOnFirstPage ? (
            <div className="PlaylistScreen__loader">
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
                  MediaList: mediaList.Entities,
                }}
              />

              {hasMoreItems && (
                <div className="PlaylistScreen__loader">
                  {mediaList?.IsLoading && isOnNextPage ? (
                    <LoaderSpinner width={75} height={75} />
                  ) : (
                    <MediaButton
                      icon={<ChevronDown />}
                      iconElevated
                      variant={MediaButtonVariant.Transparent}
                      onClick={this.getMore}
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
  }
}
