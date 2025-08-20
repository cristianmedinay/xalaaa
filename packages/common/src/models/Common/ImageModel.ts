/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { AssetImageType, PlatformType } from "../../enums";

import { IModelBase } from "./IModelBase";

export interface ImageModel extends IModelBase {
  Id?: number;

  Guid?: string;

  PlatformCode?: PlatformType;

  PlatformDisplayName?: string;

  AssetImageTypeCode?: AssetImageType;

  AssetImageTypeDisplayName?: string;

  Url?: string;

  Path?: string;

  File?: File;

  Title?: string;

  FileName?: string;

  Format?: string;

  Description?: string;

  Width?: number;

  Height?: number;

  StorageSize?: number;

  ExternalSource?: string;

  ExternalId?: string;
}
