/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IMediaModel, useMediaByIdSelector } from "@xala/common";
import { useLocation, useParams } from "react-router";

export interface IMediaDetailsParams {
  id: string;
}

export interface IMediaDetailsLocationState {
  media?: IMediaModel;
}

export const useMediaDetailsMediaSelector = () => {
  const params = useParams<IMediaDetailsParams>();

  const location = useLocation<IMediaDetailsLocationState>();
  const media = useMediaByIdSelector(params.id ?? -1);

  if (media.Media?.Title) {
    return media.Media;
  }

  return location?.state?.media;
};

export const useMediaDetailsLoadingSelector = () => {
  const params = useParams<IMediaDetailsParams>();
  const media = useMediaByIdSelector(params.id ?? -1);

  return media.IsLoading;
};
