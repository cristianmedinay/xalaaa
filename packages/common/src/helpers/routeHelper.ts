/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { goBack, push, replace } from "connected-react-router";
import { LocationDescriptorObject } from "history";
import { match as RouterMatch } from "react-router";

import { ROUTES } from "../constants";
import { ActionType, MediaStreamType, MediaType, ScreenType } from "../enums";
import { IMediaModel, RouterState } from "../models";
import { AudioStore, dispatch } from "../store";

import { TimeHelper } from "./timeHelper";
import { UrlHelper } from "./url.helper";

const createRouteState = (obj: any = {}) => ({
  from: window.location?.pathname,
  ...obj,
});

export class RouteHelper {
  static getDetailsPath(media: IMediaModel) {
    let path: string;
    switch (media.MediaTypeCode) {
      case MediaType.Series:
        path = `${ROUTES.SERIES_DETAILS_SCREEN}/${media.Id}`;
        break;
      case MediaType.Package:
        path = `${ROUTES.PACKAGE_DETAILS_SCREEN}/${media.Id}`;
        break;
      case MediaType.Article:
        path = `${ROUTES.ARTICLE_SCREEN}/${media.Id}`;
        break;
      case MediaType.Channel:
        path = `${ROUTES.CHANNEL_DETAILS_SCREEN}/${media.Id}`;
        break;
      case MediaType.Season:
        path =
          media.ParentMediaTypeCode === MediaType.Album
            ? `${ROUTES.ALBUM_DETAILS_SCREEN}/${media.ParentMediaId}`
            : `${ROUTES.SERIES_DETAILS_SCREEN}/${media.ParentMediaId}`;
        break;
      case MediaType.Album:
        path = `${ROUTES.ALBUM_DETAILS_SCREEN}/${media.Id}`;
        break;
      default:
        path = `${ROUTES.MOVIE_DETAILS_SCREEN}/${media.Id}`;
        break;
    }

    return path;
  }

  static goTo(path: string, replaceRoute?: boolean) {
    dispatch(
      replaceRoute
        ? replace(path, createRouteState())
        : push(path, createRouteState())
    );
  }

  static goToDetails(media?: IMediaModel, replaceRoute?: boolean): void {
    if (!media) {
      return;
    }

    let path = "";
    let queryParams: { [key: string]: string | number | boolean } = {};

    if (media.Action) {
      switch (media.Action.ActionType) {
        case ActionType.OpenScreen:
          if (
            media.Action.ScreenTypeCode &&
            media.Action.ScreenTypeCode !== ScreenType.Custom
          ) {
            path = `/${media.Action.ScreenTypeCode.toLowerCase().replace(
              "_",
              "-"
            )}`;

            if (media.Action.ScreenId) {
              path += `/${media.Action.ScreenId}`;
            }
          } else {
            path = `/${media.Action.ScreenId}`;
          }

          if (media.Action.QueryParams) {
            queryParams = {
              ...queryParams,
              ...media.Action.QueryParams,
            };
          }

          break;
      }
    } else {
      path = RouteHelper.getDetailsPath(media);
    }

    const location: LocationDescriptorObject = {
      pathname: path,
      state: createRouteState({
        media,
      }),
    };

    location.search = UrlHelper.stringify(queryParams);

    dispatch(replaceRoute ? replace(location) : push(location));
  }

  static goToPlayer(
    media: IMediaModel,
    replaceRoute?: boolean,
    queryParams?: { [key: string]: string | number | boolean }
  ): void {
    let params: { [key: string]: string | number | boolean } = {
      ...queryParams,
    };

    if (media.Action?.QueryParams) {
      params = {
        ...params,
        ...media.Action.QueryParams,
      };
    }

    const location: LocationDescriptorObject = {
      pathname: `${ROUTES.PLAYER_SCREEN}/${media.Id}`,
    };

    location.search = UrlHelper.stringify(params);
    dispatch(AudioStore.Actions.resetStore());
    dispatch(replaceRoute ? replace(location) : push(location));
  }

  static goToTrial(mediaId: number, replaceRoute?: boolean): void {
    const path = UrlHelper.parametrize(`${ROUTES.PLAYER_SCREEN}/${mediaId}`, {
      streamType: MediaStreamType.Trial,
    });
    dispatch(
      replaceRoute
        ? replace(path, createRouteState())
        : push(path, createRouteState())
    );
  }

