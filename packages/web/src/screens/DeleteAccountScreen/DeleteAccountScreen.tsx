/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  buildRequiredRule,
  IErrorModel,
  IFormValues,
  useDispatch,
  UserStore,
  useSelector,
} from "@xala/common";
import { FormInstance } from "rc-field-form/lib/interface";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

import { Form, FormButton, Input, LabelField } from "components";

import "./DeleteAccountScreen.scss";

const FORM_PASSWORD_FIELD = "Password";

export const DeleteAccountScreen = () => {
  const { t } = useTranslation();
  const form = useRef<FormInstance>(null);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const isProcessing = useSelector<boolean>(
    (state) => state.user.profile.IsProcessing ?? false
  );
  const error = useSelector<IErrorModel | undefined>(
    (state) => state.user.profile.Error
  );

  useEffect(() => {
    if (error?.Message) {
      return form.current?.setFields([
        {
          name: FORM_PASSWORD_FIELD,
          errors: [`${error.MessageKey}`],
        },
      ]);
    }
  }, [error]);

  const onFinish = (values: IFormValues) => {
    dispatch(
      UserStore.Actions.deleteAccount({
        Password: values[FORM_PASSWORD_FIELD],
      })
    );
  };

  const onCancel = () => {
    history.goBack();
  };

  const onValuesChange = useCallback(() => {
    if (!form.current) {
      return;
    }

    const isValid =
      form.current?.isFieldTouched(FORM_PASSWORD_FIELD) &&
      form.current?.getFieldValue(FORM_PASSWORD_FIELD);

    if (isFormValid !== isValid) {
      setIsFormValid(isValid);
    }
  }, [isFormValid, form]);

  return (
    <div className="DeleteAccountScreen">
      <h1>{t("DELETE_ACCOUNT__TITLE")}</h1>
      <p>{t("DELETE_ACCOUNT__INFO")}</p>
      <p>{t("DELETE_ACCOUNT__WARNING")}</p>
      <Form
        key="DeleteAccountForm"
        name="UserForm"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        ref={form}
      >
        <LabelField name={FORM_PASSWORD_FIELD} rules={[buildRequiredRule()]}>
          <Input
            className="FormInput"
            placeholder={t("LOGIN__PASSWORD_LABEL")}
          />
        </LabelField>

        <div>
          <FormButton disabled={!isFormValid || isProcessing}>
            {t("COMMON__BUTTON_DELETE")}
          </FormButton>
        </div>

        <p className="DeleteAccountScreen__backButton" onClick={onCancel}>
          <span className="text-link text-underline">
            {t("COMMON__BUTTON_GO_BACK")}
          </span>
        </p>
      </Form>
    </div>
  );
};
