/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import React from "react";

import { IMediaModel, LoginStatus } from "../../models";

import { IMobileMediaEvent } from "./hooks";

export enum KonodracEventTag {
  View = "0",
  ComponentView = "1",
  ViewHeartbeat = "2",
  MediaStart = "3",
  MediaPlay = "4",
  MediaPause = "5",
  MediaFinish = "6",
  MediaDispose = "7",
  MediaHeartbeat = "8",
  MediaSeek = "9",
  Share = "10",
  MediaError = "11",
  MediaLoadedData = "12",
  MediaFullScreen = "14",
  MediaMute = "15",
  Search = "20",
  LoginRequest = "21",
  LoginResponse = "22",
  ChangePassword = "23",
  RecoverPassword = "24",
  RequestPasswordRecovery = "25",
  ValidatePasswordRecovery = "26",
  SignOn = "27",
  Register = "28",
  RecoClick = "29",
  EmailValidation = "30",
  Logout = "31",
  ProfileUpdate = "32",
}

export type AnalyticsSystem = "web" | "smarttv" | "mobile";

export interface AnalyticsProviderProps {
  system: AnalyticsSystem;
  children: React.ReactNode;
  version: string;
}

export interface usePlayerEventsParams {
  datasetid: string;
  channel: string | undefined;
  channelId: string | undefined;
  pageType: string;
  programId: string;
  cid: string;
  playerStatus: string;
  secsPlayed: number;
  fullScreenStatus: boolean;
  muteStatus: boolean;
  mediaType: string;
  mediaDuration: number;
  mediaName: string;
  mediaUrl: string;
  mediaResolution: number[];
  currentPosition: number;
  bufferPercentage: number;
  playbackRate: number;
  assetId: string | undefined;
  topics: string[];
}

export interface KonodracEventDispatcher {
  view: (system: AnalyticsSystem) => boolean;
  componentView: () => void;
  heartbeat: () => boolean;
  mediaStart: (params: usePlayerEventsParams) => void;
  mediaPlay: (params: usePlayerEventsParams) => void;
  mediaPause: (params: usePlayerEventsParams) => void;
  mediaFinish: (params: usePlayerEventsParams) => void;
  mediaSeek: (params: usePlayerEventsParams) => void;
  share: () => void;
  mediaDispose: (params: usePlayerEventsParams) => void;
  mediaHeartbeat: (params: usePlayerEventsParams) => void;
  mediaError: (params: usePlayerEventsParams) => void;
  mediaLoadedData: (params: usePlayerEventsParams) => void;
  mediaFullScreen: (params: usePlayerEventsParams) => void;
  mediaMute: (params: usePlayerEventsParams) => void;
  search: (searchValue: string) => void;
  loginRequest: () => void;
  loginResponse: (status: LoginStatus, userId?: number) => void;
  signOn: () => void;
  changePassword: () => void;
  recoverPassword: () => void;
  requestPasswordRecovery: () => void;
  validatePasswordRecovery: () => void;
  register: () => void;
  recoClick: (media: IMediaModel) => void;
  emailValidation: () => void;
  logout: () => void;
  profileUpdate: () => void;
  mobileMediaEvent: (eventPayload: IMobileMediaEvent) => void;
}
