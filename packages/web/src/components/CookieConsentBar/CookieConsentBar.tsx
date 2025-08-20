/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  IAppState,
  InfoDetailsScreenCode,
  IUserConsentModel,
  ThemeContext,
  UserStore,
} from "@xala/common";
import Color from "color";
import React, { useCallback, useContext, useEffect } from "react";
import CookieConsent from "react-cookie-consent";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { Consent } from "components";

import "./CookieConsentBar.scss";

export const CookieConsentBar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { themeProvider } = useContext(ThemeContext);

  const userConsents = useSelector<IAppState, IUserConsentModel[] | undefined>(
    (state) => state.user.consents.Data
  );

  const cookieConsent = userConsents?.find(
    (consent) => consent.ConsentCode === InfoDetailsScreenCode.COOKIES
  );

  useEffect(() => {
    dispatch(UserStore.Actions.getUserConsents());
  }, [dispatch]);

  const updateConsent = useCallback(
    (data: IUserConsentModel) => {
      dispatch(UserStore.Actions.updateUserConsent(data));
    },
    [dispatch]
  );

  const acceptCookie = useCallback(
    (isAccepted: boolean) => {
      cookieConsent &&
        updateConsent({
          ...cookieConsent,
          Accepted: isAccepted,
        });
    },
    [cookieConsent, updateConsent]
  );

  const cookiesTranslationTitle = t("COOKIES_TITLE").split(" ").join("");

  const cookieGeneralCustomStyle = {
    color: themeProvider.getColor("AppPrimaryTextColor"),
    boxShadow: "0px 0px 5px 0.5px black ",
    zIndex: 1009,
  };
  const buttonCustomStyle = {
    borderRadius: "27px",
    padding: "1rem 2rem",
  };

  return (
    <div className="Cookies">
      {cookieConsent && (
        <CookieConsent
          enableDeclineButton={false}
          onDecline={() => acceptCookie(false)}
          onAccept={() => acceptCookie(true)}
          cookieName={cookiesTranslationTitle || "cookies"}
          expires={360}
          location="bottom"
          declineButtonText={t("COOKIES_BUTTON__DECLINE", "Decline")}
          buttonText={t("COOKIES_BUTTON__ACCEPT", "Accept")}
          buttonStyle={{
            ...cookieGeneralCustomStyle,
            ...buttonCustomStyle,
            marginRight: "2rem",
            backgroundColor: themeProvider.getColor("AppPrimaryColor"),
          }}
          declineButtonStyle={{
            ...cookieGeneralCustomStyle,
            ...buttonCustomStyle,
            marginLeft: "2rem",
            backgroundColor: Color(themeProvider.getColor("AppBackgroundColor"))
              .alpha(0.55)
              .string(),
          }}
          style={{
            ...cookieGeneralCustomStyle,
            background: Color(themeProvider.getColor("AppSecondaryColor"))
              .alpha(0.95)
              .string(),
          }}
          contentStyle={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {t(
            "COOKIES_CONSENT",
            "This website uses cookies to enhance the user experience."
          )}{" "}
          {cookieConsent && <Consent consent={cookieConsent} />}
        </CookieConsent>
      )}
    </div>
  );
};
