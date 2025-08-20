/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
export interface IInsertAssetRequestModel {
  Title: string;

  AssetTypeCode: string;

  AssetAgeRestrictionValueMin: number;

  File: Blob;
}
