/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  IUserInAssetRoleModel,
  IUserModel,
  UserInAssetRoles,
} from "@xala/common";
import { IUsersListModel } from "@xala/common/src/providers/DataProvider/Internal/models";
import { ListField } from "rc-field-form/lib/List";
import React from "react";
import { useTranslation } from "react-i18next";

import { UsersBrowse } from "..";
import Trash from "../../resources/icons/trash.svg";
import { Option, Select } from "../Select";

import "./UsersInAssetFieldList.scss";

const selectStyles = { zIndex: 99999, backgroundColor: "#000000" };
export interface ProfitSharingType {
  ProfitSharing: number;
  Role?: string;
  UserName?: string;
  UserId?: number;
}
export const paymentInitialValue: ProfitSharingType = {
  ProfitSharing: 0,
  Role: undefined,
  UserName: undefined,
  UserId: -1,
};

export interface IUsersInAssetFieldProps {
  users?: IUsersListModel;
  roles?: IUserInAssetRoleModel[];
  field: ListField;
  remove: (index: number | number[]) => void;
  onChange: (value: any) => void;
  value: ProfitSharingType;
  canRemoveFirst?: boolean;
  namePrefix: string;
}

export const UsersInAssetField = ({
  field,
  namePrefix,
  roles,
  remove,
  onChange,
  value,
  canRemoveFirst = false,
}: IUsersInAssetFieldProps) => {
  const { t } = useTranslation();
  const handleChange = (newValue: string | number, field: string) =>
    onChange && onChange({ ...value, [field]: newValue });
  const handleUserChange = (user?: IUserModel) => {
    onChange({
      ...value,
      ["UserName"]: user ? user.FullName : undefined,
      ["UserId"]: user?.Id,
    });
  };
  const handleRoleChange = (role: string) => {
    onChange({ ...value, ["Role"]: role });
  };

  return (
    <li>
      <div>
        <label>
          {t(
            namePrefix === UserInAssetRoles.Creator
              ? "USER_IN_ASSET_ROLE_CREATOR"
              : "MEDIA_CREATOR__CREATORS__USER"
          )}
        </label>
        <UsersBrowse
          defaultValue={value.UserName}
          onUserChange={handleUserChange}
          debounceTime={1500}
        />
      </div>
      <div>
        <label>{t("ROLE", "Role")}</label>
        <Select<string>
          defaultValue={value.Role}
          value={value.Role}
          onChange={handleRoleChange}
          placeholder={t("ROLE_PLACEHOLDER", "Select role")}
        >
          {roles?.map((role) => (
            <Option
              value={role.Code}
              key={role.DisplayName}
              style={selectStyles}
            >
              {t(`CREATOR_ROLE_LIST_${role.DisplayName.toUpperCase()}`)}
            </Option>
          ))}
        </Select>
      </div>
      <div>
        <label>
          {t("MEDIA_CREATOR__CREATORS__PROFIT_SHARING", "Profit sharing (%)")}
        </label>
        <input
          className="sharing-input"
          type="number"
          min={0}
          max={100}
          onChange={(e) =>
            handleChange(parseInt(e.currentTarget.value), "ProfitSharing")
          }
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
