/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ISearchFilterModelBase } from "../../models";

export interface IMediaSearchMediaInMediaFilterModel
  extends ISearchFilterModelBase {
  MediaParentId?: number;

  Types?: string[];

  IncludeCategories?: boolean;

  IncludeImages?: boolean;
}
