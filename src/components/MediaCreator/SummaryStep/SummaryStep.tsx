/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { AssetEventType, IAssetImageModel, ROUTES } from "@xala/common";
import dayjs from "dayjs";
import React, { useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useAssetPrices } from "hooks/useAssetPrices";
import { useNavigation } from "hooks/useNavigation";

import { MediaContext } from "../MediaContext";
import { MediaFooter } from "../MediaFooter";

import "./SummaryStep.scss";

export interface ISummaryStepProps {
  nextStep: () => void;
  previousStep: () => void;
}

export const SummaryStep: React.FC<ISummaryStepProps> = (props) => {
  const { t } = useTranslation();
  const media = useContext(MediaContext);
  const goTo = useNavigation();

  const { initialPrices } = useAssetPrices({
    assetId: media.data.Id,
  });

  const pricingInfo = useMemo(() => {
    if (initialPrices.length) {
      return t("COMMON__NO", "No");
    }
    return t("COMMON__YES", "Yes");
  }, [initialPrices]);

  const isImageAsset = (type: string): boolean | undefined => {
    return media.data.Images?.some((image: IAssetImageModel) => {
      return image.AssetImageTypeCode === type;
    });
  };

  const findImage = (type: string) =>
    media.data.Images?.find((item: IAssetImageModel) =>
      item.AssetImageTypeCode === type ? item : ""
    );

  const goBack = () => {
    media.onReload();
    props.previousStep();
  };

  const goToEvents = () => {
    goTo(ROUTES.EVENTS);
  };

  return (
    <>
      <div className="summary-section">
        <div className="details">
          <h1>{t("MEDIA_CREATOR__SUMMARY", "SUMMARY")}</h1>

          <div className="info-section">
            <p className="info-secondary">
              {t("MEDIA_CREATOR__SUMMARY__TITLE", "Media Title")}
            </p>
            <p className="info-primary">{media.data.Title}</p>
          </div>
          <div className="info-section">
            <p className="info-secondary">
              {t("MEDIA_CREATOR__SUMMARY__CATEGORIES", "Categories")}
            </p>
            <div className="info-horizontal">
              {media.data.Categories?.map((category, index) => {
                return (
                  <p
                    key={category.Id}
                    className={`info-primary ${
                      media.data.Categories &&
                      index < media.data.Categories.length - 1
                        ? "category"
                        : ""
                    }`}
                  >
                    {category.AssetCategoryName}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="info-section">
            <p className="info-secondary">
              {t("MEDIA_CREATOR__SUMMARY__IS_PREMIUM", "Free event:")}
            </p>
            <p className="info-primary">{pricingInfo}</p>
          </div>
          <div className="info-section">
            <p className="info-secondary">
              {t("MEDIA_CREATOR__SUMMARY__CREATOR", "Creator")}
            </p>
            <p className="info-primary">{media.data.CreatorUserFullName}</p>
          </div>
          {(media.data.AssetTypeCode as string) === AssetEventType.Live ? (
            <div className="input-output-links">
              <div className="info-section">
                <p className="info-secondary">
                  {t("MEDIA_CREATOR__SUMMARY__INPUT", "Input")}
                </p>
                <div className="info-horizontal">
                  <p className="info-primary">
                    {t("MEDIA_CREATOR__SUMMARY__URL", "Url: ")}
                  </p>
                  <p className="info-secondary"></p>
                </div>
                <div className="info-horizontal">
                  <p className="info-primary">
                    {t("MEDIA_CREATOR__SUMMARY__STREAM_KEY", "Stream key: ")}
                  </p>
                  <p className="info-secondary"></p>
                </div>
              </div>
              <div className="info-section">
                <p className="info-secondary">
                  {t("MEDIA_CREATOR__SUMMARY__OUTPUT", "Output")}
                </p>
                <div className="info-horizontal">
                  <p className="info-primary">
                    {t("MEDIA_CREATOR__SUMMARY__URL", "Url: ")}
                  </p>
                  <p className="info-secondary"></p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="preview">
          {isImageAsset("FRAME") && (
            <img className="image" alt="frame" src={findImage("FRAME")?.Url} />
          )}
          <div className="start-date-time-info">
            <div className="info-section">
              <p className="info-secondary">
                {t("MEDIA_CREATOR__SUMMARY__START_DATE", "Start date:")}
              </p>
              <p className="info-primary">
                {dayjs(media.data.StartDateTime).format("DD.MM.YYYY")}
              </p>
            </div>

            <div className="info-section">
              <p className="info-secondary">
                {t("MEDIA_CREATOR__SUMMARY__START_TIME", "Start time:")}
              </p>
              <p className="info-primary">
                {dayjs(media.data.StartDateTime).format("HH:mm")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <MediaFooter
        goBack={goBack}
        goTo={goToEvents}
        customNextTitle="Finish"
        type="button"
      />
    </>
  );
};
