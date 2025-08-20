/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IFormValues } from "@xala/common";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { PillType } from "components/Pill";
import { Switch } from "components/Switch";
import { useAssetPrices } from "hooks/useAssetPrices";

import { PriceValue } from "../../AssetPaymentFieldList";
import { AssetPricing } from "../../AssetPricing/AssetPricing";
import { MediaContext } from "../MediaContext";
import { MediaFooter } from "../MediaFooter";

import "./PaymentsStep.scss";

import Form from "rc-field-form";
import useForm from "rc-field-form/lib/useForm";

export interface IPaymentsStepProps {
  nextStep: () => void;
  previousStep: () => void;
}

interface FormValues extends IFormValues {
  assetPrices: Required<PriceValue>[];
  subscription: PillType[];
}

export const PaymentsStep: React.FC<IPaymentsStepProps> = (props) => {
  const { t } = useTranslation();
  const media = useContext(MediaContext);
  const [isFreeAsset, setIsFreeAsset] = useState(false);
  const [form] = useForm();

  const nextStep = () => {
    media.onReload();
    props.nextStep();
  };

  const { submitPricing, initialPrices, errors, changeEventToFree } =
    useAssetPrices({
      assetId: media.data.Id,
      onFinish: nextStep,
    });

  const onFinish = (values: FormValues) => {
    if (!isFreeAsset) {
      submitPricing({
        ...values,
        AvailableFrom: media.data.AvailableFrom?.toString() ?? "",
        AvailableTo: media.data.AvailableTo?.toString(),
        assetId: media.data.Id,
      });
    } else {
      changeEventToFree();
      nextStep();
    }
  };

  return (
    <Form
      className="payments-form"
      name="PaymentsForm"
      onFinish={onFinish}
      form={form}
    >
      <h1>{t("MEDIA_CREATOR__PAYMENTS", "PAYMENTS")}</h1>

      <div className="payments-container">
        <div className="payments-switch">
          <label>{t("MEDIA_IS_PREMIUM", "Free event?")}</label>
          <Switch
            checked={isFreeAsset}
            onChange={() => setIsFreeAsset((prev) => !prev)}
          />
        </div>

        {!isFreeAsset && (
          <AssetPricing
            catchupId={media.data.Id}
            initialPrices={initialPrices}
            form={form}
            errors={errors}
          />
        )}
      </div>
      <MediaFooter goBack={props.previousStep} type="submit" />
    </Form>
  );
};
