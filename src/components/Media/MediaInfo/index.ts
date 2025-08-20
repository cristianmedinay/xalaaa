/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAppState, MediaHelper } from "@xala/common";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

import {
  MediaInfo as MediaInfoDefinition,
  MediaInfoDispatchProps,
  MediaInfoOwnProps,
  MediaInfoStateProps,
} from "./MediaInfo";

const mapStateToProps = (state: IAppState, props: MediaInfoOwnProps) => {
  return {
    isProductOwnByUser: MediaHelper.isUserOwnMedia(
      state.auth.user,
      props.media
    ),
  };
};

export const MediaInfo = connect<
  MediaInfoStateProps,
  MediaInfoDispatchProps,
  MediaInfoOwnProps,
  IAppState
>(mapStateToProps)(withTranslation()(MediaInfoDefinition));
