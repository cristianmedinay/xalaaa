/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { buildRequiredRule, DataProvider, IFormValues } from "@xala/common";
import Form, { useForm } from "rc-field-form";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { PriceValue } from "components/AssetPaymentFieldList";
import { PillType } from "components/Pill";
import { useAssetPrices } from "hooks/useAssetPrices";

import { AssetPricing } from "../../AssetPricing/AssetPricing";
import { Switch } from "../../Switch";
import { MediaContext } from "../MediaContext";
import { MediaFooter } from "../MediaFooter";

import "./CatchupStep.scss";

import loadable from "@loadable/component";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const DatePickerWithHours = loadable(
  () => import("../../DatePickerWithHours"),
  {
    resolveComponent: (module) => module.DatePickerWithHours,
  }
);

export interface ICatchupStepProps {
  nextStep: () => void;
  previousStep: () => void;
}

interface FormInputs extends IFormValues {
  AvailableFrom: string;
  AvailableTo: string;
  assetPrices: Required<PriceValue>[];
  subscription: PillType[];
}

export const CatchupStep = ({ nextStep, previousStep }: ICatchupStepProps) => {
  const { t } = useTranslation();
  const [form] = useForm();
  const media = useContext(MediaContext);
  const [isMakingCatchup, setIsMakingCatchup] = useState(true);
  const [isFreeAsset, setIsFreeAsset] = useState(true);
  const [catchupId, setCatchupId] = useState<number | undefined>();
  const [catchupAvailableDateErrors, setCatchupAvailableDateErrors] = useState<
    string[]
  >([]);
  const catchupStartDateInitialValue = dayjs(media?.data?.EndDateTime)
    .add(2, "hour")
    .format();
  const catchupEndDateInitialValue = dayjs(media?.data?.EndDateTime)
    .add(1, "week")
    .format();

  const getNextStep = () => {
    media.onReload();
    nextStep();
  };

  const { submitPricing, errors, initialPrices, changeEventToFree } =
    useAssetPrices({
      onFinish: getNextStep,
      assetId: catchupId ?? -1,
    });

  useEffect(() => {
    let isSubscribed = true;

    DataProvider.searchAsset({ Parents: [media.data.Id] }).then((data) => {
      isSubscribed && setCatchupId(data?.Entities[0]?.Id);
    });

    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    setIsFreeAsset(initialPrices.length === 0);
  }, [initialPrices]);

  const datesValidator = (values: FormInputs) => {
    const catchupAvailabilityErrors = [];
    const startCatchupDateTime = values.StartDate;
    const endCatchupDateTime = values.EndDate;

    const startDate = startCatchupDateTime && new Date(startCatchupDateTime);
    const endDate = endCatchupDateTime && new Date(endCatchupDateTime);
    const liveEndDate =
      media?.data?.EndDateTime && new Date(media?.data?.EndDateTime);

    if (startDate && endDate && startDate.getTime() >= endDate.getTime()) {
      catchupAvailabilityErrors.push(
        t("VALIDATION__CATCHUP_DATE_SET_IN_THE_PAST")
      );
    }
    if (
      startDate &&
      liveEndDate &&
      startDate.getTime() <= liveEndDate.getTime()
    ) {
      catchupAvailabilityErrors.push(
        t("VALIDATION__CATCHUP_DATE_SET_BEFORE_EVENT_ENDS")
      );
    }
    setCatchupAvailableDateErrors(catchupAvailabilityErrors);
    if (catchupAvailabilityErrors.length > 0) {
      return [...catchupAvailabilityErrors];
    } else {
      return [];
    }
  };

  const onFinish = async (values: FormInputs) => {
    if (datesValidator(values).length) {
      return;
    }

    let assetID = catchupId;
    if (!isMakingCatchup) {
      changeEventToFree();
      getNextStep();
      return;
    }

    if (!assetID) {
      const { AssetId } = await DataProvider.insertCatchup({
        ParentAssetId: media.data.Id,
        AvailableFrom: values["StartTime"],
        AvailableTo: values["EndTime"],
      });

      assetID = AssetId;
    }

    if (isFreeAsset) {
      changeEventToFree();
      getNextStep();
      return;
    }

    submitPricing({ ...values, assetId: assetID });
  };

  return (
    <div className="catchup-section">
      <h1>{t("MEDIA_CREATOR__CATCHUP", "CATCHUP")}</h1>
      <Form
        name="PaymentsForm"
        onFinish={onFinish}
        onValuesChange={(_, values) => datesValidator(values)}
        form={form}
      >
        <div className="catchup-container">
          <div className="payments-switch">
            <label>{t("MEDIA_CREATOR__SAVE_CATCHUP", "Save Catchup?")}</label>
            <Switch checked={isMakingCatchup} onChange={setIsMakingCatchup} />
          </div>

          {isMakingCatchup && (
            <>
              <div className="broadcast-date-time-section">
                <DatePickerWithHours
                  dateName="StartDate"
                  timeName="StartTime"
                  form={form}
                  errors={catchupAvailableDateErrors}
                  rulesDate={[buildRequiredRule()]}
                  label={t(
                    "EDIT__EVENT_AVAILABLE_FROM",
                    "Available from date and time:"
                  )}
                  initialValue={catchupStartDateInitialValue}
                />

                <DatePickerWithHours
                  dateName="EndDate"
                  timeName="EndTime"
                  form={form}
                  rulesDate={[buildRequiredRule()]}
                  label={t(
                    "EDIT__EVENT_AVAILABLE_TO",
                    "Available from date and time:"
                  )}
                  initialValue={catchupEndDateInitialValue}
                />
              </div>

              <div className="payments-container">
                <div className="payments-switch">
                  <label>{t("MEDIA_IS_PREMIUM", "Free event?")}</label>
                  <Switch checked={isFreeAsset} onChange={setIsFreeAsset} />
                </div>

                {!isFreeAsset && (
                  <AssetPricing
                    catchupId={catchupId}
                    initialPrices={initialPrices}
                    form={form}
                    errors={errors}
                  />
                )}
              </div>
            </>
          )}
        </div>
        <MediaFooter goBack={previousStep} type="submit" />
      </Form>
    </div>
  );
};
