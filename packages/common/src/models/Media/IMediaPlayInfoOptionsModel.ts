/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { MediaStreamType } from "../../enums";

export interface IMediaPlayInfoOptionsModel {
  MediaId: number;

  StreamType?: MediaStreamType;

  QueryParams?: { [key: string]: string | number | boolean };
}
