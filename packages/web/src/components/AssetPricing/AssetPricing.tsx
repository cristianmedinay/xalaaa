/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import {
  DataProvider,
  IAssetPriceModel,
  IAssetPurchasePeriodTypeModel,
  ICurrencyModel,
  IErrorModel,
  IFormValues,
  useDataLoader,
} from "@xala/common";
import { FormInstance } from "rc-field-form";
import React from "react";
import { useTranslation } from "react-i18next";

import { Message } from "components";
import {
  AssetPaymentFieldList,
  PriceValue,
} from "components/AssetPaymentFieldList";

import { AssetSubscriptionsPills } from "../AssetSubscriptionsPills/AssetSubscriptionsPills";

interface IAssetPricingProps {
  catchupId?: number;
  initialPrices: IAssetPriceModel[];
  form: FormInstance<IFormValues>;
  errors: React.ReactElement[];
}

export const AssetPricing = ({
  catchupId,
  initialPrices,
  form,
  errors,
}: IAssetPricingProps) => {
  const { t } = useTranslation();

  const { data: purchaseTypes } = useDataLoader<
    IAssetPurchasePeriodTypeModel[],
    IErrorModel
  >({
    loader: () =>
      DataProvider.selectPurchasePeriodType()
        .then((response: IAssetPurchasePeriodTypeModel[]) => {
          return {
            ok: true,
            data: response,
            error: {},
          };
        })
        .catch((error) => {
          const { MessageKey } = error;

          if (Array.isArray(MessageKey)) {
            MessageKey.map((error) => Message.error(t(error)));
          } else {
            Message.error(t(MessageKey ?? "MODEL_VALIDATION_ERROR"));
          }

          return {
            ok: false,
            error: error,
          };
        }),
    deps: [],
  });

  const { data: currencies } = useDataLoader<ICurrencyModel[], IErrorModel>({
    loader: () =>
      DataProvider.selectCurrency()
        .then((response: ICurrencyModel[]) => {
          return {
            ok: true,
            data: response,
            error: {},
          };
        })
        .catch((error) => {
          const { MessageKey } = error;

          if (Array.isArray(MessageKey)) {
            MessageKey.map((error) => Message.error(t(error)));
          } else {
            Message.error(t(MessageKey ?? "MODEL_VALIDATION_ERROR"));
          }

          return {
            ok: false,
            error: error,
          };
        }),
    deps: [],
  });

  return (
    <>
      <AssetPaymentFieldList
        listName="assetPrices"
        label={t("MEDIA_CREATOR__CATCHUP__ADD_ASSET_PRICE", "Add asset price")}
        initialValue={initialPrices.map((price) => {
          return {
            Price: price.Price,
            AssetPurchasePeriodTypeCode: price.AssetPurchasePeriodTypeCode,
            CurrencyId: price.CurrencyId,
          } as PriceValue;
        })}
        {...{ purchaseTypes, currencies }}
      />

      <ul className="Error">
        {errors.map((error: React.ReactNode, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>

      <AssetSubscriptionsPills assetId={catchupId} form={form} />
    </>
  );
};
