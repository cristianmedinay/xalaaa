/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ROUTES } from "@xala/common";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Button, FormLine } from "components";
import { RenderMailLink } from "helpers";

import "../../Form/Form.scss";
import "../AuthForm.scss";

import "./RegisterForm.scss";

export const RegisterSuccess = () => {
  const { t } = useTranslation();

  return (
    <div className="RegisterSuccess AuthForm">
      <div className="form">
        <h1 className="text-upper text-center">
          {t("REGISTER_SUCCESS__TITLE")}
        </h1>
        <p className="text-center text-large">
          {t("REGISTER_SUCCESS__SUBTITLE")}
        </p>
        <FormLine style={{ marginTop: "25px" }} />

        <p className="text-center text-large">
          {t("REGISTER_SUCCESS__MESSAGE_1")}
        </p>
        <p className="text-center text-large">
          {t("REGISTER_SUCCESS__MESSAGE_2")}
        </p>
        <div className="ButtonLine">
          <Link to={ROUTES.MAIN_SCREEN}>
            <Button buttonClassName="FormButton" type="button">
              {t("REGISTER_SUCCESS__CONFIRM", "OK")}
            </Button>
          </Link>
        </div>

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
    </div>
  );
};
