/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";

import { PaymentStatus } from "../../enums";
import { TimeHelper, UrlHelper } from "../../helpers";
import { INotificationPaymentStatusModel } from "../../models";
import { DataProvider } from "../../providers";
import { useSelector } from "../../store";
import { Selectors } from "../../store/notification";
import { useServiceCaller } from "../Common";

export type PaymentStatusRouteParams = {
  paymentKey: string;
  paymentStatus: PaymentStatus;
};

export const usePaymentStatus = () => {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>();
  const notifications = useSelector(Selectors.notificationsSelector);
  const location = useLocation();

  const urlParams = useMemo<PaymentStatusRouteParams>(
    () => UrlHelper.parse(location.search) as PaymentStatusRouteParams,
    [location]
  );
  const paymentNotification = useMemo(() => {
    if (notifications && notifications.length > 0) {
      return notifications.find((notif) => {
        const casted = notif as INotificationPaymentStatusModel;
        return (
          !!casted.PaymentKey && casted.PaymentKey === urlParams.paymentKey
        );
      }) as INotificationPaymentStatusModel;
    }
    return null;
  }, [notifications, urlParams]);

  const [checkStatus, statusState] = useServiceCaller(
    async (paymentKey: string) =>
      DataProvider.checkStatusByKey(paymentKey)
        .then((response) => ({
          ok: true,
          status: response.Status,
          validTo: response.PaymentValidTo
            ? TimeHelper.getDateTime(response.PaymentValidTo)
            : undefined,
        }))
        .then((result) => {
          setPaymentStatus(result.status);
          return result;
        }),
    []
  );

  useEffect(() => {
    if (urlParams) {
      const { paymentStatus, paymentKey } = urlParams;
      if (paymentStatus) {
        setPaymentStatus(paymentStatus);
      } else {
        checkStatus(paymentKey);
      }
    }
  }, [urlParams]);

  useEffect(() => {
    paymentNotification && setPaymentStatus(paymentNotification.PaymentStatus);
  }, [paymentNotification]);

  return { paymentStatus, statusState, checkStatus };
};
