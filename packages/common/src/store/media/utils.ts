/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { TimeHelper } from "../../helpers";
import { IMediaListOptionsModel } from "../../models";

export const getDayKeyForEpgOptions = (
  options?: IMediaListOptionsModel
): string => {
  return options?.MediaOptions?.DateFrom
    ? TimeHelper.format(options.MediaOptions.DateFrom, "YYYY-MM-DD")
    : "ALL";
};
