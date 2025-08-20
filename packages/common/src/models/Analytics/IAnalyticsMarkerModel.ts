/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

export type LoginStatus = "success" | "error" | "code_expired";

export interface IAnalyticsPayload {
  payload: IAnalyticsMarkerModel;
}

type KonodracPrivacyCategory = {
  categoryName: string;
  domain: string;
  customData: {
    tcString: string;
  };
};

export interface IKonodracPrivacyModel {
  accessCategories: KonodracPrivacyCategory[];
}

export interface IAnalyticsMarkerModel {
  datasetid?: string;
  mark?: {
    tag?: string;
    version?: {
      marksCollector?: {
        type: string;
        version: string;
      };
      schema?: string;
    };
    isActiveSession?: boolean;
    cdata?: {
      digitalData?: {
        page?: {
          category?: {
            channel?: string;
            channelId?: string;
            pageType?: string;
            primaryCategory?: string;
            topics?: string[];
          };
          pageInfo?: {
            language?: string;
            pageID?: string;
            programId?: string;
          };
          sysInfo?: {
            sysEnv?: string;
          };
          pageName?: string;
        };
        pageInstanceID?: string;
        privacy?: IKonodracPrivacyModel;
      };
      scroll?: number;
      ref?: string;
      pageUrl?: string;
      pageTitle?: string;
      deviceResolution?: [number, number];
      loginStatusResponse?: LoginStatus;
      playerStatus?: string;
      secsPlayed?: number;
      fullScreenStatus?: boolean;
      muteStatus?: boolean;
      mediaType?: string;
      mediaDuration?: number;
      mediaName?: string;
      mediaUrl?: string;
      mediaResolution?: number[];
      currentPosition?: number;
      bufferPercentage?: number;
      playbackRate?: number;
      searchCriteria?: string;
      recoId?: string;
      criteriaId?: string;
      templateId?: string;
      testId?: string;
      testGroup?: string;
      queryItem?: string;
      item?: string;
    };
    uid?: string;
    cid?: string;
    vdid?: number;
    did?: string;
    sid?: string;
    sidDuration?: number;
    cidDuration?: number;
    cidCount?: number;
    userAgent?: string;
  };
}
