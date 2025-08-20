/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { HTTP_METHOD } from "../../constants/http";

export interface IUploadFileInfoHeaderModel {
  Key: string;

  Value: string;
}

export class UploadFileInfoModel {
  public Url?: string;

  public Method?: typeof HTTP_METHOD;

  public Headers?: IUploadFileInfoHeaderModel[];

  public Path?: string;

  public AbsoluteUrl?: string;

  public Key?: string;
}
