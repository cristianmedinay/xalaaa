/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useDispatch } from "react-redux";

import { IMediaSearchMediaInMediaFilterModel } from "../../models";
import { MediaStore } from "../../store";

export const useSearchMediaInMedia = () => {
  const dispatch = useDispatch();

  const searchMediaInMedia = (filter: IMediaSearchMediaInMediaFilterModel) => {
    return dispatch(
      MediaStore.Actions.searchMediaInMedia({
        PageNumber: 1,
        PageSize: 12,
        IncludeCount: true,
        IncludeImages: true,
        ...filter,
      })
    );
  };

  return searchMediaInMedia;
};
