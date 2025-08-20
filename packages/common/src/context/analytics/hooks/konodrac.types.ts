/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

export interface IGetEnvVariables {
  DEFAULT_DATASET_ID: string;
  DEFAULT_CHANNEL_NAME: string;
  DEFAULT_CHANNEL_ID: string;
  isEnabled: boolean;
}
export interface IMobileMediaEvent {
  datasetid: string | undefined;
  channel: string;
  channelId: string;
  pageType: string;
  cid: string;
  programId: string;
  playerStatus: string;
  secsPlayed: number;
  fullScreenStatus: boolean;
  muteStatus: boolean;
  mediaType: string;
  mediaDuration: number;
  mediaName: string;
  mediaUrl: string;
  mediaResolution: [number, number];
  currentPosition: number;
  bufferPercentage: number;
  playbackRate: number;
  assetId: string;
  eventType: string;
  userAgent?: string;
}
