/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IListModelBase, IModelBase } from "../../models/Common";

import { ISourceOptionsFilterModel } from "./ISourceOptionsFilterModel";

export interface ISourceListModel<T extends IModelBase = Record<string, string>>
  extends IListModelBase<T, ISourceOptionsFilterModel> {
  CacheDataValidTo?: Date;
}
