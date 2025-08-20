/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IMediaModel } from "models";

import { MediaStreamType } from "../../enums";

export interface ISetAudioMediaPayload {
  media?: IMediaModel;
  streamType?: MediaStreamType;
}
