/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import {
  CellType,
  ComponentType,
  IMediaModel,
  Orientation,
} from "@xala/common";
import React from "react";

import { ListComponentHorizontal } from "components";

interface EpisodesListProps {
  episodeList?: IMediaModel[];
}

export const EpisodesList = ({ episodeList }: EpisodesListProps) => {
  if (!episodeList || episodeList.length === 0) {
    return null;
  }

  return (
    <ListComponentHorizontal
      className="SeriesDetails__episode-list"
      component={{
        ComponentTypeCode: ComponentType.List,
        MediaList: episodeList,
        CellType: CellType.Frame,
        Orientation: Orientation.Horizontal,
        VisibleItemsCount: 4,
      }}
    />
  );
};
