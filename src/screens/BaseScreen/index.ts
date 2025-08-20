/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAppState } from "@xala/common";
import { connect } from "react-redux";

import { BaseScreen as BaseScreenDefinition } from "./BaseScreen";

const mapStateToProps = (state: IAppState) => {
  return {
    mediaList: state.media.mediaList || {},
  };
};

export const BaseScreen = connect(mapStateToProps)(BaseScreenDefinition);
