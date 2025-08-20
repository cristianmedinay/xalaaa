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
  RouteHelper,
  useDataLoader,
} from "@xala/common";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import {
  ImageWithPlaceholder,
  LoaderSpinner,
  MediaAdditionalInfo,
  MediaButton,
} from "../../components";
import resources from "../../resources/list";

import "./PaymentCancelScreen.scss";

import { MediaButtonVariant } from "enums";

export const PaymentCancelScreen = () => {
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

  const onGoToDetailsClick = () => {
    if (!media) {
      return;
    }
    RouteHelper.goToDetails(media, true);
  };

  const onRepayClick = () => {
    RouteHelper.goToBuyAsset(+id);
  };

  if (loading) {
    return <LoaderSpinner />;
  }

  return (
    <div className="PaymentCancel">
      <h1 className="PaymentCancel__title">{t("PAYMENT_CANCEL__TITLE")}</h1>
      <p className="PaymentCancel__subtitle">{t("PAYMENT_CANCEL__SUBTITLE")}</p>
      <div className="PaymentCancel__product">
        <div className="PaymentCancel__product__image">
          <ImageWithPlaceholder
            imageSrc={ImageHelper.getFrameImageUrl(media?.Images)}
            imageContainerClassName="ImageWithPlaceholder"
            placeholderSrc={resources.framePlaceholder}
            alt={media?.Title}
          />
        </div>
        <div className="PaymentCancel__product__gradient_overlay" />
        <div className="PaymentCancel__product__caption">
          <div className="PaymentCancel__product__title">{media?.Title}</div>
          {media && <MediaAdditionalInfo media={media} />}
        </div>
      </div>

      <div className="PaymentCancel__buttons_container">
        <MediaButton
          className="FormButton PaymentCancel__button"
          type="button"
          variant={MediaButtonVariant.Primary}
          onClick={onRepayClick}
        >
          {t("PAYMENT_CANCEL__BUTTON_REPAY")}
        </MediaButton>
        <MediaButton
          className="FormButton PaymentCancel__button"
          type="button"
          variant={MediaButtonVariant.Plain}
          onClick={onGoToDetailsClick}
        >
          {t("PAYMENT_CANCEL__BUTTON_GO_TO_DETAILS")}
        </MediaButton>
      </div>
    </div>
  );
};
