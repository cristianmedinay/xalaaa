/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  InfoDetailsScreenCode,
  IUserConsentModel,
  ROUTES,
  UserConsentCodes,
} from "@xala/common";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export interface ConsentProps {
  consent: IUserConsentModel;
}

export const Consent = ({ consent }: ConsentProps) => {
  const { t } = useTranslation();

  const pathToConsentDetail = consent.ConsentCode.includes(
    UserConsentCodes.PrivacyPolicy
  )
    ? ROUTES.CUSTOM_PRIVACY_POLICY_SCREEN
    : consent.ConsentCode.includes(UserConsentCodes.TermsOfUse)
    ? ROUTES.CUSTOM_TERMS_OF_USE_SCREEN
    : `${ROUTES.PRIVACY_POLICY_SCREEN}/${consent.ConsentId}`;

  return (
    <>
      {consent.ConsentRequired ? (
        <span className="RequiredConsent">*</span>
      ) : (
        ""
      )}
      {consent.ConsentCode === InfoDetailsScreenCode.COOKIES ? (
        <Link
          target="_blank"
          to={pathToConsentDetail}
          className="link underline"
        >
          {t("COOKIES_TITLE", "Cookies")}
        </Link>
      ) : (
        <Link
          target="_blank"
          to={pathToConsentDetail}
          className="link underline"
        >
          {t(`${consent.ConsentNameTranslationKey}`, `${consent.ConsentName}`)}
        </Link>
      )}
    </>
  );
};
