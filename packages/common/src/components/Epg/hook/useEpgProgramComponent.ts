/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useCallback, useMemo } from "react";

import { MediaStreamType } from "../../../enums";
import { RouteHelper, TimeHelper } from "../../../helpers";
import { useEpgContent } from "../context";
import { TimelineChannel, TimelineProgram } from "../types";

interface useEpgProgramComponentParams {
  timelineProgram: TimelineProgram;
}

const TIME_FORMAT = "HH:mm";

export const useEpgProgramComponent = (
  params: useEpgProgramComponentParams
) => {
  const { timelineProgram } = params;

  const { program } = timelineProgram;
  const { till, since } = program;

  const { channels } = useEpgContent();

  const channel = useMemo(
    (): TimelineChannel =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      channels.find((channel) => channel.channel.id === program.channelId)!,
    [channels]
  );

  const [sinceTime, tillTime] = useMemo(() => {
    const sinceTime = TimeHelper.format(since, TIME_FORMAT);
    const tillTime = TimeHelper.format(till, TIME_FORMAT);

    return [sinceTime, tillTime];
  }, [since, till]);

  const handleOnClick = useCallback(() => {
    const currentTime = TimeHelper.getCurrentDateTime();
    const isCurrentProgram = TimeHelper.isBetween(currentTime, since, till);
    const isFutureProgram = TimeHelper.isAfterCurrent(since);

    const params = {
      streamType: MediaStreamType.Main,
    };

    switch (true) {
      case isCurrentProgram:
        return RouteHelper.goToPlayer(
          { Id: channel.channel.id as number },
          false,
          params
        );
      case isFutureProgram:
        return RouteHelper.goToDetails({ Id: program.id as number });
      default:
        return RouteHelper.goToPlayer(
          { Id: program.id as number },
          false,
          params
        );
    }
  }, [program]);

  return {
    sinceTime,
    tillTime,
    handleOnClick,
  };
};
