/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { useCallback, useState } from "react";

import { TimeHelper } from "../../../helpers";
import { EpgChannel, EpgProgram } from "../types";

import { EpgLoaderValue } from "./types";

const mockCurrentDay = 25;

interface useEpgMockLoaderParams<C, P> {
  channelsMock: C;
  programsMock: P;
}

// Epg mock loader that converts json mock data as current day data
export const useEpgMockLoader = <C extends any[], P extends any[]>(
  params: useEpgMockLoaderParams<C, P>
): EpgLoaderValue => {
  const { channelsMock, programsMock } = params;

  const [channels, setChannels] = useState<EpgChannel[]>([]);
  const [programs, setPrograms] = useState<EpgProgram[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getChannels = async (day: Date): Promise<EpgChannel[]> =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(
            channelsMock.map((channel, index) => {
              return {
                ...channel,
                index,
                title: `${day.getDate()} ${channel.title}`,
              };
            })
          ),
        400
      )
    );

  const getPrograms = async (day: Date): Promise<EpgProgram[]> =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(
            programsMock.map((program) => {
              const baseSince = TimeHelper.getDateTime(program.since);
              const baseTill = TimeHelper.getDateTime(program.till);

              let preparedSince = TimeHelper.replaceTime(day, baseSince);
              let preparedTill = TimeHelper.replaceTime(day, baseTill);

              if (baseSince.getDate() > mockCurrentDay) {
                preparedSince = TimeHelper.getDateWithOffset(
                  preparedSince,
                  1,
                  "day"
                );
              }

              if (baseSince.getDate() < mockCurrentDay) {
                preparedSince = TimeHelper.getDateWithOffset(
                  preparedSince,
                  -1,
                  "day"
                );
              }

              if (baseTill.getDate() > mockCurrentDay) {
                preparedTill = TimeHelper.getDateWithOffset(
                  preparedTill,
                  1,
                  "day"
                );
              }

              if (baseTill.getDate() < mockCurrentDay) {
                preparedTill = TimeHelper.getDateWithOffset(
                  preparedTill,
                  -1,
                  "day"
                );
              }

              return {
                ...program,
                title: `${day.getDate()} ${program.title}`,
                since: preparedSince,
                till: preparedTill,
              };
            })
          ),
        500
      )
    );

  const load = useCallback(async (day: Date) => {
    setIsLoading(true);

    const channels = await getChannels(day);
    const programs = await getPrograms(day);

    setChannels(channels);
    setPrograms(programs);

    setIsLoading(false);
  }, []);

  return { isLoading, channels, programs, load };
};
