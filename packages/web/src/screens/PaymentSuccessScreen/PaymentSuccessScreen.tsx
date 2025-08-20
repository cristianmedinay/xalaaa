/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  AssetType,
  DataProvider,
  IErrorModel,
  ImageHelper,
  IMediaModel,
  IRoutingParamsWithId,
  RouteHelper,
  useDataLoader,
  UserStore,
} from "@xala/common";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

import { MediaButtonVariant } from "enums";

import {
  ImageWithPlaceholder,
  LoaderSpinner,
  MediaAdditionalInfo,
  MediaButton,
} from "../../components";
import resources from "../../resources/list";

import "./PaymentSuccessScreen.scss";

export const PaymentSuccessScreen = () => {
  const id = parseInt(useParams<IRoutingParamsWithId>()["id"]);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { data: media, loading } = useDataLoader<IMediaModel, IErrorModel>({
    loader: () =>
      DataProvider.getMedia({
        MediaId: id,
        IncludeImages: true,
        IncludePurchaseOffers: true,
      }).then((data) => ({
        ok: true,
        data,
      })),
    deps: [id],
  });

  const getUserProducts = useCallback(
    () => dispatch(UserStore.Actions.getProducts()),
    [dispatch]
  );

  useEffect(() => {
    getUserProducts();
  }, [dispatch, getUserProducts]);

  const onGoToDetailsClick = () => {
    if (!media) {
      return;
    }
    getUserProducts();
    RouteHelper.goToDetails(media, true);
  };

  const onPlayClick = () => {
    if (!media) {
      return;
    }
    getUserProducts();
    RouteHelper.goToPlayer(media, false);
  };

  const canPlayMedia = () => {
    if (media?.MediaTypeCode === AssetType.Live && media.StartDateTime) {
      return new Date().getTime() >= Number(media.StartDateTime);
    } else {
      return media?.MediaTypeCode !== AssetType.Package;
    }
  };

  if (loading) {
    return <LoaderSpinner />;
  }

  const mediaImageSrc = ImageHelper.getFrameImageUrl(media?.Images);

  return (
    <div className="PaymentSuccess">
      <h1 className="PaymentSuccess__title">{t("PAYMENT_SUCCESS__TITLE")}</h1>
      <p className="PaymentSuccess__subtitle">
        {t("PAYMENT_SUCCESS__SUBTITLE")}
      </p>
      <div className="PaymentSuccess__product">
        <div className="PaymentSuccess__product__image">
          <ImageWithPlaceholder
            imageSrc={mediaImageSrc}
            imageContainerClassName="ImageWithPlaceholder"
            placeholderSrc={resources.framePlaceholder}
            alt={media?.Title}
          />
        </div>
        <div className="PaymentSuccess__product__gradient_overlay" />
        <div className="PaymentSuccess__product__caption">
          <div className="PaymentSuccess__product__title">{media?.Title}</div>
          {media && <MediaAdditionalInfo media={media} />}
        </div>
      </div>

      <div className="PaymentSuccess__buttons_container">
        {canPlayMedia() ? (
          <MediaButton
            className="FormButton PaymentSuccess__button"
            type="button"
            variant={MediaButtonVariant.Primary}
            onClick={onPlayClick}
          >
            {t("PAYMENT_SUCCESS__BUTTON_PLAY")}
          </MediaButton>
        ) : null}
        <MediaButton
          className="FormButton PaymentSuccess__button"
          type="button"
          variant={MediaButtonVariant.Plain}
          onClick={onGoToDetailsClick}
        >
          {t("PAYMENT_SUCCESS__BUTTON_GO_TO_DETAILS")}
        </MediaButton>
      </div>
    </div>
  );
};
