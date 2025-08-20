/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import {
  EpgProgram,
  TimelineProgramPosition,
  TimelineVerticalPosition,
} from "../types";

import { diffMinutes } from "./date";
import { getMinutesWidth } from "./size";

interface getPositionXParams {
  since: Date;
  till: Date;
  startDate: Date;
  endDate: Date;
  hourWidth: number;
}

export const getPositionX = (params: getPositionXParams): number => {
  const { since, till, startDate, endDate, hourWidth } = params;

  const isTomorrow = till.getTime() > endDate.getTime();
  const isYesterday = since.getTime() < startDate.getTime();

  if (isYesterday && isTomorrow) {
    const minutes = diffMinutes(endDate, startDate);

    return getMinutesWidth(minutes, hourWidth);
  }

  if (isYesterday) {
    const minutes = diffMinutes(till, startDate);

    return getMinutesWidth(minutes, hourWidth);
  }

  if (isTomorrow) {
    const minutes = diffMinutes(endDate, since);

    if (minutes < 0) return 0;

    return getMinutesWidth(minutes, hourWidth);
  }

  const minutes = diffMinutes(till, since);

  return getMinutesWidth(minutes, hourWidth);
};

interface calculateChannelPositionParams {
  index: number;
  height: number;
}

export const calculateChannelPosition = (
  params: calculateChannelPositionParams
): TimelineVerticalPosition => {
  const top = params.height * params.index;

  return {
    top,
    height: params.height,
  };
};

interface calculateProgramPositionParams {
  program: EpgProgram;
  startDate: Date;
  endDate: Date;
  channelIndex: number;
  lineHeight: number;
  hourWidth: number;
}

export const calculateProgramPosition = (
  params: calculateProgramPositionParams
): TimelineProgramPosition => {
  const { program, startDate, endDate, channelIndex, lineHeight, hourWidth } =
    params;

  const since = new Date(program.since);
  const till = new Date(program.till);

  // remove seconds and milliseconds for stable position calculation
  since.setSeconds(0, 0);
  till.setSeconds(0, 0);

  const isYesterday = startDate.getTime() > since.getTime();
  const top = lineHeight * channelIndex;

  const width =
    top < 0 ? 0 : getPositionX({ since, till, startDate, endDate, hourWidth });

  const left = isYesterday
    ? 0
    : getPositionX({
        since: startDate,
        till: since,
        startDate,
        endDate,
        hourWidth,
      });

  const edgeEnd = getPositionX({
    since: startDate,
    till,
    startDate,
    endDate,
    hourWidth,
  });

  return {
    width,
    height: lineHeight,
    top,
    left,
    edgeEnd,
  };
};
