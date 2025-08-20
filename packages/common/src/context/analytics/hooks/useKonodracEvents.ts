/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import i18n from "@xala/web/src/i18n";
import { merge } from "lodash";
import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

import { AppConfig } from "../../../../src/app/AppConfig";
import {
  IAnalyticsMarkerModel,
  IAssetCategoryModel,
  IMediaModel,
  LoginStatus,
} from "../../../models";
import { AnalyticsStore, IAppState } from "../../../store";
import { prepareBasePayload } from "../helpers";
import {
  AnalyticsSystem,
  KonodracEventDispatcher,
  KonodracEventTag,
  usePlayerEventsParams,
} from "../types";

import {
  DEFAULT_PATH_NAME,
  getEnvVariables,
  IMobileMediaEvent,
  MOBILE,
  PAGE_TITLE_FOR_MOBILE,
  useAnalyticsSession,
  useAppPathWatcher,
  useTCFString,
} from "./";

interface useKonodracEventsParams {
  system: AnalyticsSystem;
  deviceId: string;
  userId: string;
  version: string;
}

const DOMAIN =
  process.env.REACT_APP_ANALYTICS_DOMAIN || AppConfig.AnalyticsDomain || "";

export const useKonodracEvents = (
  params: useKonodracEventsParams
): KonodracEventDispatcher => {
  const { system, deviceId: did, userId: uid, version } = params;
  const {
    DEFAULT_DATASET_ID,
    DEFAULT_CHANNEL_NAME,
    DEFAULT_CHANNEL_ID,
    isEnabled,
  } = getEnvVariables();

  const { sessionId: sid, sessionDuration } = useAnalyticsSession({
    userId: uid,
  });
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = useSelector(
    (state: IAppState) => state?.router?.location.pathname || DEFAULT_PATH_NAME
  );

  const { tcfString } = useTCFString();

  const digitalDataPrivacy = useMemo(
    () => ({
      accessCategories: [
        {
          categoryName: "tcf",
          domain: `.${DOMAIN}`,
          customData: {
            tcString: tcfString,
          },
        },
      ],
    }),
    [tcfString]
  );

  const deviceResolutionHanlder = (): [number, number] => [
    Math.ceil(window.innerWidth),
    Math.ceil(window.innerHeight),
  ];

  const {
    lastPath: cid,
    count: cidCount,
    getCurrentPathTimeSeconds,
  } = useAppPathWatcher();

  useEffect(() => {
    view(system);
  }, [cid]);

  const basePayload = useMemo(
    () =>
      prepareBasePayload({
        system,
        uid,
        cid: cid as string,
        did,
        sid,
        cidCount,
        vdid: 0,
        digitalDataPrivacy,
        version,
      }),
    [uid, cid, did, sid, cidCount, digitalDataPrivacy]
  );

  const [pageType, primaryCategory, topics, externalId] = useMemo(() => {
    const state = location.state as any;

    const pageType = state?.media?.Media?.MediaTypeCode || "";

    const primaryCategory =
      state?.media?.Categories?.[0]?.CategoryCode.split(" > ")[0] || "";

    const categories = state?.media?.Categories;

    const topics = categories?.map(
      (category: IAssetCategoryModel) => category.CategoryCode
    ) || [""];

    const externalId = state?.media?.ExternalId || "";

    return [pageType, primaryCategory, topics, externalId];
  }, [location.state]);

  const sendMobileMediaEvent = useCallback(
    ({
      assetId,
      datasetid,
      channel,
      cid,
      eventType,
      channelId,
      mediaType,
      playerStatus,
      secsPlayed,
      fullScreenStatus,
      muteStatus,
      mediaDuration,
      mediaUrl,
      mediaResolution,
      currentPosition,
      programId,
      bufferPercentage,
      playbackRate,
      pageType,
      userAgent,
    }: IMobileMediaEvent) => {
      const eventPayload: IAnalyticsMarkerModel = {
        datasetid: datasetid || DEFAULT_DATASET_ID,
        mark: {
          tag: eventType,
          cdata: {
            digitalData: {
              page: {
                category: {
                  channel:
                    channel && channel !== "undefined"
                      ? channel
                      : DEFAULT_CHANNEL_NAME,
                  channelId:
                    channelId && channel !== "undefined"
                      ? channelId
                      : DEFAULT_CHANNEL_ID,
                  pageType,
                  primaryCategory,
                  topics,
                },
                pageInfo: {
                  language: i18n.language,
                  pageID: assetId,
                  programId,
                },
              },
              pageInstanceID: cid,
            },
            pageUrl: cid,
            pageTitle: PAGE_TITLE_FOR_MOBILE,
            deviceResolution: deviceResolutionHanlder(),
            playerStatus,
            secsPlayed,
            fullScreenStatus,
            muteStatus,
            mediaType,
            mediaDuration,
            mediaName: cid,
            mediaUrl: mediaUrl,
            mediaResolution,
            currentPosition,
            bufferPercentage,
            playbackRate,
          },
          cid,
          sidDuration: sessionDuration(),
          cidDuration: getCurrentPathTimeSeconds(),
          userAgent,
        },
      };
      // const fixedBasePayload = { ...basePayload, cid };
      merge(basePayload, eventPayload);
      dispatch(AnalyticsStore.Actions.sendAnalyticsMarker(basePayload));
    },
    [basePayload, sessionDuration, getCurrentPathTimeSeconds, dispatch]
  );

  const sendMediaEvent = useCallback(
    (params: usePlayerEventsParams, eventTag: KonodracEventTag) => {
      const {
        datasetid,
        channel,
        channelId,
        pageType,
        cid,
        programId,
        playerStatus,
        secsPlayed,
        fullScreenStatus,
        muteStatus,
        mediaType,
        mediaDuration,
        mediaName,
        mediaUrl,
        mediaResolution,
        currentPosition,
        bufferPercentage,
        playbackRate,
        assetId,
        topics: mediaTopics,
      } = params;
      if (!isEnabled) {
        return;
      }
      const eventPayload: IAnalyticsMarkerModel = {
        datasetid: datasetid,
        mark: {
          tag: eventTag,
          cdata: {
            digitalData: {
              page: {
                category: {
                  channel: channel,
                  channelId: channelId,
                  pageType: pageType,
                  primaryCategory: primaryCategory,
                  topics: mediaTopics,
                },
                pageInfo: {
                  language: i18n.language,
                  pageID: assetId,
                  programId: programId,
                },
              },
              pageInstanceID: system === MOBILE ? cid : window?.location?.href,
            },
            pageUrl: system === MOBILE ? cid : window?.location?.href,
            pageTitle:
              system === MOBILE ? PAGE_TITLE_FOR_MOBILE : document?.title,
            deviceResolution: deviceResolutionHanlder(),
            playerStatus: playerStatus,
            secsPlayed: secsPlayed,
            fullScreenStatus: fullScreenStatus,
            muteStatus: muteStatus,
            mediaType: mediaType,
            mediaDuration: mediaDuration,
            mediaName: mediaName,
            mediaUrl: mediaUrl,
            mediaResolution: mediaResolution,
            currentPosition: currentPosition,
            bufferPercentage: bufferPercentage,
            playbackRate: playbackRate,
          },
          sidDuration: sessionDuration(),
          cidDuration: getCurrentPathTimeSeconds(),
        },
      };
      merge(eventPayload, basePayload);
      merge(eventPayload, { mark: { cid } });
      dispatch(AnalyticsStore.Actions.sendAnalyticsMarker(eventPayload));
    },
    [basePayload, sessionDuration, getCurrentPathTimeSeconds, dispatch]
  );

  const sendPageEvent = useCallback(
    (
      eventTag: KonodracEventTag,
      loginStatus?: LoginStatus,
      userId?: number
    ) => {
      if (!isEnabled) {
        return;
      }
      const eventPayload: IAnalyticsMarkerModel = {
        datasetid: DEFAULT_DATASET_ID,
        mark: {
          tag: eventTag,
          cdata: {
            digitalData: {
              page: {
                category: {
                  channel: DEFAULT_CHANNEL_NAME,
                  channelId: DEFAULT_CHANNEL_ID,
                  pageType: pageType,
                  primaryCategory: primaryCategory,
                  topics: topics,
                },
                pageInfo: {
                  language: i18n.language,
                  pageID:
                    system === MOBILE ? pathname : document?.location?.pathname,
                  programId:
                    system === MOBILE ? PAGE_TITLE_FOR_MOBILE : document?.title,
                },
              },
              pageInstanceID: system === MOBILE ? cid : window.location.href,
            },
            pageUrl: system === MOBILE ? cid : window?.location?.href,
            pageTitle:
              system === MOBILE ? PAGE_TITLE_FOR_MOBILE : document?.title,
            deviceResolution: deviceResolutionHanlder(),
            loginStatusResponse: loginStatus,
          },
          sidDuration: sessionDuration(),
          cidDuration: getCurrentPathTimeSeconds(),
        },
      };
      merge(eventPayload, basePayload);

      if (userId) {
        merge(eventPayload, { mark: { uid: userId } });
      }
      if (
        eventPayload?.mark?.tag !== eventTag &&
        eventTag &&
        eventPayload?.mark?.tag !== undefined
      ) {
        eventPayload.mark.tag = eventTag;
      }
      dispatch(AnalyticsStore.Actions.sendAnalyticsMarker(eventPayload));
    },
    [basePayload, sessionDuration, getCurrentPathTimeSeconds, dispatch]
  );

  const sendRecoClickEvent = useCallback(
    (eventTag: KonodracEventTag, media: IMediaModel) => {
      if (!isEnabled) {
        return;
      }
      const recoData = media?.RecoData;
      const recoItem = media?.Id;
      const eventPayload: IAnalyticsMarkerModel = {
        datasetid: DEFAULT_DATASET_ID,
        mark: {
          tag: eventTag,
          cdata: {
            digitalData: {
              page: {
                category: {
                  channel: DEFAULT_CHANNEL_NAME,
                  channelId: DEFAULT_CHANNEL_ID,
                  pageType: pageType,
                  primaryCategory: primaryCategory,
                  topics: topics,
                },
                pageInfo: {
                  language: i18n.language,
                  pageID:
                    system === MOBILE ? pathname : document.location.pathname,
                  programId:
                    system === MOBILE ? PAGE_TITLE_FOR_MOBILE : document.title,
                },
              },
              pageInstanceID: window.location.href,
            },
            pageUrl: MOBILE ? cid : window.location.href,
            pageTitle:
              system === MOBILE ? PAGE_TITLE_FOR_MOBILE : document.title,
            deviceResolution: deviceResolutionHanlder(),
            recoId: recoData?.Id || "",
            criteriaId: recoData?.QueryCriteria || "",
            templateId: recoData?.QueryTemplate || "",
            testId: recoData?.QueryTest || "",
            testGroup: recoData?.QueryTestGroup || "",
            queryItem: recoData?.QueryItem || "",
            item: recoItem.toString(),
          },
          sidDuration: sessionDuration(),
          cidDuration: getCurrentPathTimeSeconds(),
        },
      };
      merge(eventPayload, basePayload);
      dispatch(AnalyticsStore.Actions.sendAnalyticsMarker(eventPayload));
    },
    [basePayload, sessionDuration, getCurrentPathTimeSeconds, dispatch]
  );

  const sendSearchEvent = useCallback(
    (searchValue: string, eventTag: KonodracEventTag) => {
      if (!isEnabled) {
        return;
      }

      const eventPayload: IAnalyticsMarkerModel = {
        datasetid: DEFAULT_DATASET_ID,
        mark: {
          tag: eventTag,
          cdata: {
            digitalData: {
              page: {
                category: {
                  pageType: pageType,
                  primaryCategory: primaryCategory,
                  topics: topics,
                },
                pageInfo: {
                  language: i18n.language,
                  pageID: pathname,
                  programId: externalId,
                },
              },
              pageInstanceID: system === MOBILE ? cid : window?.location?.href,
            },
            pageUrl: system === MOBILE ? cid : window?.location?.href,
            pageTitle:
              system === MOBILE ? PAGE_TITLE_FOR_MOBILE : document.title,
            deviceResolution: deviceResolutionHanlder(),
            searchCriteria: searchValue,
          },
          sidDuration: sessionDuration(),
          cidDuration: getCurrentPathTimeSeconds(),
        },
      };
      merge(eventPayload, basePayload);
      dispatch(AnalyticsStore.Actions.sendAnalyticsMarker(eventPayload));
    },
    [basePayload, sessionDuration, getCurrentPathTimeSeconds, dispatch]
  );

  const view = useCallback(
    (system: AnalyticsSystem): boolean => {
      if (!cid && (system === "smarttv" || cid === "/")) {
        return false;
      }

      sendPageEvent(KonodracEventTag.View);
      return true;
    },
    [cid, sendPageEvent]
  );

  const componentView = useCallback(() => {
    sendPageEvent(KonodracEventTag.ComponentView);
  }, [sendPageEvent]);

  const heartbeat = useCallback((): boolean => {
    if (system === "smarttv" && (!cid || cid === "/")) {
      return false;
    }
    sendPageEvent(KonodracEventTag.ViewHeartbeat);
    return true;
  }, [cid, sendPageEvent]);

  const mediaStart = useCallback(
    (params: usePlayerEventsParams) => {
      sendMediaEvent(params, KonodracEventTag.MediaStart);
    },
    [sendMediaEvent]
  );

  const mediaPlay = useCallback(
    (params: usePlayerEventsParams) =>
      sendMediaEvent(params, KonodracEventTag.MediaPlay),
    [sendMediaEvent]
  );

  const mediaPause = useCallback(
    (params: usePlayerEventsParams) =>
      sendMediaEvent(params, KonodracEventTag.MediaPause),
    [sendMediaEvent]
  );

  const mediaFinish = useCallback(
    (params: usePlayerEventsParams) =>
      sendMediaEvent(params, KonodracEventTag.MediaFinish),
    [sendMediaEvent]
  );

  const mediaDispose = useCallback(
    (params: usePlayerEventsParams) =>
      sendMediaEvent(params, KonodracEventTag.MediaDispose),
    [sendMediaEvent]
  );

  const mediaHeartbeat = useCallback(
    (params: usePlayerEventsParams) =>
      sendMediaEvent(params, KonodracEventTag.MediaHeartbeat),
    [sendMediaEvent]
  );

  const mediaSeek = useCallback(
    (params: usePlayerEventsParams) =>
      sendMediaEvent(params, KonodracEventTag.MediaSeek),
    [sendMediaEvent]
  );

  const share = useCallback(
    () => sendPageEvent(KonodracEventTag.Share),
    [sendPageEvent]
  );

  const mediaError = useCallback(
    (params: usePlayerEventsParams) =>
      sendMediaEvent(params, KonodracEventTag.MediaError),
    [sendMediaEvent]
  );

  const mediaLoadedData = useCallback(
    (params: usePlayerEventsParams) =>
      sendMediaEvent(params, KonodracEventTag.MediaLoadedData),
    [sendMediaEvent]
  );

  const mediaFullScreen = useCallback(
    (params: usePlayerEventsParams) =>
      sendMediaEvent(params, KonodracEventTag.MediaFullScreen),
    [sendMediaEvent]
  );

  const mediaMute = useCallback(
    (params: usePlayerEventsParams) =>
      sendMediaEvent(params, KonodracEventTag.MediaMute),
    [sendMediaEvent]
  );

  const mobileMediaEvent = useCallback(
    (eventPayload: IMobileMediaEvent) => sendMobileMediaEvent(eventPayload),
    [sendMobileMediaEvent]
  );

  const loginRequest = useCallback(
    () => sendPageEvent(KonodracEventTag.LoginRequest),
    [sendPageEvent]
  );

  const search = useCallback(
    (searchValue: string) =>
      sendSearchEvent(searchValue, KonodracEventTag.Search),
    [sendPageEvent]
  );

  const loginResponse = useCallback(
    (status: LoginStatus, userId?: number) =>
      sendPageEvent(KonodracEventTag.LoginResponse, status, userId),
    [sendPageEvent]
  );

  const signOn = useCallback(
    () => sendPageEvent(KonodracEventTag.SignOn),
    [sendPageEvent]
  );

  const changePassword = useCallback(
    () => sendPageEvent(KonodracEventTag.ChangePassword),
    [sendPageEvent]
  );

  const recoverPassword = useCallback(
    () => sendPageEvent(KonodracEventTag.RecoverPassword),
    [sendPageEvent]
  );

  const requestPasswordRecovery = useCallback(
    () => sendPageEvent(KonodracEventTag.RequestPasswordRecovery),
    [sendPageEvent]
  );

  const validatePasswordRecovery = useCallback(
    () => sendPageEvent(KonodracEventTag.ValidatePasswordRecovery),
    [sendPageEvent]
  );

  const register = useCallback(
    () => sendPageEvent(KonodracEventTag.Register),
    [sendPageEvent]
  );

  const recoClick = useCallback(
    (media: IMediaModel) => {
      if (media.RecoData) {
        sendRecoClickEvent(KonodracEventTag.RecoClick, media);
      }
    },
    [sendPageEvent]
  );

  const emailValidation = useCallback(
    () => sendPageEvent(KonodracEventTag.EmailValidation),
    [sendPageEvent]
  );

  const logout = useCallback(
    () => sendPageEvent(KonodracEventTag.Logout),
    [sendPageEvent]
  );

  const profileUpdate = useCallback(
    () => sendPageEvent(KonodracEventTag.ProfileUpdate),
    [sendPageEvent]
  );

  return {
    heartbeat,
    componentView,
    view,
    mediaStart,
    mediaPlay,
    mediaPause,
    mediaFinish,
    mediaSeek,
    share,
    mediaDispose,
    mediaHeartbeat,
    mediaError,
    mediaLoadedData,
    mediaFullScreen,
    mediaMute,
    search,
    loginRequest,
    loginResponse,
    signOn,
    changePassword,
    recoverPassword,
    requestPasswordRecovery,
    validatePasswordRecovery,
    register,
    recoClick,
    emailValidation,
    logout,
    profileUpdate,
    mobileMediaEvent,
  };
};
