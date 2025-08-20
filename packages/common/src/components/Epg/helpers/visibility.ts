/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { TimelineProgramPosition, TimelineVerticalPosition } from "../types";

interface isChannelVisibleParams {
  position: Pick<TimelineVerticalPosition, "top">;
  scrollY: number;
  containerHeight: number;
  itemOverscan: number;
}

export const isChannelVisible = (params: isChannelVisibleParams): boolean => {
  const { position, scrollY, containerHeight, itemOverscan } = params;

  const offset = itemOverscan * 3;

  switch (true) {
    case scrollY > position.top + offset:
      return false;
    case scrollY + containerHeight + offset <= position.top:
      return false;
    default:
      return true;
  }
};

interface isProgramVisibleParams {
  position: TimelineProgramPosition;
  scrollX: number;
  scrollY: number;
  containerHeight: number;
  containerWidth: number;
  itemOverscan: number;
}

export const isProgramVisible = (params: isProgramVisibleParams): boolean => {
  const {
    position,
    scrollX,
    scrollY,
    containerHeight,
    containerWidth,
    itemOverscan,
  } = params;

  switch (true) {
    case position.width <= 0:
      return false;
    case scrollY > position.top + itemOverscan * 3:
      return false;
    case scrollY + containerHeight <= position.top:
      return false;
    case scrollX + containerWidth >= position.left &&
      scrollX <= position.edgeEnd:
      return true;
    default:
      return false;
  }
};
