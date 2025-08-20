/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  DataProvider,
  IAssetAgeRestrictionModel,
  IErrorModel,
  useDataLoader,
} from "@xala/common";
import React from "react";
import { useTranslation } from "react-i18next";

import { Option, Select } from "..";

import "./AssetAgeOptions.scss";

export interface IAssetAgeOptionsProps {
  onChange?: (value: number) => void;
  defaultValue?: number;
}
export const AssetAgeOptions: React.FC<IAssetAgeOptionsProps> = (props) => {
  const { t } = useTranslation();

  const { data } = useDataLoader<IAssetAgeRestrictionModel[], IErrorModel>({
    loader: () =>
      DataProvider.selectAgeRestriction().then((data) => ({
        ok: true,
        data,
      })),
    deps: [],
  });

  return (
    <Select<number>
      placeholder={t("COMMON__AGE_RESTRICTION", "Age restriction")}
      defaultValue={props.defaultValue}
      onChange={props.onChange}
    >
      {data?.map((age) => (
        <Option
          value={age.ValueMin}
          key={age.ValueMin}
          style={{ zIndex: 99999, backgroundColor: "#000000" }}
        >
          {age.ValueMin}
        </Option>
      ))}
    </Select>
  );
};
