/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  AuthStore,
  DeviceHelper,
  IAppState,
  IRegisterConfirmEmailModel,
  IUserDeviceModel,
  UrlHelper,
} from "@xala/common";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";

import { IAuthScreenProps } from "screens/AuthScreen/AuthScreen";

import { Form, FormButton, FormLine } from "../../Form";
import "../../Form/Form.scss";
import { LoaderSpinner } from "../../LoaderSpinner";
import "../AuthForm.scss";

import "./ConfirmEmail.scss";

interface IConfirmEmailProps extends IAuthScreenProps, RouteComponentProps {}

interface IConfirmEmailQueryParams {
  email?: string;
  token?: string;
  originRedirectUrl?: string;
}

export const ConfirmEmail = (_: IConfirmEmailProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [device, setDevice] = useState<IUserDeviceModel | undefined>();
  const [registerConformEmailProcessing, setRegisterConformEmailProcessing] =
    useState(false);
  const [queryParams] = useState<IConfirmEmailQueryParams>(
    UrlHelper.parse(location.search)
  );
  const { isTokenValid, isProcessing, action } = useSelector(
    (state: IAppState) => state.auth
  );

  useEffect(() => {
    dispatch(AuthStore.Actions.validateToken(queryParams.token || ""));
    DeviceHelper.getDeviceInfo().then((device) => {
      setDevice(device);
    });
  }, [dispatch, queryParams]);

  useEffect(() => {
    if (device && isTokenValid) {
      setRegisterConformEmailProcessing(true);
      const payload: IRegisterConfirmEmailModel = {
        Email: queryParams.email || "",
        Token: queryParams.token || "",
        Device: device,
      };

      dispatch(
        AuthStore.Actions.registerConfirmEmail(
          payload,
          queryParams.originRedirectUrl
        )
      );
    }
  }, [dispatch, device, isTokenValid, queryParams]);

  const handleConfirmationErrorForm = () => {
    queryParams.email &&
      dispatch(
        AuthStore.Actions.resendConfirmationEmailByUser({
          email: queryParams.email,
        })
      );
  };

  const renderConfirmationError = () => {
    return (
      <Form onFinish={handleConfirmationErrorForm}>
        <h1 className="text-upper text-center">{t("RESEND_TOKEN__TITLE")}</h1>
        <p className="text-center text-large">
          {t("RESEND_TOKEN__SUBTITLE_1")}
        </p>
        <p className="text-center text-large">
          {t("RESEND_TOKEN__SUBTITLE_2")}
        </p>
        <FormLine />
        <FormButton>{t("RESEND_TOKEN__SUBMIT")}</FormButton>
      </Form>
    );
  };

  const renderLoader = () => {
    return (
      <div className="form" style={{ textAlign: "center" }}>
        <LoaderSpinner />
      </div>
    );
  };

  return (
    <div className="ConfirmEmail AuthForm">
      {isProcessing ||
      (registerConformEmailProcessing &&
        action?.type !== "REGISTER_CONFIRM_EMAIL_FAILURE")
        ? renderLoader()
        : renderConfirmationError()}
    </div>
  );
};
