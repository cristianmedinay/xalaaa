/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useConfigurationSelector } from "@xala/common";
import React from "react";
import { useTranslation } from "react-i18next";

import { InputSelect, Option } from "components";

import "./LanguageSelector.scss";

export const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const configuration = useConfigurationSelector();

  const languages = configuration?.Languages;

  const languageOptions = languages?.map((lang) => (
    <Option value={lang.Code} key={lang.Code}>
      {lang.Name}
    </Option>
  ));

  const onChangeLanguage = (code: string) => i18n.changeLanguage(code);

  return (
    <div className={"LanguageSelector"}>
      <label htmlFor="language-selector">
        {t("LANGUAGE_SELECTOR", "Language")}
      </label>
      <InputSelect
        value={i18n.language}
        setItemValueString={onChangeLanguage}
        showSearch={false}
        id="language-selector"
      >
        {languageOptions}
      </InputSelect>
    </div>
  );
};
