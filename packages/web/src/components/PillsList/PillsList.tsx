/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Field, FormInstance, List } from "rc-field-form";
import React, { useState } from "react";

import "./PillsList.scss";

import { Pill, PillType } from "../Pill";
import PlusIcon from "../../resources/icons/Plus.svg";
import { Dialog } from "..";

export type AddPillCallback = (val: PillType) => void;

export interface IPillsListProps {
  label: string;
  listName: string;
  form: FormInstance;
  initialValue?: PillType[];
  dialogContent?: (
    add: AddPillCallback,
    closeDialog: () => void
  ) => React.ReactNode;
}

export const PillsList = ({
  label,
  listName,
  form,
  initialValue = [],
  dialogContent,
}: IPillsListProps) => {
  const [shouldShowDialog, setShouldShowDialog] = useState(false);
  const closeModal = () => setShouldShowDialog(false);
  const showModal = () => setShouldShowDialog(true);

  return (
    <List name={listName} initialValue={initialValue}>
      {(fields, { add, remove }) => (
        <div className="PillList">
          <div className="Label">
            <label>{label}</label>
          </div>
          <ul className="list-of-pills">
            {fields.map((field) => (
              <Field {...field} key={field.key}>
                {({ value }) => (
                  <Pill
                    onClick={() => remove(field.name)}
                    title={value.title}
                    showIcon
                  />
                )}
              </Field>
            ))}
            <button
              type="button"
              className="pill-box add-button"
              onClick={showModal}
            >
              <PlusIcon />
            </button>
          </ul>
          {dialogContent && (
            <Dialog
              wrapClassName="add-asset-dialog"
              destroyOnClose={true}
              footer={null}
              visible={shouldShowDialog}
              onCancel={closeModal}
            >
              {dialogContent((value: PillType) => {
                const values = form.getFieldValue(listName);
                if (!(values as PillType[])?.find((v) => v.id === value.id)) {
                  add(value);
                }
              }, closeModal)}
            </Dialog>
          )}
        </div>
      )}
    </List>
  );
};
