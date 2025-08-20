/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IListModelBase, IUserModel } from "../../../../../models";

import { IUsersSearchFilterModel } from "./IUsersSearchFilterModel";

export type IUsersListModel = IListModelBase<
  IUserModel,
  IUsersSearchFilterModel
>;
