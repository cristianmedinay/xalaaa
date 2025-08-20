/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAppState, MediaStore } from "@xala/common";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
  GridComponent as GridComponentDefinition,
  IGridComponentDispatchProps,
  IGridComponentOwnProps,
  IGridComponentStateProps,
} from "./GridComponent";

const mapStateToProps = (state: IAppState, props: IGridComponentOwnProps) => {
  return {
    source: props.component.SourceId
      ? state.media.mediaList?.[props.component.SourceId]
      : undefined,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getDataSource: (sourceId: number) => {
    return dispatch(
      MediaStore.Actions.getMediaListFromCache({
        MediaListId: sourceId,
        IncludeCategories: false,
        IncludeImages: true,
        IncludeMedia: false,
        PageSize: 12,
        PageNumber: 1,
      })
    );
  },
  getDataSourceCancel: () => dispatch({ type: "nothing" }),
  //getDataSourceCancel: () => dispatch(ConfigurationModule.Store.Actions.getDataSourceCancel()),
});

export const GridComponent = connect<
  IGridComponentStateProps,
  IGridComponentDispatchProps,
  IGridComponentOwnProps,
  IAppState
>(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(GridComponentDefinition));
