/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAppState, IMediaListOptionsModel, MediaStore } from "@xala/common";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
  IPlaylistScreenDispatchProps,
  IPlaylistScreenOwnProps,
  IPlaylistScreenStateProps,
  PlaylistScreen as PlaylistScreenDefinition,
} from "./PlaylistScreen";

const mapStateToProps = (state: IAppState, props: IPlaylistScreenOwnProps) => {
  const mediaListId = props.match.params.id ?? -1;

  return {
    configuration: state.configuration.configuration,
    mediaList: state.media.mediaList[mediaListId] || {},
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getMediaListFromCache: (filter: IMediaListOptionsModel) => {
    return dispatch(
      MediaStore.Actions.getMediaListFromCache({
        ...filter,
        IncludeCategories: true,
        IncludeImages: true,
        IncludeMedia: false,
      })
    );
  },
  getMediaList: (filter: IMediaListOptionsModel) => {
    return dispatch(
      MediaStore.Actions.getMediaList({
        ...filter,
        IncludeCategories: true,
        IncludeImages: true,
        IncludeMedia: false,
      })
    );
  },
});

export const PlaylistScreen = connect<
  IPlaylistScreenStateProps,
  IPlaylistScreenDispatchProps,
  IPlaylistScreenOwnProps,
  IAppState
>(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(PlaylistScreenDefinition));
