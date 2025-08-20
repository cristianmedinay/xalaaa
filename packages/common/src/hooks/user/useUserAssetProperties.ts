/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useEffect, useState } from "react";

import { StorageHelper } from "../../helpers";
import { IUserAssetPropertiesModel } from "../../models";

export const useUserAssetProperties = (assetId: number | undefined) => {
  const [assetProperties, setAssetProperties] = useState<
    IUserAssetPropertiesModel | undefined
  >(undefined);

  useEffect(() => {
    let mounted = true;

    const loadStartPosition = async () => {
      const assetProperties =
        await StorageHelper.getUserAssetsProperties().then((assetsProperties) =>
          assetsProperties.find((item) => item.AssetId == assetId)
        );

      if (assetProperties) {
        mounted && setAssetProperties(assetProperties);
      }
    };

    assetId && loadStartPosition().then();

    return () => {
      mounted = false;
    };
  }, [assetId]);

  return {
    assetProperties,
  };
};
