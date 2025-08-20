/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useEffect, useState } from "react";

import { MediaStreamType } from "../../enums";
import { StorageHelper } from "../../helpers";
import { IMediaPlayInfoModel } from "../../models/Media";

import {
  assetTimestampToSeconds,
  isContinueWatchingAvailable,
} from "./helpers";

interface useContinueWatchingResumeParams {
  streamType: MediaStreamType;
  mediaPlayInfo: IMediaPlayInfoModel;
}

export const useContinueWatchingResume = (
  params: useContinueWatchingResumeParams
) => {
  const {
    streamType,
    mediaPlayInfo: {
      Timestamp: resumeTimestamp,
      MediaId: mediaId,
      MediaTypeCode: mediaType,
    },
  } = params;

  const [startPosition, setStartPosition] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    const loadStartPosition = async () => {
      if (mediaType && isContinueWatchingAvailable(mediaType, streamType)) {
        // Use resume timestamp from media info response if available
        // Anonymous user does not send continue watching requests to API, so
        // this timestamp will be available only for authorized users
        if (resumeTimestamp) {
          return (
            mounted &&
            setStartPosition(assetTimestampToSeconds(resumeTimestamp))
          );
        }

        const assetProperties =
          await StorageHelper.getUserAssetsProperties().then(
            (assetsProperties) =>
              assetsProperties.find((item) => item.AssetId == mediaId)
          );

        // Use timestamp from user media properties if available
        if (assetProperties?.Timestamp) {
          mounted &&
            setStartPosition(
              assetTimestampToSeconds(assetProperties.Timestamp)
            );
        }
      }
    };

    loadStartPosition().then(() => setLoaded(true));

    return () => {
      mounted = false;
    };
  }, []);

  return {
    startPosition,
    loaded,
  };
};
