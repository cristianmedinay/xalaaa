/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { MediaStreamType } from "enums";
import { MediaType } from "../../enums/Media/MediaType";
import { IActionModel } from "../Configuration";

import { IMediaCategoryModel } from "./IMediaCategoryModel";
import { IMediaImageModel } from "./IMediaImageModel";
import { IMediaPersonModel } from "./IMediaPersonModel";
import { IMediaProductModel } from "./IMediaProductModel";
import { IMediaPurchaseOfferModel } from "./IMediaPurchaseOfferModel";
import { IMediaStatisticsOptionsModel } from "./IMediaStatisticsOptionsModel";
import { INotCompletedPayment } from "./INotCompletedPayment";
import { IRecoModel } from "./IRecoModel";

export interface IMediaModel {
  Id: number;

  Guid?: string;

  MediaTypeCode?: MediaType;

  MediaTypeDisplayName?: string;

  MediaAgeRestrictionValueMin?: number;

  MediaAgeRestrictionImageUrl?: string;

  ExternalId?: string;

  ExternalSource?: string;

  Title?: string;

  Description?: string;

  ShortDescription?: string;

  LongDescription?: string;

  Year?: number;

  YearNext?: string;

  Duration?: number;

  ContentUrl?: string;

  ParentMediaId?: number;

  ParentMediaTitle?: string;

  ParentOrderInParent?: number;

  ParentMediaTypeCode?: MediaType;

  OrderInParent?: number;

  AssetDatesVisible?: boolean;

  AvailableFrom?: Date;

  AvailableTo?: Date;

  StartDateTime?: string;

  EndDateTime?: string;

  EventDateTime?: string;

  Categories?: IMediaCategoryModel[];

  People?: IMediaPersonModel[];

  Images?: IMediaImageModel[];

  IsFree?: boolean;

  IsPlayable?: boolean;

  IsTrialContentAvailable?: boolean;

  Media?: IMediaModel[];

  SimilarMedia?: IMediaModel[];

  PurchaseOffers?: IMediaPurchaseOfferModel[];

  Products?: IMediaProductModel[];

  StatisticsOptions?: IMediaStatisticsOptionsModel;

  Action?: IActionModel;

  Matadata?: {
    [key: string]: any;
  };

  NotCompletedPayment?: INotCompletedPayment;

  BCID?: string;

  ParentMedia?: IMediaModel;

  ParentMediaBCID?: string;

  RecoData?: IRecoModel;

  ChannelName?: string;

  ParentMediaExternalId?: string;

  UrlSource?: string;

  Label?: string;

  // Brightcove integration specific field, should hide play button when false
  // Also when false, get media play info will return HTTP 422 error
  StreamingPermission?: boolean;

  Genre?: string;

  AdvertisingTags?: string[];

  IsPromoContentAvailable?: boolean;

  EntityName?: string;

  EntityBCID?: string;

  AllowUnregistered?: boolean;

  AbsoluteParentMedia?: IMediaModel;

  AbsoluteParentMediaTitle?: string;

  MediaStreamType?: MediaStreamType;
}
