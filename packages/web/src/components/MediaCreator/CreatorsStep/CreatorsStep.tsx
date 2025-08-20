/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  DataProvider,
  IAppState,
  IErrorModel,
  IFormValues,
  IUserInAssetModel,
  IUserInAssetRoleModel,
  RecordStatus,
  useDataLoader,
  UserInAssetRoles,
  IUsersInAssetListModel,
} from "@xala/common";
import useForm from "rc-field-form/lib/useForm";
import React, { useContext, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { Form } from "../..";
import {
  ProfitSharingType,
  UsersInAssetFieldList,
} from "../../UsersInAssetFieldList";
import { MediaContext } from "../MediaContext";
import { MediaFooter } from "../MediaFooter";

import "./CreatorsStep.scss";

export interface ICreatorStepProps {
  nextStep: () => void;
  previousStep: () => void;
}

export const CreatorsStep: React.FC<ICreatorStepProps> = (props) => {
  const { t } = useTranslation();
  const media = useContext(MediaContext);
  const appState = useSelector((state: IAppState) => state.auth);
  const [form] = useForm();

  const [errors, setErrors] = useState<React.ReactElement[]>([]);

  const { data: defaultUsers } = useDataLoader<
    IUsersInAssetListModel,
    IErrorModel
  >({
    loader: () =>
      DataProvider.searchUsersInAsset({
        AssetId: media.data.Id,
      }).then((data) => {
        return {
          ok: true,
          data: data,
          error: {},
        };
      }),
    deps: [],
  });

  const loggedUser = appState.user
    ? [
        {
          ProfitSharing: 100,
          Role: UserInAssetRoles.Creator,
          UserName: appState.user.FullName!,
          UserId: appState.user.Id,
        },
      ]
    : [];

  const [defaultCreators, setDefaultCreators] =
    useState<ProfitSharingType[]>(loggedUser);
  const [defaultNotCreators, setDefaultNotCreators] = useState<
    ProfitSharingType[]
  >([]);

  useEffect(() => {
    if (defaultUsers && defaultUsers.Entities.length > 0) {
      let temp = defaultUsers.Entities.map((user) => {
        if (user.Role === UserInAssetRoles.Creator) {
          return {
            ProfitSharing: user.Profit,
            Role: user.Role as UserInAssetRoles,
            UserName: user.UserFullName,
            UserId: user.UserId,
          };
        }
        return null;
      });
      let filtered = temp.filter(Boolean) as ProfitSharingType[];
      setDefaultCreators(filtered);
      form.setFieldsValue({
        creators: filtered,
      });

      temp = defaultUsers.Entities.map((user) => {
        if (user.Role !== UserInAssetRoles.Creator) {
          return {
            ProfitSharing: user.Profit,
            Role: user.Role as UserInAssetRoles,
            UserName: user.UserFullName,
            UserId: user.UserId,
          };
        }
        return null;
      });
      filtered = temp.filter(Boolean) as ProfitSharingType[];
      setDefaultNotCreators(filtered);
      form.setFieldsValue({
        users: filtered,
      });
    }
  }, [defaultUsers]);

  const { data: roles } = useDataLoader<IUserInAssetRoleModel[], IErrorModel>({
    loader: () =>
      DataProvider.getUserInAssetRoles().then((data) => ({
        ok: true,
        data,
      })),
    deps: [],
  });

  const creatorRoles = roles?.filter(
    (role) => role.Code === UserInAssetRoles.Creator
  );
  const usersRoles = roles?.filter(
    (role) => role.Code !== UserInAssetRoles.Creator
  );

  const prepareUsers = (users: IUserInAssetModel[]) => {
    if (defaultUsers && defaultUsers.Entities.length > 0) {
      const defaultUsersIds = defaultUsers.Entities.map(
        (user) => `${user.UserId}-${user.Role}`
      );
      const usersFromFormIds = users.map(
        (user) => `${user.UserId}-${user.Role}`
      );

      const newAndUpdatedUsers = users
        .map((user) => {
          if (!defaultUsersIds.includes(`${user.UserId}-${user.Role}`)) {
            return {
              ...user,
              RowVersion: user.RowVersion,
              RecordStatus: RecordStatus.Inserted,
            };
          } else if (defaultUsersIds.includes(`${user.UserId}-${user.Role}`)) {
            return {
              ...user,
              RowVersion: user.RowVersion,
              RecordStatus: RecordStatus.Updated,
            };
          }
        })
        .filter(Boolean) as IUserInAssetModel[];

      const deletedUsers = defaultUsers.Entities.map((user) => {
        if (!usersFromFormIds.includes(`${user.UserId}-${user.Role}`)) {
          return {
            ...user,
            Profit: 0,
            RowVersion: user.RowVersion,
            RecordStatus: RecordStatus.Deleted,
          };
        }
      }).filter(Boolean) as IUserInAssetModel[];

      return {
        newAndUpdatedUsers,
        deletedUsers,
      };
    } else {
      return {
        newAndUpdatedUsers: users,
        deletedUsers: [],
      };
    }
  };

  const onSubmit = (values: IFormValues) => {
    const creators: IUserInAssetModel[] = values.creators
      ? values.creators.map((value: any) => {
          return {
            UserId: value["UserId"],
            UserFullName: value["UserName"],
            Role: value["Role"],
            Profit: parseInt(value["ProfitSharing"]),
            RecordStatus: RecordStatus.NoChange,
          };
        })
      : [];

    const users: IUserInAssetModel[] = values.users
      ? values.users.map((value: any) => {
          return {
            UserId: value["UserId"],
            UserFullName: value["UserName"],
            Role: value["Role"],
            Profit: parseInt(value["ProfitSharing"]),
            RecordStatus: RecordStatus.NoChange,
          };
        })
      : [];

    const preparedUsers = prepareUsers([...creators, ...users]);

    DataProvider.inviteManyUsers({
      AssetId: media.data.Id,
      Users: preparedUsers.newAndUpdatedUsers,
    });

    DataProvider.removeManyUsersFromAsset({
      AssetId: media.data.Id,
      Users: preparedUsers.deletedUsers,
    });

    media.onReload();
    props.nextStep();
  };

  const onFinish = (values: IFormValues) => {
    if (errors.length === 0) onSubmit(values);
  };

  const percentsValidator = (value: ProfitSharingType[]) => {
    let percents = 0;
    if (value) {
      for (const profit of value) {
        percents += profit.ProfitSharing;
      }

      if (percents !== 100) {
        setErrors([
          <Trans key={"error"} i18nKey="VALIDATION__PROFIT_SHARING_NOT_100" />,
        ]);
        return Promise.reject("Profits of creators must sum up to 100%");
      }
    }
    setErrors([]);
    return Promise.resolve();
  };

  const triggerValidation = () => {
    const creators = form.getFieldValue("creators")
      ? form.getFieldValue("creators")
      : [];
    const users = form.getFieldValue("users")
      ? form.getFieldValue("users")
      : [];
    const value = [...creators, ...users];
    percentsValidator(value);
  };

  return (
    <Form
      className="creators-form"
      name="MediaCreatorsForm"
      form={form}
      onFinish={onFinish}
      onValuesChange={() => {
        triggerValidation();
      }}
    >
      <div className="creators-section">
        <h1>{t("MEDIA_CREATOR__CREATORS", "CREATORS")}</h1>
        <div className="creators-container">
          <UsersInAssetFieldList
            listName="creators"
            namePrefix="Creator"
            form={form}
            roles={creatorRoles ? creatorRoles : []}
            userRole={UserInAssetRoles.Creator}
            initialValue={defaultCreators}
          />
          <h3>{t("MEDIA_CREATOR__CREATORS__USERS", "Users")}</h3>
          <UsersInAssetFieldList
            listName="users"
            namePrefix="User"
            form={form}
            roles={usersRoles ? usersRoles : []}
            initialValue={defaultNotCreators}
            canRemoveFirst
          />
        </div>
      </div>
      <ul className="Error">
        {errors.map((error: React.ReactNode, index: number) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
      <MediaFooter goBack={props.previousStep} type="submit" />
    </Form>
  );
};
