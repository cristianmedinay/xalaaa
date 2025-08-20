/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";

import { MediaType } from "../../enums";
import { IMediaModel } from "../../models";
import { StorageManager } from "../../services/StorageManager";
import { IAppState } from "../../store";

export const useStoreCurrentPlayerMetadata = (
  media: IMediaModel | undefined
) => {
  const channelsList = useSelector(
    (state: IAppState) => state.media.channelList.Entities,
    shallowEqual
  );

  const cleanCurrentPlayerMetadata = async () => {
    await StorageManager.deleteValue("currentPlayerMetadata");
  };

  const setCurrentPlayerMetadata = async () => {
    cleanCurrentPlayerMetadata();

    if (
      media?.MediaTypeCode === MediaType.Program ||
      media?.MediaTypeCode === MediaType.Channel
    ) {
      return await StorageManager.setValue("currentPlayerMetadata", {
        currentMedia: media,
        channels: channelsList.map((channel) => ({
          ...channel,
          SimilarMedia: channel.SimilarMedia?.map((media) => ({
            ...media,
            // Clear nested SimilarMedia since it's too big to save in local storage
            SimilarMedia: [],
          })),
        })),
      });
    } else {
      return await StorageManager.setValue("currentPlayerMetadata", {
        currentMedia: media,
        channels: [],
      });
    }
  };

  useEffect(() => {
    if (media) {
      setCurrentPlayerMetadata();
    }

    return () => {
      cleanCurrentPlayerMetadata();
    };
  }, [media]);
};
