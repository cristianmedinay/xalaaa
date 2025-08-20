/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  DataProvider,
  definePaymentProvider,
  IErrorModel,
  IPaymentTypeMappingAndOptionsModel,
  PaymentProvider,
  useDataLoader,
  useIsLoggedIn,
  useServiceCaller,
} from "@xala/common";
import { useTranslation } from "react-i18next";

import { Message } from "components";

export const useMediaPayment = (mediaId: number) => {
  const isUserLoggedIn = useIsLoggedIn();
  const { t } = useTranslation();

  const { data: providers, loading: isLoadingProviders } = useDataLoader<
    IPaymentTypeMappingAndOptionsModel,
    IErrorModel
  >({
    loader: () =>
      DataProvider.getPaymentTypeMappingAndOptions()
        .then((response) => {
          return {
            ok: true,
            data: response,
            error: {},
          };
        })
        .catch(() => {
          return DataProvider.getPaymentOptions().then((options) => {
            return {
              ok: true,
              data: {
                Mapping: [],
                Options: [options],
              } as IPaymentTypeMappingAndOptionsModel,
            };
          });
        }),
    deps: [mediaId],
  });

  const [buyMedia, buyMediaState] = useServiceCaller(
    async (mediaId: number, mediaPriceId: number) => {
      if (isLoadingProviders || !providers) {
        Message.error(t("PAYMENT__PROVIDER_NOT_READY"));
        return;
      }

      await DataProvider.buyMedia({
        MediaId: mediaId,
        MediaPriceId: mediaPriceId,
      })
        .then(async (data) => {
          if (!isUserLoggedIn) {
            return;
          }

          const options = providers.Options.find(
            (o) => o.Provider === data.Provider
          );

          if (options) {
            await definePaymentProvider(options);
            await PaymentProvider.init();
            await PaymentProvider.checkout({
              SessionId: data.PaymentId,
              RedirectUrl: data.RedirectUrl,
            });
          }
        })
        .catch((error: IErrorModel) =>
          Message.error(`${t("PAYMENT__BUY_ERROR_MESSAGE")}, ${error.Message}`)
        );
    },
    [isUserLoggedIn, providers]
  );

  return {
    buyMedia,
    isProcessingPayment: buyMediaState.processing,
  };
};
