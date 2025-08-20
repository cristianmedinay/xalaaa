/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { StorageHelper } from "@xala/common";
import React, { useEffect, useState } from "react";

import { LoaderSpinner } from "components";
import appLogo from "resources/splash/logo.gif";

import "./Splash.scss";

export const Splash = () => {
  const [lastBackgroundColor, setLastBackgroundColor] = useState<
    string | undefined
  >(undefined);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    StorageHelper.getBackgroundColor().then(
      (result) => mounted && setLastBackgroundColor(result)
    );

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="Splash" style={{ backgroundColor: lastBackgroundColor }}>
      <div className="Splash__container">
        <div className="SplashBranding">
          <img
            className="Splash__logo"
            src={appLogo}
            alt="app logo"
            style={loaded ? {} : { display: "none" }}
            onLoad={() => setLoaded(true)}
          />
          <div className="Splash__spinner">
            <LoaderSpinner width={75} height={75} />
          </div>
        </div>
      </div>
    </div>
  );
};
