/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAssetPurchasePeriodTypeModel, ICurrencyModel } from "@xala/common";
import { Field } from "rc-field-form";
import { ListField } from "rc-field-form/lib/List";
import React from "react";
import { useTranslation } from "react-i18next";

import Trash from "../../resources/icons/trash.svg";
import { Option, Select } from "../Select";

const selectStyles = { zIndex: 99999, backgroundColor: "#000000" };
export const paymentInitialValue = { ProfitSharing: 1, Role: "", Name: "" };

export interface IAssetCreatorFieldProps {
  field: ListField;
  purchaseTypes?: IAssetPurchasePeriodTypeModel[];
  currencies?: ICurrencyModel[];
  prefix?: string;
  canRemoveFirst?: boolean;
  remove: (index: number | number[]) => void;
  onChange: (value: Record<string, string | number>) => void;
  value: { ProfitSharing: number; Role: string; Name: string };
}

export const AssetCreatorFieldTemplate = ({
  field,
  purchaseTypes,
  currencies,
  remove,
  onChange,
  value,
  canRemoveFirst = false,
  prefix = "Creator",
}: IAssetCreatorFieldProps) => {
  const { t } = useTranslation();
  const handleChange = (newValue: string | number, field: string) =>
    onChange && onChange({ ...value, [field]: newValue });
  const handleCurrencyChange = (
    newValue: string | number,
    { minprice }: any
  ) => {
    onChange && onChange({ ...value, CurrencyId: newValue, Price: minprice });
  };

  return (
    <li>
      <div>
        <label>{t(`${prefix.toUpperCase()}_name`, `${prefix} name`)}</label>
        <Select<string>
          onChange={(val) => handleChange(val, "Name")}
          placeholder={t("USER_PLACEHOLDER", "Select user")}
        >
          {purchaseTypes?.map(({ Code, TranslationKey, DisplayName }) => (
            <Option value={Code} key={Code} style={selectStyles}>
              {t(TranslationKey, DisplayName)}
            </Option>
          ))}
        </Select>
      </div>
      <div>
        <label>{t("ROLE", "Role")}</label>
        <Select<number>
          onChange={handleCurrencyChange}
          placeholder={t("ROLE_PLACEHOLDER", "Select role")}
        >
          {currencies?.map(({ Id, Name, MinPayment }) => (
            <Option
              value={Id}
              key={Id}
              style={selectStyles}
              minprice={MinPayment}
            >
              {Name}
            </Option>
          ))}
        </Select>
      </div>
      <div>
        <label>{t("PROFIT_SHARING", "Profit sharing (%)")}</label>
        <input
          className="sharing-input"
          type="number"
          min={0}
          max={100}
          onChange={(e) => handleChange(e.currentTarget.value, "ProfitSharing")}
          value={value.ProfitSharing}
          step={1}
        />
      </div>
      {((canRemoveFirst && field.key === 0) || field.key !== 0) && (
        <button className="remove-button" onClick={() => remove(field.name)}>
          <Trash />
        </button>
      )}
    </li>
  );
};

export const AssetCreatorField = (
  props: Omit<IAssetCreatorFieldProps, "onChange" | "value">
) => (
  <Field {...props.field}>
    {({ onChange, value }) => (
      <AssetCreatorFieldTemplate {...props} {...{ onChange, value }} />
    )}
  </Field>
);
