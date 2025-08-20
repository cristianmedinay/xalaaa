/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  DataProvider,
  IAppState,
  IErrorModel,
  InfoDetailsScreenCode,
  ScreenType,
  useDataLoader,
  useTheme,
} from "@xala/common";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";

import { ConsentModal } from "components/ConsentModal";

import "./InfoDetailsScreen.scss";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const srcDoc = require("srcdoc-polyfill");

export interface IInfoDetailsScreenProps {
  screenTypeCode?: ScreenType;
  isConsent?: boolean;
  textCode: InfoDetailsScreenCode | string;
}

export const InfoDetailsScreen = ({ textCode }: IInfoDetailsScreenProps) => {
  const userConsents = useSelector(
    (state: IAppState) => state.user.consents.Data
  );

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const consent =
    userConsents &&
    userConsents.find((consent) => consent.ConsentId.toString() === textCode);

  const themeProvider = useTheme();

  const screenLoader = useDataLoader<string | undefined, IErrorModel>({
    loader: () => {
      if (!consent && userConsents) {
        return Promise.resolve({
          ok: false,
          error: {
            MessageKey: "CONSENT_FILE_IS_MISSING",
          },
        });
      }

      if (!consent) {
        return Promise.resolve({
          ok: true,
          data: "",
          error: undefined,
        });
      }

      if (consent && !consent.ConsentContentUrl) {
        return Promise.resolve({
          ok: false,
          error: {
            MessageKey: "CONSENT_FILE_IS_MISSING",
          },
        });
      }

      return DataProvider.getUserConsent(consent.ConsentContentUrl)
        .then((response) => {
          return {
            ok: true,
            data: response,
            error: {},
          };
        })
        .catch((error) => {
          return {
            ok: false,
            error: {
              ...error,
              MessageKey: "CONSENT_FILE_LOADING_FAILED",
            },
          };
        });
    },
    deps: [consent, userConsents],
  });

  const recalculateFrameSize = (frame: HTMLIFrameElement | null) => {
    const doc = frame?.contentDocument ?? frame?.contentWindow?.document;

    if (!frame || !doc) {
      return;
    }

    const height = doc.body.offsetHeight;

    frame.height = `${height}px`;
    frame.style.height = `${height}px`;
  };

  const handleResize = useCallback(
    () => recalculateFrameSize(iframeRef.current),
    []
  );

  useEffect(() => {
    const ref = iframeRef.current;

    ref?.addEventListener("resize", handleResize);
    window.addEventListener("resize", handleResize);

    return () => {
      ref?.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const updateStyles = useCallback(
    (doc: Document | undefined) => {
      if (!doc) {
        return;
      }
      const style = document.createElement("style");

      const textColor = themeProvider.getColor("AppPrimaryTextColor");

      style.innerHTML = `
            body {
              height: 100%;
              padding: 2rem;
              overflow: hidden;
              font-family: "BR Sonoma", Helvetica, Arial, sans-serif;
              font-size: 20px;
              font-weight: 100;
              color: rgb(255,255,255);
            }

            *, *:before {
                color: ${textColor} !important;
              }
            h1 {
              font-size: 20px;
              text-transform: uppercase;
              font-weight: 100;
            }

            span {
              font-size: 20px;
              font-weight: 100;
            }

            p {
              font-size: 20px;
              font-weight: 100;
            }

            li {
              font-size: 20px;
              font-weight: 100;
            }

            ol>li:before {
              font-size: 20px;
              font-weight: 100;
            }
          `;
      doc.head.appendChild(style);
    },
    [themeProvider]
  );

  const renderDocumentHandler = useCallback(() => {
    if (iframeRef.current) {
      const doc =
        iframeRef.current.contentDocument ??
        iframeRef.current.contentWindow?.document;

      if (doc) {
        updateStyles(doc);
        recalculateFrameSize(iframeRef.current);
      }
    }
  }, [updateStyles]);

  const renderContent = useMemo((): React.ReactNode => {
    if (screenLoader.data && iframeRef.current) {
      srcDoc.set(iframeRef.current, screenLoader.data);
    }

    const renderError = (): React.ReactNode => {
      if (screenLoader.error) {
        return (
          <ConsentModal
            refresh={screenLoader.refresh}
            error={screenLoader.error}
          />
        );
      }

      return null;
    };

    if (consent?.ConsentContentType === "application/pdf") {
      return (
        <>
          {renderError()}
          {!screenLoader.error && (
            <object
              data={consent?.ConsentContentUrl}
              width="100%"
              height="100%"
              onLoad={renderDocumentHandler}
            ></object>
          )}
        </>
      );
    }

    return (
      <div className="InfoDetailsScreen__Container">
        <div className="InfoDetailsScreen__Content">
          {renderError()}
          {!screenLoader.error && (
            <iframe
              ref={iframeRef}
              className="InfoDetailsScreen__IFrame"
              sandbox="allow-same-origin"
              width="85%"
              onLoad={renderDocumentHandler}
            />
          )}
        </div>
      </div>
    );
  }, [renderDocumentHandler, screenLoader.error, screenLoader.loading]);

  return <div className="InfoDetailsScreen">{renderContent}</div>;
};
