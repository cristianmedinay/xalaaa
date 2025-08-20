/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useDispatch } from "react-redux";

import { IMediaSearchFilterModel } from "../../models";
import { MediaStore } from "../../store";

export const useSearchMedia = () => {
  const dispatch = useDispatch();

  return (filter: IMediaSearchFilterModel) => {
    return dispatch(
      MediaStore.Actions.searchMedia({
        IncludeCategories: true,
        IncludeImages: true,
        PageSize: 12,
        ...filter,
      })
    );
  };
};
