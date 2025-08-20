/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  DataProvider,
  IErrorModel,
  ImageHelper,
  IMediaModel,
  IRoutingParamsWithId,
  useDataLoader,
} from "@xala/common";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import {
  ImageWithPlaceholder,
  LoaderSpinner,
  MediaAdditionalInfo,
  Timer,
} from "../../components";
import resources from "../../resources/list";

import "./PaymentProcessingScreen.scss";
import { PaymentProcessingScreenProps } from "./PaymentProcessingScreen.types";

export const PaymentProcessingScreen = ({
  paymentValidTo,
  onRefreshStatus,
}: PaymentProcessingScreenProps) => {
  const { id } = useParams<IRoutingParamsWithId>();
  const { t } = useTranslation();

  const { data: media, loading } = useDataLoader<IMediaModel, IErrorModel>({
    loader: () =>
      DataProvider.getMedia({
        MediaId: +id,
        IncludeImages: true,
      }).then((data) => ({
        ok: true,
        data,
      })),
    deps: [id],
  });

  useEffect(() => {
    if (onRefreshStatus) {
      const interval = setInterval(() => {
        onRefreshStatus?.();
      }, 30 * 1000);
      return () => clearInterval(interval);
    }
  }, [onRefreshStatus]);

  if (loading) {
    return <LoaderSpinner />;
  }

  return (
    <div className="PaymentProcess">
      <h1 className="PaymentProcess__title">
        {t("PAYMENT_PROCESSING__TITLE")}
      </h1>
      <p className="PaymentProcess__subtitle">
        {t("PAYMENT_PROCESSING__SUBTITLE")}
      </p>
      {paymentValidTo && (
        <div className="PaymentProcess__timer_container">
          <LoaderSpinner width={32} height={32} />
          <Timer endDate={paymentValidTo} onTimeout={onRefreshStatus} />
        </div>
      )}
      <div className="PaymentProcess__product">
        <div className="PaymentProcess__product__image">
          <ImageWithPlaceholder
            imageSrc={ImageHelper.getFrameImageUrl(media?.Images)}
            imageContainerClassName="ImageWithPlaceholder"
            placeholderSrc={resources.framePlaceholder}
            alt={media?.Title}
          />
        </div>
        <div className="PaymentProcess__product__gradient_overlay" />
        <div className="PaymentProcess__product__caption">
          <div className="PaymentProcess__product__title">{media?.Title}</div>
          {media && <MediaAdditionalInfo media={media} />}
        </div>
      </div>
    </div>
  );
};
