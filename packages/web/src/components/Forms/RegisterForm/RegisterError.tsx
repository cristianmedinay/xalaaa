/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import React, { ReactElement } from "react";
import { Trans, useTranslation } from "react-i18next";

import { FormLine } from "components/Form/FormLine";
import { RenderMailLink } from "helpers";

interface IRegisterErrorInterface {
  children: ReactElement;
}

export const RegisterError = ({ children }: IRegisterErrorInterface) => {
  const { t } = useTranslation();

  return (
    <div className="RegisterError AuthForm">
      <h1 className="text-upper text-center">{t("REGISTER_ERROR__TITLE")}</h1>
      <p className="text-center text-large">{t("REGISTER_ERROR__SUBTITLE")}</p>
      <ul style={{ marginTop: 0 }}>
        <li style={{ marginBottom: "10px" }} className="text-normal">
          {t("REGISTER_ERROR__MESSAGE_1")}
        </li>
        <li className="text-normal">{t("REGISTER_ERROR__MESSAGE_2")}</li>
      </ul>
      <FormLine style={{ margin: "25px 0" }} />
      {children}
      <p className="text-center text-normal">
        {
          <Trans
            i18nKey={t("REGISTER_SUCCESS__HINT")}
            components={{
              1: <RenderMailLink />,
            }}
          />
        }
      </p>
    </div>
  );
};
