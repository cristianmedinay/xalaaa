/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAppState } from "@xala/common";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

// import AppleStoreBadge from "../../resources/appStore/apple-store-badge.svg";
// import GooglePlayBadge from "../../resources/appStore/google-play-badge.svg";
import "./MobileScreen.scss";

export const MobileScreen = () => {
  const { t } = useTranslation();
  const logo = useSelector(
    (state: IAppState) =>
      state.configuration.configuration?.Branding?.WebHeaderLogoUrl
  );

  return (
    <div className="MobileScreen">
      <Suspense fallback={null}>
        <img
          alt="Download on the App Store"
          className="MobileScreen__logo"
          src={logo}
        />
        <div className="MobileScreen__text">
          <div className="MobileScreen__text--desktop">
            {t("MOBILE__DESKTOP_INFO", "Our app is available on PC only.")}
          </div>
          {/* TODO: When API configuration will be ready to dynamically load mobile app versions for clients */}

          {/* <div className="MobileScreen__text--download">
          {t(
            "MOBILE__DOWNLOAD_INFO",
            "Download our app to your mobile device."
          )}
        </div>
          */}
        </div>

        {/* TODO: When API configuration will be ready to dynamically load mobile app versions for clients */}

        {/* <div className="MobileScreen__text">
          {t(
            "MOBILE__DOWNLOAD_INFO",
            "Download our app to your mobile device."
          )}
        </div>

        <img
          alt="Download on the App Store"
          className="MobileScreen__badge"
          src={AppleStoreBadge}
        />

        <img
          alt="Get it on Google play"
          className="MobileScreen__badge"
          src={GooglePlayBadge}
        /> */}
      </Suspense>
    </div>
  );
};
