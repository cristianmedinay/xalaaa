/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useMemo } from "react";

import { TimeHelper } from "../../helpers";
import { IMediaModel } from "../../models";

export const useIsPlayerAvailable = (media: IMediaModel | undefined) => {
  const { isAvailable, isSourceAvailable, isStreamable } = useMemo(() => {
    if (!media) {
      return {
        isStreamable: false,
        isAvailable: false,
        isSourceAvailable: false,
      };
    }
    const isStreamable = media.StreamingPermission;

    const isAvailable =
      media.IsPlayable ?? (media.StartDateTime && media.EndDateTime)
        ? TimeHelper.isCurrentBetween(media.StartDateTime, media.EndDateTime)
        : true;

    const isSourceAvailable = media.UrlSource !== "";

    return { isStreamable, isAvailable, isSourceAvailable };
  }, [media]);

  return {
    isAvailable,
    isSourceAvailable,
    isStreamable,
  };
};
