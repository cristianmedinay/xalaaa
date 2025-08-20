/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IUserModel } from "@xala/common";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import SearchIcon from "../../../resources/icons/search.svg";

import "./UsersBrowse.scss";

import { Dialog } from "../..";

import UsersBrowseForm from "./UsersBrowseForm";

export interface UserBrowseProps {
  defaultValue?: string; // User name
  onChange?: (userName: string | undefined) => void;
  onUserChange?: (user?: IUserModel) => void;
  debounceTime?: number;
}

export const UsersBrowse: React.FC<UserBrowseProps> = ({
  onChange,
  onUserChange,
  defaultValue,
  debounceTime,
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<string>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const handleUserChange = (user: IUserModel | undefined) => {
    onChange?.(user ? user.FullName! : undefined);
    setValue(user ? user.FullName! : "");
    onUserChange?.(user);
  };

  const openDialog = () => {
    if (!isDialogOpen) {
      setIsDialogOpen(true);
    }
  };

  const closeDialog = () => {
    if (isDialogOpen) {
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="UsersBrowse">
      <div className="SelectedUser" onClick={openDialog}>
        <input
          defaultValue={defaultValue}
          value={value}
          placeholder={t("USER_BROWSE__USER_PLACEHOLDER", "Select user")}
          disabled
        />
        <div className="SearchIcon">
          <SearchIcon />
        </div>
      </div>
      <Dialog
        wrapClassName="user-browse-dialog"
        destroyOnClose={true}
        footer={null}
        visible={isDialogOpen}
        onCancel={closeDialog}
      >
        <UsersBrowseForm
          closeDialog={closeDialog}
          onUserSelect={(user) => handleUserChange(user)}
          debounceTimeout={debounceTime}
        />
      </Dialog>
    </div>
  );
};
