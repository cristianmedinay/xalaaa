/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAuthResponseModel, ITokenModel } from "./Auth";
import { IConfigurationModel } from "./Configuration";
import {
  IMediaChannelsForUserModel,
  IMediaListModel,
  IMediaModel,
} from "./Media";
import { IUserStorageModel } from "./User";

export type UsersStorage = { [userId: number]: IUserStorageModel };

export type SourceStorage = { [sourceId: string]: IMediaListModel };

export type ChannelsStorage = {
  lastUpdateDate: Date;
  channels: Partial<IMediaChannelsForUserModel>[];
};

export interface CurrentPlayerMetadataStorage {
  currentMedia: IMediaModel;
  channels: IMediaChannelsForUserModel[];
}

export interface StorageContent {
  configuration?: IConfigurationModel;

  session?: ITokenModel;

  backendVersion?: IAuthResponseModel;

  userId?: number;

  users?: UsersStorage;

  osid?: string;

  language?: string;

  source?: SourceStorage;

  channels?: ChannelsStorage;

  eventsMonth?: string;

  podcasts?: string;

  svgIcons?: string;

  firebaseTokenFCM?: string;

  currentPlayerMetadata: CurrentPlayerMetadataStorage;

  TFCData?: string;

  appVersion?: string;

  userEmail?: string;

  isConfigUpdated?: boolean;
}
