/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IMediaContextOptionsModel } from "../Configuration";

import { IMediaModel } from "./IMediaModel";
import { IMediaPlayInfoModel } from "./IMediaPlayInfoModel";

export interface IMediaContextModel {
  Media?: IMediaModel;

  Options?: IMediaContextOptionsModel;

  MediaPlayInfo?: IMediaPlayInfoModel;
}
