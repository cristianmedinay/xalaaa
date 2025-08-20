/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { MediaType } from "enums";

import { TextTrack } from "./IBrightcoveMediaModel";
import { IMediaAdvertisementOptionsModel } from "./IMediaAdvertisementOptionsModel";
import { IMediaSubtitleModel } from "./IMediaSubtitleModel";
import { IMediaTimestampModel } from "./IMediaTimestampModel";
import { IRestrictedContentCookieModel } from "./IRestrictedContentCookieModel";
import { IRestrictedContentHeaderModel } from "./IRestrictedContentHeaderModel";

type ProviderSource = "Internal" | "Brightcove" | "Konodrac";

export interface IMediaPlayInfoModel {
  MediaId?: number;

  Title?: string;

  Description?: string;

  MediaTypeCode?: MediaType;

  MediaTypeDisplayName?: string;

  Timestamp?: IMediaTimestampModel;

  StreamId?: number;

  Provider?: ProviderSource;

  UrlSource?: ProviderSource;

  Url?: string;

  ContentUrl?: string;

  ContentType?: string;

  ExternalId?: string;

  Duration?: number;

  DrmLicenseServer?: string;

  DrmToken?: string;

  DrmType?: string;

  DrmCdmData?: string;

  AdsOptions?: IMediaAdvertisementOptionsModel;

  Subtitles?: IMediaSubtitleModel[];

  Headers?: IRestrictedContentHeaderModel[];

  Cookies?: IRestrictedContentCookieModel[];

  NextMediaId?: number;

  TextTracks?: TextTrack[];
}
