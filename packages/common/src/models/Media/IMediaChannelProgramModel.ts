/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { IMediaModel } from "./IMediaModel";

export interface IMediaChannelProgramModel extends IMediaModel {
  IsLoading?: boolean;

  PageNumber?: number;

  TotalCount?: number;
}
