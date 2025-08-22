/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { DidomiSDK, IDidomiObject } from "@didomi/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { AnalyticsSystem } from "context/analytics/types";
import { IDidomiDataModel, IUserInfoModel } from "models";
import { IAppState } from "store";

import { ANONYMOUS_ID } from "../../constants";
import { AuthorizationHelper } from "../../helpers";
import {
  initializeAnalytics,
  updateFirebaseConsent,
} from "../../helpers/firebaseConfig";

const DIDOMI_API_KEY = process.env.REACT_APP_DIDOMI_API_KEY || "";
const DIDOMI_LOADER_SCRIPT_ID = "spcloader";
const DIDOMI_HOST_ID = "didomi-host";

interface DidomiServiceParams {
  system: AnalyticsSystem;
}

export const DidomiService = ({ system }: DidomiServiceParams) => {
  const user = useSelector<IAppState, IUserInfoModel | undefined>(
    (state) => state.auth.user
  );

  const userId = useSelector<IAppState, string>(
    (state) => state.auth.user?.Id?.toString() || ANONYMOUS_ID.toString()
  );

  const generateKey = (): string => `${user?.Id || ANONYMOUS_ID}-${Date.now()}`;
  const [key, setKey] = useState<string>(generateKey());

  const hashedDidomiData = useMemo(() => {
    const data: IDidomiDataModel | undefined = user?.DidomiData;

    if (!data) {
      return {};
    }

    return {
      organizationUserId: data.OrganizationUserId,
      organizationUserIdAuthDigest: data.OrganizationUserIdAuthDigest,
      organizationUserIdAuthSid: data.OrganizationUserIdAuthSid,
      organizationUserIdAuthAlgorithm: data.OrganizationUserIdAuthAlgorithm,
      organizationUserIdAuthSalt: data.OrganizationUserIdAuthSalt,
      organizationUserIdExp: data.OrganizationUserIdExp,
    };
  }, [userId]);

  const didomiRef = useRef<IDidomiObject | null>();

  useEffect(() => {
    AuthorizationHelper.isLoggedIn().then(() => {
      const shouldReloadDidomi =
        didomiRef.current &&
        userId !== didomiRef.current.getConfig().user.organizationUserId;
      if (shouldReloadDidomi && userId === ANONYMOUS_ID.toString()) {
        didomiRef.current?.setUser(hashedDidomiData);
      } else if (shouldReloadDidomi) {
        didomiRef.current?.reset();
        didomiRef.current = null;

        window.didomiEventListeners = undefined;
        window.didomiOnReady = undefined;
        window.didomiConfig = undefined;
        window.didomiState = undefined;
        window.DidomiSanitizing = undefined;
        window.didomiRemoteConfig = undefined;
        window.Didomi = undefined;

        const didomiHostDiv = document.getElementById(DIDOMI_HOST_ID);

        if (didomiHostDiv) {
          didomiHostDiv.parentNode?.removeChild(didomiHostDiv);
        }

        const spcloaderScript = document.getElementById(
          DIDOMI_LOADER_SCRIPT_ID
        );

        if (spcloaderScript) {
          spcloaderScript.parentNode?.removeChild(spcloaderScript);
          setKey(generateKey());
        }
      }
    });
  }, [userId]);

  return (
    <DidomiSDK
      key={key}
      apiKey={DIDOMI_API_KEY}
      iabVersion={2}
      gdprAppliesGlobally
      sdkPath="https://sdk.privacy-center.org/"
      embedTCFStub
      onReady={async (didomi: IDidomiObject) => {
        didomiRef.current = didomi;

        if (system !== "web") {
          return;
        }

        await initializeAnalytics(didomi);
      }}
      onConsentChanged={() => {
        if (!didomiRef.current) return;
        updateFirebaseConsent(didomiRef.current);
      }}
      config={{
        notice: {
          enable: system === "web",
        },
        user: hashedDidomiData,
        sync: {
          enabled: ANONYMOUS_ID.toString() !== userId,
          delayNotice: true,
        },
        cookies: {
          storageSources: {
            cookies: true,
            localStorage: false,
          },
        },
      }}
    />
  );
};
