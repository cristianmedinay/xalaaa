/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { List } from "rc-field-form";
import React from "react";

import PlusIcon from "resources/icons/Plus.svg";

import {
  AssetCreatorField,
  IAssetCreatorFieldProps,
  paymentInitialValue,
} from "./AssetCreatorField";

export interface IAssetCreatorFieldListProps
  extends Partial<IAssetCreatorFieldProps> {
  listName: string;
  label?: string;
}

export const AssetCreatorFieldList = ({
  listName,
  label,
  ...props
}: IAssetCreatorFieldListProps) => (
  <List name={listName} initialValue={[paymentInitialValue]}>
    {(fields, { add, remove }) => (
      <ul className="asset-list">
        {label && <h3>{label}</h3>}
        {fields.map((field) => (
          <AssetCreatorField
            key={field.key}
            field={field}
            remove={remove}
            {...props}
          />
        ))}
        <button
          className="asset-list-add"
          onClick={() => add(paymentInitialValue)}
          type="button"
        >
          <PlusIcon />
          Add next asset {props.prefix?.toLocaleLowerCase() || "creator"}
        </button>
      </ul>
    )}
  </List>
);
