/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";
import { List } from "rc-field-form";

import {
  IUsersInAssetFieldProps,
  paymentInitialValue,
  ProfitSharingType,
  UsersInAssetField,
} from "./UsersInAssetField";

import PlusIcon from "../../resources/icons/Plus.svg";

import "./UsersInAssetFieldList.scss";

import {
  buildRequiredObjectSinglePropertyRule,
  DataProvider,
  IErrorModel,
  IUserInAssetRoleModel,
  useDataLoader,
  UserInAssetInputCode,
  UserInAssetRoles,
} from "@xala/common";
import { FormInstance } from "rc-field-form/es/interface";
import { useTranslation } from "react-i18next";

import { LabelField } from "..";

export interface IUsersInAssetFieldListProps
  extends Partial<IUsersInAssetFieldProps> {
  listName: string;
  form: FormInstance;
  namePrefix: string;
  label?: string;
  userRole?: string;
  initialValue?: ProfitSharingType[];
}

export const UsersInAssetFieldList = ({
  listName,
  label,
  initialValue,
  namePrefix,
  userRole,
  ...props
}: IUsersInAssetFieldListProps) => {
  const { t } = useTranslation();
  const { data: roles } = useDataLoader<IUserInAssetRoleModel[], IErrorModel>({
    loader: () =>
      DataProvider.getUserInAssetRoles().then((data) => ({
        ok: true,
        data,
      })),
    deps: [],
  });

  const getInputError = (inputErrorCode: string): string => {
    const REQUIRED_VALIDATION_MESSAGE = t(
      "REQUIRED_VALIDATION_MESSAGE",
      "This field is required."
    ).toLowerCase();

    switch (inputErrorCode) {
      case "Role":
        return `${t("ROLE", "Role")}: ${REQUIRED_VALIDATION_MESSAGE}`;

      case "UserName":
        return `${namePrefix} ${t(
          "USER_IN_ASSET_EVENT_NAME",
          "Name"
        )}: ${REQUIRED_VALIDATION_MESSAGE}`;

      default:
        return "";
    }
  };

  return (
    <div className="creators">
      <List name={listName} initialValue={initialValue}>
        {(fields, { add, remove }) => (
          <ul className="asset-creator-list">
            {label && <h3>{label}</h3>}
            {fields.map((field) => (
              <LabelField
                {...field}
                key={field.key}
                rules={[
                  buildRequiredObjectSinglePropertyRule(
                    UserInAssetInputCode.ROLE,
                    getInputError(UserInAssetInputCode.ROLE)
                  ),
                  buildRequiredObjectSinglePropertyRule(
                    UserInAssetInputCode.USERNAME,
                    getInputError(UserInAssetInputCode.USERNAME)
                  ),
                ]}
              >
                {({ onChange, value }) => (
                  <UsersInAssetField
                    key={field.key}
                    field={field}
                    namePrefix={namePrefix}
                    remove={remove}
                    roles={roles}
                    onChange={onChange}
                    value={value}
                    {...props}
                  />
                )}
              </LabelField>
            ))}
            {userRole !== UserInAssetRoles.Creator && (
              <button
                className="asset-list-add"
                onClick={() => add(paymentInitialValue)}
                type="button"
              >
                <PlusIcon />
                {t("MEDIA_CREATOR__CREATORS__ADD_NEXT", "Add next")}
              </button>
            )}
          </ul>
        )}
      </List>
    </div>
  );
};
