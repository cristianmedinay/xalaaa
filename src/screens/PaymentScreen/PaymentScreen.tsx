/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  IFormValues,
  PaymentStatus,
  useGetMedia,
  useIdRouteParam,
  useIsLoggedIn,
} from "@xala/common";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
  Form,
  FormButton,
  Input,
  LoginRequiredModal,
  MediaAdditionalInfo,
  MediaButton,
} from "components";
import { MediaButtonVariant } from "enums";
import { MediaDetailsScreen } from "screens/MediaDetailsScreen";
import { trackEvent } from "tracking";

import "./PaymentScreen.scss";
import { useMediaPayment } from "./useMediaPayment";

export const PaymentScreen = () => {
  const { t } = useTranslation();
  const isUserLoggedIn = useIsLoggedIn();
  const mediaId = useIdRouteParam();

  const { media, isLoading } = useGetMedia({
    mediaId,
    options: {
      IncludeImages: true,
      IncludeParent: true,
      IncludePurchaseOffers: true,
    },
  });

  const { buyMedia, isProcessingPayment } = useMediaPayment(mediaId);

  const onFinish = (values: IFormValues) => {
    if (!media || !isUserLoggedIn) {
      return;
    }

    const paymentType = media?.PurchaseOffers?.find(
      ({ PriceId }) => values.MediaPriceId === PriceId
    )?.PurchasePeriodTypeCode;

    trackEvent("purchase", "buy_media", `${paymentType} ${media?.Title}`);

    // noinspection JSIgnoredPromiseFromCall
    buyMedia(media.Id, values.MediaPriceId);
  };

  const renderPaymentOffers = useMemo(() => {
    if (!media) {
      return null;
    }

    const offersToDisplay = media.PurchaseOffers || [];

    let priceId: number | null = null;

    if (media.PurchaseOffers && media.PurchaseOffers.length > 0) {
      priceId = media.PurchaseOffers[0].PriceId;
    }

    return (
      <div className="Payment__offers">
        <Form.Field name="MediaPriceId" initialValue={priceId}>
          {({ onChange, value }) =>
            offersToDisplay.map((offer, index) => {
              return (
                <div
                  key={index}
                  className="Payment__offer"
                  onClick={() => onChange(offer.PriceId)}
                >
                  <div className="Payment__offer__content">
                    <Input
                      className="Payment__offer__checkbox"
                      type="radio"
                      checked={offer.PriceId === value}
                    />

                    <span className="Payment__offer__name">
                      {t(`ASSET_TYPE_${offer.MediaTypeCode}`)} -{" "}
                      {t(offer.PurchasePeriodTypeCode)}
                    </span>
                  </div>
                  <div className="Payment__offer__price">
                    {offer.Price} {offer.CurrencyCode}
                  </div>
                </div>
              );
            })
          }
        </Form.Field>
      </div>
    );
  }, [media, t]);

  const paymentInProgress = useMemo(() => {
    if (!media) {
      return true;
    }

    return (
      media.NotCompletedPayment?.Status === PaymentStatus.Processing ||
      media.NotCompletedPayment?.Status === PaymentStatus.Created
    );
  }, [media]);

  return (
    <MediaDetailsScreen media={media} disableAutoFetch>
      <div className="Payment">
        <div className="Payment__content">
          <div className="Payment__info-container">
            <div className="Payment__info">
              <div className="main-info">
                <div className="Payment__title">{media?.Title}</div>
                <div className="Payment__parentsTitles">
                  {media?.ParentMedia?.ParentMediaTitle}{" "}
                  {media?.ParentMedia?.ParentMediaTitle &&
                    media?.ParentMedia?.Title &&
                    "|"}{" "}
                  {media?.ParentMedia?.Title}
                </div>
                {media && <MediaAdditionalInfo media={media} />}
              </div>
            </div>
          </div>
          {!media?.PurchaseOffers?.length && !isLoading && (
            <div className="Payment__empty">{t("PAYMENT__NO_OFFERS")}</div>
          )}

          {!!media?.PurchaseOffers?.length && (
            <Form name="Payment" className="Payment__form" onFinish={onFinish}>
              {renderPaymentOffers}
              {media &&
                media.PurchaseOffers &&
                media.PurchaseOffers.length > 0 && (
                  <div className="Payment__actions">
                    {!isUserLoggedIn ? (
                      <LoginRequiredModal>
                        {({ openModal }) => (
                          <MediaButton
                            iconElevated
                            variant={MediaButtonVariant.Primary}
                            onClick={openModal}
                            disabled={paymentInProgress}
                          >
                            {paymentInProgress
                              ? t("PAYMENT__BUTTON_IN_PROGRESS")
                              : t("PAYMENT__BUTTON_PAY")}
                          </MediaButton>
                        )}
                      </LoginRequiredModal>
                    ) : (
                      <FormButton
                        loading={isProcessingPayment}
                        disabled={paymentInProgress}
                      >
                        {paymentInProgress
                          ? t("PAYMENT__BUTTON_IN_PROGRESS")
                          : t("PAYMENT__BUTTON_PAY")}
                      </FormButton>
                    )}
                  </div>
                )}
            </Form>
          )}
        </div>
      </div>
    </MediaDetailsScreen>
  );
};
