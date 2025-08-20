/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IErrorModel, ISearchFilterModelBase } from "../../../../../models";

import { ICreatorModel } from "./IUserFriendModel";

export interface ICreatorsListModel {
  Entities: ICreatorModel[];

  TotalCount: number;

  IsLoading?: boolean;

  Error?: IErrorModel;

  Filter?: ISearchFilterModelBase;

  PageNumber?: number;

  PageSize?: number;
}
