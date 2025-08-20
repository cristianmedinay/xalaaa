/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { MediaImageType, PlatformType } from "../../enums";

export interface IMediaImageModel {
  Id?: number;

  MediaId?: number;

  PlatformCode?: PlatformType;

  ImageTypeCode?: MediaImageType;

  Url?: string;

  Width?: number;

  Height?: number;

  StorageSize?: number;
}
