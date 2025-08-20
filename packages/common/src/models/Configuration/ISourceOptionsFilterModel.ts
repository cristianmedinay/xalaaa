/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ISearchFilterModelBase } from "../../models";

export interface ISourceOptionsFilterModel extends ISearchFilterModelBase {
  SourceId: number;

  IncludeCategories?: boolean;

  IncludeAssets?: boolean;

  IncludeImages?: boolean;
}
