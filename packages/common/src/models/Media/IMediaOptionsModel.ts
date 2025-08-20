/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { MediaType } from "../../enums";

export interface IMediaOptionsModel {
  MediaId: number;

  IncludeCategories?: boolean;

  IncludePeople?: boolean;

  IncludeImages?: boolean;

  IncludeSimilarMedia?: boolean;

  IncludeParent?: boolean;

  IncludePurchaseOffers?: boolean;

  AssetType?: MediaType;

  OngoingNow?: boolean;

  QueryParams?: { [key: string]: string | number | boolean };
}