  static goToChannel(media: IMediaModel, replaceRoute?: boolean): void {
    if (!media) {
      return;
    }
    const path = `${ROUTES.CHANNEL_DETAILS_SCREEN}/${media.Id}`;
    dispatch(replaceRoute ? replace(path) : push(path));
  }

  static goToReadMore(
    media: IMediaModel | undefined,
    replaceRoute?: boolean
  ): void {
    if (!media) {
      return;
    }
    const path = `${ROUTES.READ_MORE_SCREEN}/${media?.Id}`;
    dispatch(
      replaceRoute
        ? replace(path, createRouteState())
        : push(path, createRouteState())
    );
  }

  static goToBuyAsset(mediaId: number, replaceRoute?: boolean): void {
    const path = `${ROUTES.BUY_SCREEN}/${mediaId}`;
    dispatch(
      replaceRoute
        ? replace(path, createRouteState())
        : push(path, createRouteState())
    );
  }

  static goToLogin(replaceRoute?: boolean): void {
    const path = `${ROUTES.LOGIN}`;
    const state = new RouterState(
      window.location?.pathname + window.location.search
    );
    dispatch(
      replaceRoute
        ? replace(path, createRouteState(state))
        : push(path, createRouteState(state))
    );
  }

  static goToRegister(replaceRoute?: boolean): void {
    const path = `${ROUTES.REGISTER}`;
    const state = createRouteState();
    dispatch(replaceRoute ? replace(path, state) : push(path, state));
  }

  static goToSettings(submenuKey?: string, replaceRoute?: boolean): void {
    const path = `${ROUTES.SETTINGS_SCREEN}/${submenuKey}`;
    dispatch(
      replaceRoute
        ? replace(path, createRouteState())
        : push(path, createRouteState())
    );
  }

  static goToProfile(): void {
    const path = `${ROUTES.PROFILE_DETAILS_SCREEN}`;
    dispatch(push(path));
  }

  static goToEditPersonalData(): void {
    const path = `${ROUTES.PROFILE_DETAILS_SCREEN}/${ROUTES.EDIT_PERSONAL_DATA}`;
    dispatch(push(path));
  }

  static goToEditFavoriteContents(): void {
    const path = `${ROUTES.PROFILE_DETAILS_SCREEN}/${ROUTES.EDIT_FAVORITE_CONTENTS}`;
    dispatch(push(path));
  }

  static goToHome(submenuKey?: string, replaceRoute?: boolean): void {
    let path = `${ROUTES.HOME}`;

    if (submenuKey) {
      path = `${path}/${submenuKey}`;
    }

    dispatch(
      replaceRoute
        ? replace(path, createRouteState())
        : push(path, createRouteState())
    );
  }

  static goToMyList(replaceRoute?: boolean): void {
    const path = `${ROUTES.MY_LIST_SCREEN}`;
    dispatch(replaceRoute ? replace(path) : push(path));
  }

  static goToPlaylist(
    sourceId: number,
    title: string,
    replaceRoute?: boolean
  ): void {
    const path = `${ROUTES.PLAYLIST_SCREEN}/${sourceId}/${title}`;

    dispatch(replaceRoute ? replace(path) : push(path));
  }

  static getScreenRouteKey(match: RouterMatch): string | undefined {
    if (match.url.length > 0) {
      const pathSegments = match.url.slice(1).split("/");

      if (pathSegments.length > 0) {
        return pathSegments[0].toLowerCase().replace(/ |-/g, "-");
      }
    }

    return undefined;
  }

  static goBack() {
    dispatch(goBack());
  }

  static goToPath(path: string, replaceRoute?: boolean): void {
    dispatch(replaceRoute ? replace(path) : push(path));
  }

  static compareTwoKeys(
    keyOne: string | undefined,
    keyTwo: string | undefined
  ): boolean {
    return (
      keyOne?.toLowerCase().replace(/ |-/g, "_") ===
      keyTwo?.toLowerCase().replace(/ |-/g, "_")
    );
  }

  static handleClickFromListComponentItem(media: IMediaModel) {
    if (
      media.MediaTypeCode === MediaType.Program &&
      TimeHelper.isBeforeCurrent(media?.StartDateTime)
    ) {
      return this.goToPlayer(media);
    }

    return this.goToDetails(media);
  }
}
