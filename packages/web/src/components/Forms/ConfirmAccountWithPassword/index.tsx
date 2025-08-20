/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  AuthStore,
  IAppState,
  IConfirmAccountWithPasswordModel,
  ROUTES,
} from "@xala/common";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ConfirmAccountWithPassword as ConfirmAccountWithPasswordPresentational } from "./ConfirmAccountWithPassword";

const mapStateToProps = (state: IAppState) => {
  return {
    authState: state.auth,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: (data: IConfirmAccountWithPasswordModel) => {
    return dispatch(
      AuthStore.Actions.registerConfirmAccountWithPassword(data, ROUTES.HOME)
    );
  },
  onValidate: (token: string) => {
    return dispatch(AuthStore.Actions.validateToken(token));
  },
});

export const ConfirmAccountWithPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ConfirmAccountWithPasswordPresentational));
