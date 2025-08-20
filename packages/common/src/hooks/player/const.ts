/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { MediaType } from "../../enums";

export const CONTINUE_WATCHING_PLAYBACK_UPDATE_SECONDS = 30;
export const CONTINUE_WATCHING_IGNORE_BEFORE_SECONDS = 10;
export const CONTINUE_WATCHING_SUPPORTED_MEDIA = [
  MediaType.Album,
  MediaType.Episode,
  MediaType.Podcast,
  MediaType.Video,
];
