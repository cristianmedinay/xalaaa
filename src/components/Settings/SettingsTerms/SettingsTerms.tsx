/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  InfoDetailsScreenCode,
  IStateModel,
  IUserConsentModel,
  IUserModel,
  RouteHelper,
  UserStore,
  WithAuthProps,
} from "@xala/common";
import React from "react";
import { WithTranslation } from "react-i18next";
import { ActionCreator } from "redux";

import { Consent } from "../../Consent";
import { Message } from "../../Message";
import { Switch } from "../../Switch";

import "./SettingsTerms.scss";

export interface ISettingsTermsStateProps {
  action?: UserStore.Types.UserActionsTypes;
  profile: IStateModel<IUserModel>;
  consents: IStateModel<IUserConsentModel[]>;
}

export interface ISettingsTermsDispatchProps {
  getProfile: ActionCreator<UserStore.Types.IGetProfileAction>;
  getConsents: ActionCreator<UserStore.Types.IGetUserConsentsAction>;
  updateConsent: ActionCreator<UserStore.Types.IUpdateUserConsentAction>;
}

export interface ISettingsTermsOwnProps {}

export interface ISettingsTermsProps
  extends ISettingsTermsStateProps,
    ISettingsTermsDispatchProps,
    ISettingsTermsOwnProps,
    WithTranslation,
    WithAuthProps {}

export class SettingsTerms extends React.Component<ISettingsTermsProps> {
  componentDidMount = () => {
    const { getProfile, getConsents } = this.props;

    getProfile();
    getConsents();
  };

  componentDidUpdate(prevProps: Readonly<ISettingsTermsProps>) {
    const { action, getConsents, t } = this.props;

    if (!action || action === prevProps.action) {
      return;
    }

    switch (action.type) {
      case UserStore.Consts.UPDATE_USER_CONSENT_SUCCESS:
        Message.success(t("MESSAGE__SAVE_SUCCESS", "Successfully saved"));
        getConsents();
        break;
      case UserStore.Consts.UPDATE_USER_CONSENT_FAILURE:
        Message.error(t("MESSAGE__SAVE_ERROR", "Error during save"));
        break;
    }
  }

  private onChange = async (
    checked: boolean,
    _event:
      | MouseEvent
      | React.SyntheticEvent<MouseEvent | KeyboardEvent, Event>,
    id: string
  ) => {
    const { consents, updateConsent, isAnonymous } = this.props;

    if (isAnonymous) {
      RouteHelper.goToLogin();
    }

    const consent = consents.Data?.find((c) => `${c.ConsentId}` === id);

    if (consent) {
      const consentToUpdate: IUserConsentModel = {
        ...consent,
        Accepted: checked,
        AcceptedVersion: checked ? consent.ConsentVersion : undefined,
      };

      await updateConsent(consentToUpdate);
    }
  };

  private renderConsents() {
    const { consents } = this.props;

    return consents.Data?.map((consent) => {
      if (consent.ConsentCode === InfoDetailsScreenCode.COOKIES) return null;
      return (
        <div className="SettingsTerms__Option" key={consent.ConsentId}>
          <label>
            <Switch
              id={`${consent.ConsentId}`}
              onChange={this.onChange}
              checked={consent.Accepted || false}
              disabled={consent.ConsentRequired && consent.Accepted}
            />
            <span className="SettingsTerms__Option__Description">
              <Consent consent={consent} />
            </span>
          </label>
        </div>
      );
    });
  }

  render() {
    const { profile } = this.props;

    if (!profile.Data) {
      return null;
    }

    return <div className="SettingsTerms">{this.renderConsents()}</div>;
  }
}
