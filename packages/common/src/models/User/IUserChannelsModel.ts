/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IErrorModel } from "models/Common";
import { IMediaChannelsForUserModel } from "models/Media";

export interface IUserChannelsModel {
  Entities: Partial<IMediaChannelsForUserModel>[];
  isProcessing: boolean;
  Error?: IErrorModel;
}
