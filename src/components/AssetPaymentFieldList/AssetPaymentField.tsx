/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  AssetPaymentInputCode,
  buildRequiredObjectSinglePropertyRule,
  IAssetPurchasePeriodTypeModel,
  ICurrencyModel,
} from "@xala/common";
import { Rule } from "rc-field-form/lib/interface";
import { ListField } from "rc-field-form/lib/List";
import React, { useEffect, useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import Trash from "../../resources/icons/trash.svg";
import { LabelField } from "../Form";
import { Option, Select } from "../Select";

import "./AssetPaymentFieldList.scss";

const selectStyles = { zIndex: 99999, backgroundColor: "#000000" };

export const paymentInitialValue: PriceValue = {
  Price: 1,
  CurrencyId: undefined,
  AssetPurchasePeriodTypeCode: undefined,
};

export interface PriceValue {
  Price: number;
  CurrencyId?: number;
  AssetPurchasePeriodTypeCode?: string;
}

export interface IAssetPaymentFiledProps {
  field: ListField;
  listName: string;
  purchaseTypes?: IAssetPurchasePeriodTypeModel[];
  availablePurchaseTypes: IAssetPurchasePeriodTypeModel[];
  addAvailablePurchaseTypes: () => void;
  getAvailablePurchaseTypes: (type: string) => void;
  currencies?: ICurrencyModel[];
  remove: (index: number | number[]) => void;
  onChange: (value: any) => void;
  value: PriceValue;
}

export const AssetPaymentFieldTemplate = ({
  field,
  addAvailablePurchaseTypes,
  availablePurchaseTypes,
  getAvailablePurchaseTypes,
  currencies,
  remove,
  onChange,
  value,
}: IAssetPaymentFiledProps) => {
  const { t } = useTranslation();
  const [purchase, setPurchase] = useState("");

  const handleChange = (newValue: string | number, field: string) => {
    onChange && onChange({ ...value, [field]: newValue });
  };

  const handleCurrencyChange = (
    newValue: string | number,
    minPrice?: number
  ) => {
    onChange &&
      onChange({
        ...value,
        CurrencyId: newValue,
        Price: minPrice || value.Price,
      });
  };

  const removeItem = (fieldNumber: number) => {
    addAvailablePurchaseTypes();
    remove(fieldNumber);
  };

  useEffect(() => {
    if (value.AssetPurchasePeriodTypeCode) {
      setPurchase(value.AssetPurchasePeriodTypeCode);
    }
  }, [value.AssetPurchasePeriodTypeCode]);

  useEffect(() => {
    getAvailablePurchaseTypes(purchase);
  }, [purchase]);

  const displayAvailablePurchaseTypes = useMemo(
    () =>
      availablePurchaseTypes.map(({ Code, TranslationKey, DisplayName }) => (
        <Option value={Code} key={Code} style={selectStyles}>
          {t(TranslationKey, DisplayName)}
        </Option>
      )),
    [availablePurchaseTypes]
  );

  return (
    <div className="asset-payment-field">
      <div className="required-select">
        <label>{t("PURCHASE_PERIOD_TIME", "Purchase period time")}</label>
        <Select<string>
          defaultValue={value?.AssetPurchasePeriodTypeCode}
          onChange={(val) => handleChange(val, "AssetPurchasePeriodTypeCode")}
          placeholder={t("PURCHASE_PERIOD_TIME_PLACEHOLDER", "Select period")}
        >
          {displayAvailablePurchaseTypes}
        </Select>
      </div>
      <div>
        <label>{t("PRICE", "Price")}</label>
        <input
          className="price-input"
          type="number"
          min={
            currencies?.find(({ Id }) => Id === value?.CurrencyId)?.MinPayment
          }
          onChange={(e) => handleChange(e.currentTarget.value, "Price")}
          value={
            value?.Price ||
            currencies?.find(({ Id }) => Id === value?.CurrencyId)
              ?.MinPayment ||
            1
          }
          step={0.1}
        />
      </div>
      <div className="required-select">
        <label>{t("CURRENCY", "Currency")}</label>
        <Select<number>
          defaultValue={value?.CurrencyId}
          placeholder={t("CURRENCY_PLACEHOLDER", "Select currency")}
          onChange={(newValue) =>
            handleCurrencyChange(
              newValue,
              currencies?.find(({ Id }) => Id === value?.CurrencyId)?.MinPayment
            )
          }
        >
          {currencies?.map(({ Id, Name, MinPayment }) => (
            <Option
              value={Id}
              key={Id}
              style={selectStyles}
              minprice={MinPayment}
            >
              {Name}
            </Option>
          ))}
        </Select>
      </div>

      {field.key !== 0 && (
        <button
          className="remove-button"
          onClick={() => removeItem(field.name)}
        >
          <Trash />
        </button>
      )}
    </div>
  );
};

export const AssetPaymentField = (
  props: Omit<IAssetPaymentFiledProps, "onChange" | "value">
) => {
  const { t } = useTranslation();

  const getInputError = (inputErrorCode: AssetPaymentInputCode): string => {
    const REQUIRED_VALIDATION_MESSAGE = t(
      "REQUIRED_VALIDATION_MESSAGE",
      "This field is required."
    ).toLowerCase();

    switch (inputErrorCode) {
      case "AssetPurchasePeriodTypeCode":
        return `${t(
          "PURCHASE_PERIOD_TIME",
          "Purchase period time"
        )}: ${REQUIRED_VALIDATION_MESSAGE}`;

      case "CurrencyId":
        return `${t("CURRENCY", "Currency")}: ${REQUIRED_VALIDATION_MESSAGE}`;

      default:
        return "";
    }
  };

  const buildMinimumPriceRule = () => {
    return {
      required: true,
      validator: (_: Rule, value: any) => {
        const minPrice = props.currencies?.find(
          ({ Id }) => Id === value?.CurrencyId
        )?.MinPayment;
        if (minPrice && value["Price"] < minPrice) {
          return Promise.reject(
            `Price value is lower than minimum currency value = ${minPrice}`
          );
        }
        return Promise.resolve();
      },
      message: <Trans i18nKey="PRICE_LESS_THAN_MINIMAL" />,
    };
  };

  return (
    <LabelField
      rules={[
        buildMinimumPriceRule(),
        buildRequiredObjectSinglePropertyRule(
          AssetPaymentInputCode.PURCHASE,
          getInputError(AssetPaymentInputCode.PURCHASE)
        ),
        buildRequiredObjectSinglePropertyRule(
          AssetPaymentInputCode.CURRENCY,
          getInputError(AssetPaymentInputCode.CURRENCY)
        ),
      ]}
      {...props.field}
    >
      {({ onChange, value }) => (
        <AssetPaymentFieldTemplate {...props} {...{ onChange, value }} />
      )}
    </LabelField>
  );
};
