/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAppState } from "@xala/common";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { CustomScreen as CustomScreenDefinition } from "./CustomScreen";

const mapStateToProps = (state: IAppState) => {
  return {
    configuration: state.configuration.configuration,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeRoute: (route: string) => dispatch(push(route)),
});

export const CustomScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomScreenDefinition);
