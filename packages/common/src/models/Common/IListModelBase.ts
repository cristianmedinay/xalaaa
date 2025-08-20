/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IErrorModel } from "./IErrorModel";
import { ISearchFilterModelBase } from "./ISearchFilterModelBase";

export interface IListModelBase<
  T = Record<string, any>,
  TF extends ISearchFilterModelBase = Record<string, any>
> {
  Entities: T[];

  TotalCount: number;

  Filter?: TF;

  IsLoading?: boolean;

  Error?: IErrorModel;
}
