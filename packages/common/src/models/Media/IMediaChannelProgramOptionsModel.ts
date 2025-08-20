/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ISearchFilterModelBase } from "../Common";

import { IMediaListOptionsModel } from "./IMediaListOptionsModel";

export interface IMediaChannelProgramOptionsModel
  extends ISearchFilterModelBase,
    Omit<IMediaListOptionsModel, "MediaListId"> {
  MediaIds?: number[];

  DaysCount?: number;
}
