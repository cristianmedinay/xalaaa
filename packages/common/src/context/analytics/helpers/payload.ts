/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { AnalyticsSystem } from "context/analytics/types";

import { IAnalyticsMarkerModel, IKonodracPrivacyModel } from "../../../models";

interface prepareBasePayloadParams {
  system: AnalyticsSystem;
  uid: string;
  vdid: number;
  cid: string;
  did: string;
  sid: string;
  cidCount: number;
  digitalDataPrivacy: IKonodracPrivacyModel;
  version: string;
}

export const prepareBasePayload = (
  params: prepareBasePayloadParams
): IAnalyticsMarkerModel => {
  const {
    system,
    uid,
    cid,
    vdid,
    did,
    sid,
    cidCount,
    digitalDataPrivacy,
    version,
  } = params;

  return {
    mark: {
      version: {
        schema: "1.0.0",
        marksCollector: {
          type: getVersionType(),
          version,
        },
      },
      isActiveSession: true,
      cdata: {
        digitalData: {
          page: {
            sysInfo: {
              sysEnv: system,
            },
          },
          privacy: digitalDataPrivacy,
        },
        scroll: 0,
        ref: "",
      },
      uid,
      cid,
      vdid,
      did,
      sid,
      cidCount,
    },
  };
};

const getVersionType = (): string => {
  return "LaXarxa+ web";
};
