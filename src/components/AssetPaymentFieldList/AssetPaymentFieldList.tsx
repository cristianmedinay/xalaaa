/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAssetPurchasePeriodTypeModel } from "@xala/common";
import { List } from "rc-field-form";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import PlusIcon from "../../resources/icons/Plus.svg";

import {
  AssetPaymentField,
  IAssetPaymentFiledProps,
  paymentInitialValue,
  PriceValue,
} from "./AssetPaymentField";

export interface IAssetPaymentFieldListProps
  extends Partial<IAssetPaymentFiledProps> {
  listName: string;
  label: string;
  initialValue?: PriceValue[];
}

export const AssetPaymentFieldList = ({
  listName,
  label,
  initialValue,
  ...props
}: IAssetPaymentFieldListProps) => {
  const { t } = useTranslation();
  const [isPurchaseTypesLoaded, setIsPurchaseTypesLoaded] = useState(false);
  const [availablePurchaseTypes, setAvailablePurchaseTypes] = useState<
    IAssetPurchasePeriodTypeModel[]
  >([]);
  const [purchaseTypeToRemove, setPurchaseTypeToRemove] = useState("");

  const filterpurchaseTypes =
    props.purchaseTypes &&
    props.purchaseTypes.filter((code) => code.Code !== "SUBSCRIPTION");

  const shouldAddNextAsset = !(availablePurchaseTypes.length <= 1);

  const getAvailablePurchaseTypes = (purchaseType: string) => {
    if (purchaseType !== purchaseTypeToRemove) {
      setPurchaseTypeToRemove(purchaseType);
    } else {
      setPurchaseTypeToRemove("");
    }
  };
  const getRestOfPurchaseType = () => {
    if (purchaseTypeToRemove) {
      const filter = availablePurchaseTypes.filter(
        (purchase) => purchase.Code !== purchaseTypeToRemove
      );
      setAvailablePurchaseTypes(filter);
    }
  };

  const addAvailablePurchaseTypes = () => {
    if (filterpurchaseTypes) {
      const filter = filterpurchaseTypes.filter(
        (purchase) => purchase.Code !== purchaseTypeToRemove
      );
      setPurchaseTypeToRemove(filter[0].Code);
      setAvailablePurchaseTypes(filterpurchaseTypes);
    }
  };

  useEffect(() => {
    setIsPurchaseTypesLoaded(true);
  }, []);
  useEffect(() => {
    if (isPurchaseTypesLoaded && filterpurchaseTypes) {
      setAvailablePurchaseTypes(filterpurchaseTypes);
      setIsPurchaseTypesLoaded(false);
    }
  }, [filterpurchaseTypes]);

  return (
    <List
      name={listName}
      initialValue={
        initialValue && initialValue.length > 0
          ? initialValue
          : [paymentInitialValue]
      }
    >
      {(fields, { add, remove }) => (
        <ul className="asset-payment-list">
          <h3>{label}</h3>
          {fields.map((field) => (
            <AssetPaymentField
              listName={listName}
              key={field.key}
              field={field}
              remove={remove}
              availablePurchaseTypes={availablePurchaseTypes}
              getAvailablePurchaseTypes={getAvailablePurchaseTypes}
              addAvailablePurchaseTypes={addAvailablePurchaseTypes}
              {...props}
            />
          ))}
          {shouldAddNextAsset && (
            <button
              className="asset-list-add"
              onClick={() => {
                getRestOfPurchaseType();
                add(paymentInitialValue);
              }}
              type="button"
            >
              <PlusIcon />
              {t(
                "MEDIA_CREATOR__PAYMENTS__ADD_NEXT_ASSET_PRICE",
                "Add next asset price"
              )}
            </button>
          )}
        </ul>
      )}
    </List>
  );
};
