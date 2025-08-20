/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { SourceType } from "../../enums";
import { IErrorModel, ISearchFilterModelBase, ISourceData } from "../../models";

import { IMediaModel } from "./IMediaModel";
import { IMediaSearchCategories } from "./IMediaSearchCategories";
import { IMediaSearchFilterModel } from "./IMediaSearchFilterModel";
import { IRecoModel } from "./IRecoModel";

export interface IMediaListModel extends ISourceData, ISearchFilterModelBase {
  SourceType: typeof SourceType.MediaList;

  Entities: IMediaModel[];

  TotalCount: number;

  IsLoading?: boolean;

  Filter?: IMediaSearchFilterModel;

  Error?: IErrorModel;

  Sources?: { [key: string]: IMediaListModel };

  RecoData?: IRecoModel;

  channelList?: IMediaListModel;

  AllPagesCategories?: IMediaSearchCategories[];
}
