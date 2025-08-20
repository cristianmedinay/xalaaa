/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { AssetType } from "enums";

import {
  IAssetCategoryModel,
  IAssetContentModel,
  IAssetEventPaymentModel,
  IAssetImageModel,
  IAssetModel,
  IPersonInAssetModel,
} from "../Asset";
import { UploadFileInfoModel } from "../Common";

import { IMediaModel } from "./IMediaModel";

export interface IMediaChannelsForUserModel {
  AssetAccessTypeCode: string;

  AssetTypeCode: AssetType;

  AssetTypeDisplayName: string;

  AssetAgeRestrictionValueMin: number;

  AssetAgeRestrictionImageUrl: string;

  Title: string;

  Description: string;

  Year?: string;

  DurationMiliseconds?: number;

  ContentStatusCode: string;

  ContentStatusDisplayName: string;

  ContentUrl: string;

  ContentRelativeUrl?: string;

  ExternalSource: string;

  ExternalId: string;

  ParentAssetId?: string;

  ParentAssetTitle: string;

  OrderInParent?: number;

  AvailableFrom?: Date;

  AvailableTo?: Date;

  StartDateTime?: Date;

  EndDateTime?: Date;

  LastModificationDate: Date;

  CreatorUserId?: number;

  CreatorUserFullName: string;

  CreatorUserAvatarUrl: string;

  CreationDate: Date;

  CreatorProfiles: string;

  People: IPersonInAssetModel[];

  Categories: IAssetCategoryModel[];

  Images: IAssetImageModel[];

  Contents: IAssetContentModel[];

  Assets: IAssetModel[];

  Payment: IAssetEventPaymentModel;

  UploadInfo: UploadFileInfoModel;

  LongDescription: string;

  ShortDescription: string;

  IsFree: string;

  IsPremium: string;

  Tags: any[];

  AdvertisingTags: any[];

  ReferenceId: number;

  LanguageId: number;

  IsDraft: boolean;

  Captions: boolean;

  BCID: string;

  Label: string;

  Nationality: string;

  YearText: string;

  Gender: string;

  Subtitles: string;

  SimilarMedia?: IMediaModel[];
}
