/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { IAssetInAssetModel } from "models";

export interface IAssetInAssetSearchResponseModel {
  Entities: IAssetInAssetModel[];
  PageNumber: number;
  PageSize: number;
  TotalCount: number;
}
