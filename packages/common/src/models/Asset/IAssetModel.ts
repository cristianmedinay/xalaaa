/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { AssetType } from "../../enums";
import { ISimpleKeyModelBase, UploadFileInfoModel } from "../Common";

import { IAssetCategoryModel } from "./IAssetCategoryModel";
import { IAssetContentModel } from "./IAssetContentModel";
import { IAssetEventPaymentModel } from "./IAssetEventPaymentModel";
import { IAssetImageModel } from "./IAssetImageModel";
import { IPersonInAssetModel } from "./IPersonInAssetModel";

export interface IAssetModel extends ISimpleKeyModelBase {
  Guid?: string;

  AssetTypeCode?: AssetType;

  AssetTypeDisplayName?: string;

  AssetAgeRestrictionValueMin?: number;

  AssetAgeRestrictionImageUrl?: string;

  Title?: string;

  Description?: string;

  ShortDescription?: string;

  LongDescription?: string;

  Year?: number;

  DurationMiliseconds?: number;

  ContentStatusCode?: string;

  ContentStatusDisplayName?: string;

  Progress?: number;

  ContentUrl?: string;

  ContentRelativeUrl?: string;

  ParentAssetId?: number;

  ParentAssetTitle?: string;

  OrderInParent?: number;

  ExternalSource?: string;

  ExternalId?: string;

  AvailableFrom?: Date;

  AvailableTo?: Date;

  CreatorUserId?: string;

  CreatorUserFullName?: string;

  CreatorUserAvatarUrl?: string;

  CreatorProfiles?: string[];

  Categories?: IAssetCategoryModel[];

  People?: IPersonInAssetModel[];

  StartDateTime?: string;

  EndDateTime?: string;

  Images?: IAssetImageModel[];

  Contents?: IAssetContentModel[];

  Assets?: IAssetModel[];

  SimilarAssets?: IAssetModel[];

  Autoplay?: boolean;

  UploadInfo?: UploadFileInfoModel;

  Payment?: IAssetEventPaymentModel;
}
