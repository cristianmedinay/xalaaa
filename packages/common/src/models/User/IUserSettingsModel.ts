/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IErrorModel, IModelBase } from "../Common";
export interface IUserSettingsModel extends IModelBase {
  UserId?: number;

  LanguageId?: number;

  LanguageName?: string;

  Towns?: {
    Id: number;
    Name?: string;
  }[];

  Categories?: {
    Id: number;
    Name?: string;
  }[];

  Channels?: {
    Id: number;
    Name?: string;
  }[];

  Error?: IErrorModel;

  IsProcessing?: boolean;
}
