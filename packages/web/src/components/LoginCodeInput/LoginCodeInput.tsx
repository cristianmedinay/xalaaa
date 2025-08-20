/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  buildRequiredRule,
  DataProvider,
  IFormValues,
  ILoginCodeModel,
} from "@xala/common";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { LoaderSpinner } from "components";

import { Form, FormButton, LabelField } from "../Form";
import { Input } from "../Input";

import "./LoginCodeInput.scss";

export const LoginCodeInput = () => {
  const { t } = useTranslation();
  const [errorMessage, seterrorMessage] = useState<string[] | undefined>(
    undefined
  );
  const [successMessage, setSuccessMessage] = useState<
    React.ReactNode | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values: IFormValues) => {
    const payload: ILoginCodeModel = {
      Code: values["CodeInput"],
    };

    if (payload.Code.length < 6) {
      seterrorMessage([
        t(
          "LINK__ERROR_SHORT_MESSAGE",
          "The code you have entered is too short."
        ),
      ]);
      successMessage && setSuccessMessage(undefined);

      return;
    }

    setIsLoading(true);
    seterrorMessage(undefined);
    DataProvider.linkLoginCode(payload)
      .then(() => {
        setSuccessMessage(
          <p className="LoginCodeResponse LoginCodeResponse__success">
            {t("LINK__SUCCESS_MESSAGE", "Your account has been linked")}
          </p>
        );
        errorMessage && seterrorMessage(undefined);
        setIsLoading(false);
        form.resetFields();
      })
      .catch(() => {
        seterrorMessage([
          t(
            "LINK__ERROR_MESSAGE",
            "The code you have entered is incorrect. Please try again"
          ),
        ]);
        successMessage && setSuccessMessage(undefined);
        setIsLoading(false);
      });
  };

  const handleFocus = () => {
    successMessage && setSuccessMessage(undefined);
  };

  return (
    <div className="LoginCodeForm AuthForm">
      <Form onFinish={onFinish} form={form} onFocus={handleFocus}>
        <h1 className="LoginCodeHeader">
          {t("LOGIN_CODE__HEADER", "Enter code to log in or register")}
        </h1>
        <p>{t("LOGIN_CODE__DESCRIPTION")}</p>
        <LabelField
          name="CodeInput"
          errorClass="FormInputError"
          rules={[buildRequiredRule()]}
          apiErrors={errorMessage}
        >
          <Input
            className="FormInput"
            autoFocus={!successMessage}
            placeholder={t("LOGIN__CODE_LABEL", "Enter Code")}
          />
        </LabelField>

        {successMessage}

        {isLoading ? (
          <LoaderSpinner
            width={50}
            height={50}
            style={{ display: "flex", justifyContent: "center" }}
          />
        ) : (
          <FormButton>{t("LINK__BUTTON__SEND", "Send")}</FormButton>
        )}
      </Form>
    </div>
  );
};
