/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import {
  DataProvider,
  IAssetInAssetModel,
  IAssetPriceModel,
  IErrorModel,
  RecordStatus,
} from "@xala/common";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Message } from "components";
import { PriceValue } from "components/AssetPaymentFieldList";
import { PillType } from "components/Pill";

interface ISubmitPricingProps {
  AvailableFrom: string;
  AvailableTo?: string;
  assetPrices: Required<PriceValue>[];
  subscription: PillType[];
  assetId: number;
}

interface IUseAssetPricesProps {
  assetId: number;
  onFinish?: () => void;
}

interface IUseAssetPricesReturn {
  submitPricing: (inputValues: ISubmitPricingProps) => void;
  errors: React.ReactElement[];
  initialPrices: IAssetPriceModel[];
  changeEventToFree: () => void;
}

export const useAssetPrices = ({
  assetId,
  onFinish,
}: IUseAssetPricesProps): IUseAssetPricesReturn => {
  const [initialPrices, setInitialPrices] = useState<IAssetPriceModel[]>([]);
  const [initialPackagesIdsList, setInitialPackagesIdsList] = useState<
    number[]
  >([]);
  const [errors, setErrors] = useState<React.ReactElement[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    let isSubscribed = true;

    DataProvider.searchAssetPriceCollection({
      IncludeCount: true,
      PageNumber: 1,
      PageSize: 10,
      AssetId: assetId,
    }).then((response) => {
      isSubscribed && setInitialPrices(response.Entities);
    });

    DataProvider.searchAssetsInAssets({
      FullTextSearch: "",
      IncludeCount: true,
      PageNumber: 1,
      PageSize: 15,
      AssetId: assetId,
    }).then((response) => {
      isSubscribed &&
        setInitialPackagesIdsList(
          response.Entities.filter(
            (entity) => entity.AssetParentTypeCode === "PACKAGE"
          ).map((entity) => entity.AssetParentId)
        );
    });

    return () => {
      isSubscribed = false;
    };
  }, [assetId]);

  const submitPricing = (inputValues: ISubmitPricingProps) => {
    const { assetId } = inputValues;

    const assetPricesData: IAssetPriceModel[] = inputValues.assetPrices.map(
      (assetPrice: Required<PriceValue>) => {
        const existingPrice = initialPrices.find(
          (price) =>
            price.AssetPurchasePeriodTypeCode ===
            assetPrice.AssetPurchasePeriodTypeCode
        );

        if (existingPrice) {
          return {
            ...existingPrice,
            ...assetPrice,
            RecordStatus: RecordStatus.Updated,
          };
        } else {
          return {
            ...assetPrice,
            AssetId: inputValues.assetId,
            Id: -1,
            AvailableFrom: inputValues.AvailableFrom,
            AvailableTo: inputValues.AvailableTo,
            RecordStatus: RecordStatus.Inserted,
          };
        }
      }
    );

    const deletedPricesData: IAssetPriceModel[] = initialPrices
      .map((price) => {
        const assetPricesDataTypes = assetPricesData.map(
          (data: IAssetPriceModel) => data.AssetPurchasePeriodTypeCode
        );

        if (!assetPricesDataTypes.includes(price.AssetPurchasePeriodTypeCode)) {
          return {
            ...price,
            RecordStatus: RecordStatus.Deleted,
          };
        } else {
          return price;
        }
      })
      .filter((instance) => instance.RecordStatus === RecordStatus.Deleted);

    const mappedPrices = assetPricesData.map(
      (price) => `${price.AssetPurchasePeriodTypeCode}-${price.CurrencyId}`
    );

    if (checkForDuplicates(mappedPrices)) {
      setErrors([t("VALIDATION__DUPLICATED_PRICES_FOR_THE_SAME_CURRENCY")]);
    } else {
      setErrors([]);
      DataProvider.saveAssetPriceCollection([
        ...assetPricesData,
        ...deletedPricesData,
      ])
        .then(() => {
          onFinish && onFinish();
        })
        .catch((error: IErrorModel) => {
          const { MessageKey } = error;

          if (Array.isArray(MessageKey)) {
            MessageKey.map((error) => Message.error(t(error)));
          } else {
            Message.error(t(MessageKey ?? "MODEL_VALIDATION_ERROR"));
          }
        });

      const updatedPackagesIdList = inputValues.subscription.map(
        (element) => element.id
      );

      const packagesPayload: IAssetInAssetModel[] = [
        ...initialPackagesIdsList,
        ...updatedPackagesIdList,
      ].map((valueID) => {
        const isOnInitial = initialPackagesIdsList.includes(valueID);
        const isOnUpdated = updatedPackagesIdList.includes(valueID);

        return {
          AssetParentId: valueID,
          AssetId: assetId,
          RecordStatus: getRecordStatusForList(isOnInitial, isOnUpdated),
        };
      });

      DataProvider.saveAssetInAssetCollection(packagesPayload).catch(
        (error: IErrorModel) => {
          const { MessageKey } = error;

          if (Array.isArray(MessageKey)) {
            MessageKey.map((error) => Message.error(t(error)));
          } else {
            Message.error(t(MessageKey ?? "MODEL_VALIDATION_ERROR"));
          }
        }
      );
    }
  };

  const changeEventToFree = () => {
    if (initialPrices.length > 0) {
      const deletedPricesData = initialPrices
        .map((price) => {
          return {
            ...price,
            RecordStatus: RecordStatus.Deleted,
          };
        })
        .filter((instance) => instance !== undefined);
      DataProvider.saveAssetPriceCollection(deletedPricesData).catch(
        (error: IErrorModel) => {
          const { MessageKey } = error;

          if (Array.isArray(MessageKey)) {
            MessageKey.map((error) => Message.error(t(error)));
          } else {
            Message.error(t(MessageKey ?? "MODEL_VALIDATION_ERROR"));
          }
        }
      );
    }
  };

  return {
    submitPricing,
    errors,
    initialPrices,
    changeEventToFree,
  };
};

const checkForDuplicates = <T>(array: Array<T>): boolean => {
  return array.some((element, index) => {
    return array.indexOf(element) !== index;
  });
};

const getRecordStatusForList = (
  isOnInitial: boolean,
  isOnUpdated: boolean
): RecordStatus => {
  if (!isOnInitial && isOnUpdated) {
    return RecordStatus.Inserted;
  } else if (isOnInitial && isOnUpdated) {
    return RecordStatus.Updated;
  } else if (isOnInitial && !isOnUpdated) {
    return RecordStatus.Deleted;
  } else {
    return RecordStatus.NoChange;
  }
};
