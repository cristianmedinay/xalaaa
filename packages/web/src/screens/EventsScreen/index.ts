/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAppState, IMediaSearchFilterModel, MediaStore } from "@xala/common";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
  Events as EventsScreenDefinition,
  IEventsScreenDispatchProps,
  IEventsScreenOwnProps,
  IEventsScreenStateProps,
} from "./Events";

const mapStateToProps = (state: IAppState) => {
  const mediaListId = MediaStore.Consts.MEDIA_LIST_SEARCH_KEY;

  return {
    configuration: state.configuration.configuration,
    eventsList: state.media.mediaList[mediaListId] || {},
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  searchMedia: (filter: IMediaSearchFilterModel) => {
    return dispatch(
      MediaStore.Actions.searchMedia({
        IncludeCategories: true,
        IncludeImages: true,
        PageSize: 12,
        ...filter,
      })
    );
  },
});

export const Events = connect<
  IEventsScreenStateProps,
  IEventsScreenDispatchProps,
  IEventsScreenOwnProps,
  IAppState
>(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(EventsScreenDefinition));
