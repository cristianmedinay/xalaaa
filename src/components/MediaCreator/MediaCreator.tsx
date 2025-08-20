/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  AssetEventType,
  ConfigurationStore,
  DataProvider,
  IAssetModel,
  IErrorModel,
  useDataLoader,
} from "@xala/common";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import { AppHeader, Step, Steps } from "..";

import { CatchupStep } from "./CatchupStep";
import { CreatorsStep } from "./CreatorsStep";
import { ImagesStep } from "./ImagesStep";
import { IntroStep } from "./IntroStep";
import { MediaContext } from "./MediaContext";
import "./MediaCreator.scss";
import { PaymentsStep } from "./PaymentsStep";
import {
  LIVE_STEPS_MODEL,
  MAIN_STEPS_MODEL,
  MOVIE_NIGHT_STEPS_MODEL,
  StepType,
  VIDEO_PREMIERE_STEPS_MODEL,
} from "./stepsModel";
import { SummaryStep } from "./SummaryStep";
import { VideoDetailsStep } from "./VideoDetailsStep";

const steps: Map<StepType, any> = new Map([
  [StepType.VideoDetails, VideoDetailsStep],
  [StepType.Images, ImagesStep],
  [StepType.Creators, CreatorsStep],
  [StepType.Payments, PaymentsStep],
  [StepType.Intro, IntroStep],
  [StepType.Catchup, CatchupStep],
  [StepType.Summary, SummaryStep],
]);

interface RouterParams {
  id: string;
}

export const MediaCreator = () => {
  const { t } = useTranslation();
  const { id } = useParams<RouterParams>();
  const configuration = useSelector(
    ConfigurationStore.Selectors.configurationSelector
  );

  const { data, refresh } = useDataLoader<IAssetModel, IErrorModel>({
    loader: () =>
      DataProvider.getAsset(Number(id)).then((data) => ({
        ok: true,
        data,
      })),
    deps: [],
  });

  const { model } = {
    get model() {
      switch (data?.AssetTypeCode as string) {
        case AssetEventType.Live: {
          return LIVE_STEPS_MODEL;
        }
        case AssetEventType.VideoPremiere: {
          return VIDEO_PREMIERE_STEPS_MODEL;
        }
        case AssetEventType.MovieNight: {
          return MOVIE_NIGHT_STEPS_MODEL;
        }
        default: {
          return MAIN_STEPS_MODEL;
        }
      }
    },
  };

  const [currentStep, setCurrentStep] = useState(0);

  const StepComponent = steps.get(model[currentStep].screenType);

  if (currentStep < 1) {
    setCurrentStep(1);
  }

  const onChange = (current: number) => {
    refresh();
    setCurrentStep(current);
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const previousStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <>
      <AppHeader configuration={configuration} />

      <section className="media-creator">
        <h1>{t("MEDIA_CREATOR_HEADER", "MEDIA CREATOR")}</h1>

        {data && (
          <MediaContext.Provider value={{ data, onReload: refresh }}>
            <Steps
              className="media-steps"
              current={currentStep}
              onChange={onChange}
            >
              {model.map(
                (step: { Id: number; subTitleKey: string }, idx: number) => (
                  <Step
                    stepNumber={idx}
                    key={idx}
                    stepIndex={idx - 1}
                    subTitle={t(`${step.subTitleKey}`, `${step.subTitleKey}`)}
                    disabled
                  />
                )
              )}
            </Steps>
            <StepComponent nextStep={nextStep} previousStep={previousStep} />
          </MediaContext.Provider>
        )}
      </section>
    </>
  );
};
