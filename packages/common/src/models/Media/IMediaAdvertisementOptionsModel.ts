/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { MediaAdvertisementType } from "../../enums";

export interface IMediaAdvertisementOptionsModel {
  Type: MediaAdvertisementType;

  Url: string;
}
