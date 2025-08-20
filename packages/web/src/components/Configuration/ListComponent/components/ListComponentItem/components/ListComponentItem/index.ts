/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAppState, MediaHelper } from "@xala/common";
import { connect } from "react-redux";

import { IListComponentItemProps } from "../../models";

import { ListComponentItem as ListComponentItemDefinition } from "./ListComponentItem";

const mapStateToProps = (
  state: IAppState,
  ownProps: IListComponentItemProps
) => {
  return {
    isProductOwnByUser: MediaHelper.isUserOwnMedia(
      state.auth.user,
      ownProps.media
    ),
  };
};

export const ListComponentItem = connect(mapStateToProps)(
  ListComponentItemDefinition
);
