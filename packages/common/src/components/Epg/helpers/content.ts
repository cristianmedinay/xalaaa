/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  EpgChannel,
  EpgProgram,
  TimelineChannel,
  TimelineProgram,
} from "../types";

import { calculateChannelPosition, calculateProgramPosition } from "./position";

interface prepareTimelineChannelsParams {
  channels: EpgChannel[];
  height: number;
}

export const prepareTimelineChannels = (
  params: prepareTimelineChannelsParams
): TimelineChannel[] =>
  params.channels.map((channel, index) => ({
    channel,
    position: calculateChannelPosition({ index, height: params.height }),
  }));

interface prepareTimelineProgramsParams {
  channels: EpgChannel[];
  programs: EpgProgram[];
  startDate: Date;
  endDate: Date;
  lineHeight: number;
  hourWidth: number;
}

export const prepareTimelinePrograms = (
  params: prepareTimelineProgramsParams
): TimelineProgram[] =>
  params.programs
    .map((program) => {
      const channelIndex = params.channels.findIndex(
        ({ id }) => program.channelId === id
      );

      return {
        program,
        position: calculateProgramPosition({
          program,
          channelIndex,
          ...params,
        }),
      };
    })
    .filter((program) => program.position.width > 0);
