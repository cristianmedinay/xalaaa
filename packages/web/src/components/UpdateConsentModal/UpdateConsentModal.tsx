/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  AuthStore,
  IAppState,
  IUserConsentModel,
  ROUTES,
  useIsLoggedIn,
  UserConsentCodes,
  UserStore,
  useSelector,
} from "@xala/common";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Message } from "components/Message";
import logo from "resources/logo_laxarxa_black.svg";

import "./UpdateConsentModal.scss";

const UPDATE_CONSENT_MODAL_BODY_CLASSNAME = "update-consent-modal-open";

export const UpdateConsentModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoggedIn = useIsLoggedIn();
  const [isAcceptButtonDisabled, setIsAcceptButtonDisable] = useState(false);
  const [isRefuseButtonDisabled, setIsRefuseButtonDisable] = useState(false);
  const [updatedConsent, setUpdatedConsent] = useState<IUserConsentModel>();

  const userActionType = useSelector(
    (state: IAppState) => state.user.action?.type
  );
  const authActionType = useSelector(
    (state: IAppState) => state.auth.action?.type
  );
  const userConsents = useSelector((state: IAppState) => {
    return isLoggedIn && state.user.consents.Data?.[0].UserId !== -999
      ? state.user.consents.Data
      : undefined;
  });

  const privacyPolicyOrTermsOfUseRoute =
    location.pathname.includes(ROUTES.CUSTOM_PRIVACY_POLICY_SCREEN) ||
    location.pathname.includes(ROUTES.CUSTOM_TERMS_OF_USE_SCREEN);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(UserStore.Actions.getUserConsents());
      return;
    }

    document.body.classList.remove(UPDATE_CONSENT_MODAL_BODY_CLASSNAME);
    setUpdatedConsent(undefined);
  }, [isLoggedIn, dispatch]);

  useEffect(() => {
    switch (userActionType) {
      case UserStore.Consts.UPDATE_USER_CONSENT_SUCCESS:
        if (location.pathname.includes(ROUTES.SETTINGS_TERMS_AND_CONDITIONS)) {
          return;
        }
        Message.success(t("MESSAGE__SAVE_SUCCESS", "Successfully saved"));
        dispatch(UserStore.Actions.getUserConsents());
        break;
      case UserStore.Consts.UPDATE_USER_CONSENT_FAILURE:
        if (location.pathname.includes(ROUTES.SETTINGS_TERMS_AND_CONDITIONS)) {
          setIsAcceptButtonDisable(false);
          return;
        }
        Message.error(t("MESSAGE__SAVE_ERROR", "Error during save"));
        break;
    }
  }, [userActionType, dispatch, t]);

  useEffect(() => {
    switch (authActionType) {
      case AuthStore.Consts.SIGN_IN_SUCCESS:
      case AuthStore.Consts.SIGN_IN_FAILURE:
        setIsRefuseButtonDisable(false);
        break;
    }
  }, [authActionType]);

  useEffect(() => {
    if (userConsents) {
      setIsAcceptButtonDisable(false);
      const updated = userConsents.find(
        (consent) =>
          consent.ConsentRequired &&
          (!consent.Accepted ||
            !consent.AcceptedVersion ||
            consent.AcceptedVersion < consent.ConsentVersion)
      );
      !!updated &&
        !privacyPolicyOrTermsOfUseRoute &&
        document.body.classList.add(UPDATE_CONSENT_MODAL_BODY_CLASSNAME);
      !updated &&
        document.body.classList.remove(UPDATE_CONSENT_MODAL_BODY_CLASSNAME);
      setUpdatedConsent(updated);
    }
  }, [userConsents, privacyPolicyOrTermsOfUseRoute]);

  if (!updatedConsent || privacyPolicyOrTermsOfUseRoute || !isLoggedIn) {
    return <></>;
  }

  const pathToUpdatedConsentDetail = updatedConsent.ConsentCode.includes(
    UserConsentCodes.PrivacyPolicy
  )
    ? ROUTES.CUSTOM_PRIVACY_POLICY_SCREEN
    : updatedConsent.ConsentCode.includes(UserConsentCodes.TermsOfUse)
    ? ROUTES.CUSTOM_TERMS_OF_USE_SCREEN
    : `${ROUTES.PRIVACY_POLICY_SCREEN}/${updatedConsent.ConsentId}`;

  const handleRefuseButton = () => {
    setIsRefuseButtonDisable(true);
    dispatch(AuthStore.Actions.signOut(ROUTES.HOME));
  };

  const handleAcceptButton = () => {
    setIsAcceptButtonDisable(true);
    const consent: IUserConsentModel = {
      ...updatedConsent,
      Accepted: true,
      AcceptedVersion: updatedConsent.ConsentVersion,
    };
    dispatch(UserStore.Actions.updateUserConsent(consent));
  };

  return (
    <div className="user-consent-update-modal__container">
      <div className="user-consent-update-modal__border">
        <div className="user-consent-update-modal__content">
          <div className="user-consent-update-modal__logo">
            <img alt="Logo" src={logo} />
          </div>
          <div className="user-consent-update-modal__header">
            {t(`USER_CONSENT_UPDATE_MODAL__TITLE`, `Update`)}{" "}
            {t(
              `${updatedConsent.ConsentNameTranslationKey}`,
              `${updatedConsent.ConsentName}`
            )}
          </div>
          <div className="user-consent-update-modal__text">
            {t(
              "USER_CONSENT_UPDATE_MODAL__TEXT",
              "We are committed to protecting your privacy and being transparent about how we collect, use and share your personal data. Therefore, we have updated our Privacy Policy to reflect the changes in our data handling practices and to comply with the new regulations. We invite you to review the new Privacy Policy in detail and to contact us if you have any questions. Your privacy is important to us and we are committed to protecting it. If you do not accept the new conditions, we will not be able to give you access to the platform. Please accept the new policies and continue enjoying all the content of La Xarxa+."
            )}
          </div>
          <div className="user-consent-update-modal__buttons">
            <Link
              className="user-consent-update-modal__link"
              target="_blank"
              to={pathToUpdatedConsentDetail}
            >
              <button className="user-consent-update-modal__button user-consent-update-modal__button--secondary">
                <span>
                  {t("USER_CONSENT_UPDATE_MODAL__LEARN_MORE", "Learn more →")}
                </span>
              </button>
            </Link>
            <button
              className="user-consent-update-modal__button user-consent-update-modal__button--primary"
              onClick={handleRefuseButton}
              disabled={isRefuseButtonDisabled}
            >
              <span>
                {t("USER_CONSENT_UPDATE_MODAL__REFUSE", "Refuse and close")}
              </span>
            </button>
            <button
              className="user-consent-update-modal__button user-consent-update-modal__button--primary"
              onClick={handleAcceptButton}
              disabled={isAcceptButtonDisabled}
            >
              <span>
                {t("USER_CONSENT_UPDATE_MODAL__ACCEPT", "Accept and Close")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
