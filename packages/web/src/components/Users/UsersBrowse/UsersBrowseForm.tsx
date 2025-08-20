/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { DataProvider, IUserModel } from "@xala/common";
import React, { ChangeEventHandler, useEffect, useState } from "react";

import User from "../User";

import "./UsersBrowseForm.scss";

import SearchIcon from "../../../resources/icons/search.svg";

import { useTranslation } from "react-i18next";

import { LoaderSpinner, MediaButton } from "../..";

import { MediaButtonVariant } from "enums";

export interface IUsersBrowseFormProps {
  onUserSelect: (user: IUserModel | undefined) => void;
  closeDialog: () => void;
  debounceTimeout?: number;
  titleTranslationKey?: string;
}

const UsersBrowseForm: React.FC<IUsersBrowseFormProps> = ({
  onUserSelect,
  closeDialog,
  debounceTimeout,
  titleTranslationKey,
}) => {
  const { t } = useTranslation();
  const [usersResult, setUsersResult] = useState<IUserModel[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<IUserModel>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(
      setTimeout(
        () => {
          search();
          setTimeoutId(undefined);
        },
        debounceTimeout ? debounceTimeout : 2000
      )
    );
  }, [searchQuery]);

  const onInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setLoading(true);
    setSearchQuery(event.target.value);
  };

  const setLoading = (loading: boolean) => {
    if (isLoading !== loading) {
      setIsLoading(loading);
    }
  };

  const selectUser = (user: IUserModel | undefined) => {
    setSelectedUser(user);
    onUserSelect(user);
  };

  const search = () => {
    DataProvider.browseUsers({
      FullTextSearch: searchQuery,
    }).then((response) => {
      setUsersResult(response.Entities);
      setLoading(false);
    });
  };

  const removeSelectedUser = () => {
    if (selectedUser !== undefined) {
      selectUser(undefined);
    }
  };

  const cancel = () => {
    selectUser(undefined);
    closeDialog();
  };

  const confirm = () => {
    closeDialog();
  };

  return (
    <div className="BrowseUsersForm">
      <h1>{t(titleTranslationKey ?? "USER_BROWSE_TITLE")}</h1>
      <div className="SelectedUser" onClick={removeSelectedUser}>
        {selectedUser ? (
          <User
            className="SelectedUserItem"
            name={selectedUser.FullName ? selectedUser.FullName : "Anonimous"}
            email={selectedUser.Email}
            avatarUrl={selectedUser.AvatarUrl}
          />
        ) : (
          <p>
            {t("USER_BROWSE__NO_SELECTED_USER_PLACEHOLDER", "No user selected")}
          </p>
        )}
      </div>
      <div className="SearchField">
        <input onChange={onInput} value={searchQuery} />
        <div className="SearchIcon">
          <SearchIcon />
        </div>
      </div>

      <ul className="SearchUsersList">
        {isLoading ? (
          <LoaderSpinner />
        ) : (
          usersResult.map((user) => (
            <li
              key={user.Id}
              className="UserListItem"
              onClick={() => selectUser(user)}
            >
              <User
                className="UserInList"
                name={user.FullName ? user.FullName : "Anonimous"}
                email={user.Email}
                avatarUrl={user.AvatarUrl}
              />
            </li>
          ))
        )}
      </ul>
      <div className="BrowseUsersFormActions">
        <MediaButton
          type="button"
          className="Cancel"
          variant={MediaButtonVariant.Plain}
          onClick={cancel}
        >
          {t("COMMON__BUTTON_CANCEL", "Cancel")}
        </MediaButton>

        <MediaButton
          type="button"
          className="Confirm"
          variant={MediaButtonVariant.Primary}
          onClick={confirm}
        >
          {t(`COMMON__BUTTON_CONFIRM`, "Confirm")}
        </MediaButton>
      </div>
    </div>
  );
};

export default UsersBrowseForm;
