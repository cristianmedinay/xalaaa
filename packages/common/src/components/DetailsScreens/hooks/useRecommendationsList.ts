/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { CellType, ComponentType, Orientation } from "../../../enums";
import { IListComponentModel, IMediaModel } from "../../../models";

interface useRecommendationsListProps {
  loading?: boolean;
  media?: IMediaModel;
  visibleItemsCount: number;
  cellType: CellType;
  title?: string;
}

export const useRecommendationsList = ({
  loading,
  media,
  visibleItemsCount,
  cellType,
  title = "COMMON__MORE_LIKE_THIS",
}: useRecommendationsListProps) => {
  const { t } = useTranslation();

  const shouldRenderList =
    (media?.SimilarMedia && media?.SimilarMedia.length > 0) || loading;

  const recommendationsList = useMemo(() => {
    if (!shouldRenderList) {
      return null;
    }

    const list: IListComponentModel = {
      ComponentTypeCode: ComponentType.List,
      MediaList: media?.SimilarMedia?.map((listItem) => ({
        ...listItem,
        RecoData: media?.RecoData,
      })),
      CellType: cellType,
      Orientation: Orientation.Horizontal,
      VisibleItemsCount: visibleItemsCount,
      Title: t(title),
    };

    return list;
  }, [
    shouldRenderList,
    media?.SimilarMedia,
    media?.RecoData,
    visibleItemsCount,
    t,
  ]);

  return {
    recommendationsList,
  };
};
