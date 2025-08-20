/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { TimeHelper } from "../../../helpers";

interface generateDatesParams {
  count: number;
  origin: Date;
  backward?: boolean;
}

export const generateDates = (params: generateDatesParams) => {
  return new Array(params.count)
    .fill("")
    .map((_, index) =>
      TimeHelper.getDateWithOffset(
        params.origin,
        (params.backward ? -1 : 1) * (index + 1),
        "day"
      )
    );
};

export const diffMinutes = (end: Date, start: Date): number =>
  Math.round((end.getTime() - start.getTime()) / 60000);
