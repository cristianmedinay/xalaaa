/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { groupBy, map } from "lodash";
import { useEffect, useMemo } from "react";

import {
  useEpgConfiguration,
  useEpgContent,
  useEpgDay,
  useEpgScrollContainerDispatch,
} from "../context";

interface useEpgScrollBoxComponentParams {
  scrollBoxRef: React.Ref<HTMLDivElement>;
}

export const useEpgScrollBoxComponent = (
  params: useEpgScrollBoxComponentParams
) => {
  const { scrollBoxRef } = params;

  const { lineHeight } = useEpgConfiguration();
  const { programs, numChannels, isLoading } = useEpgContent();
  const { dayWidth } = useEpgDay();

  const { onScroll, onRestoreHorizontalScrollPosition } =
    useEpgScrollContainerDispatch();

  const height = useMemo(
    () => numChannels * lineHeight,
    [lineHeight, numChannels]
  );

  const groupedPrograms = useMemo(
    () =>
      map(
        groupBy(programs, (program) => program.position.top),
        (value, key) => ({ key, items: value })
      ),
    [programs]
  );

  useEffect(() => {
    if (scrollBoxRef && !isLoading) {
      onRestoreHorizontalScrollPosition();
    }
  }, [isLoading, onRestoreHorizontalScrollPosition, scrollBoxRef]);

  return {
    groupedPrograms,
    onScroll,
    height,
    dayWidth,
    isLoading,
  };
};
