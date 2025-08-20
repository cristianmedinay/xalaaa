/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  IAppState,
  IUserConsentModel,
  UserStore,
  withAuth,
} from "@xala/common";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
  ISettingsTermsDispatchProps,
  ISettingsTermsOwnProps,
  ISettingsTermsStateProps,
  SettingsTerms as SettingsTermsDefinition,
} from "./SettingsTerms";

const mapStateToProps = (state: IAppState) => {
  return {
    action: state.user.action,
    profile: state.user.profile,
    consents: state.user.consents,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getProfile: () => {
    return dispatch(UserStore.Actions.getProfile());
  },
  getConsents: () => {
    return dispatch(UserStore.Actions.getUserConsents());
  },
  updateConsent: (data: IUserConsentModel) => {
    return dispatch(UserStore.Actions.updateUserConsent(data));
  },
});

export const SettingsTerms = connect<
  ISettingsTermsStateProps,
  ISettingsTermsDispatchProps,
  ISettingsTermsOwnProps,
  IAppState
>(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(withAuth(SettingsTermsDefinition)));
