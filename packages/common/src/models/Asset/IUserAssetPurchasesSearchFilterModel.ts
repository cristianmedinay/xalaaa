/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ISearchFilterModelBase } from "../Common";

export interface IUserAssetPurchasesSearchFilterModel
  extends ISearchFilterModelBase {
  UserId?: number;

  AssetId?: number;

  AssetTitle?: string;

  AssetTypes?: string[];

  UpToDate?: boolean;
}
