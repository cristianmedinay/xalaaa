/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ANONYMOUS_ID } from "../constants";
import {
  IConfigurationModel,
  IDidomiDataModel,
  IUserAssetPropertiesModel,
  IUserInfoModel,
  UsersStorage,
} from "../models";
import { StorageManager } from "../services";

export class StorageHelper {
  static getUser(): Promise<IUserInfoModel> {
    return StorageManager.getValue("userId").then((userId) => {
      return StorageManager.getValue("users").then((users) => {
        if (users && userId) {
          return users[userId];
        }
      });
    });
  }

  static getBackendVersion() {
    return StorageManager.getValue("backendVersion");
  }

  static async getBrandingLogo(): Promise<string | undefined> {
    const configuration = (await StorageManager.getValue(
      "configuration"
    )) as IConfigurationModel;

    if (configuration) {
      return configuration.Branding?.WebHeaderLogoUrl;
    }
    return undefined;
  }

  static async getBackgroundColor(): Promise<string | undefined> {
    const configuration = (await StorageManager.getValue(
      "configuration"
    )) as IConfigurationModel;

    if (configuration) {
      return configuration.Branding?.AppBackgroundColor;
    }
    return undefined;
  }

  static async getPrimaryColor(): Promise<string | undefined> {
    const configuration = (await StorageManager.getValue(
      "configuration"
    )) as IConfigurationModel;
    if (configuration) {
      return configuration.Branding?.AppPrimaryColor;
    }
    return undefined;
  }

  static async getAppAdsBannerUrl(): Promise<string | undefined> {
    const configuration = (await StorageManager.getValue(
      "configuration"
    )) as IConfigurationModel;
    if (configuration) {
      return configuration.Branding?.AppAdsBannerUrl;
    }
    return undefined;
  }

  static setUser(
    user: IUserInfoModel | undefined,
    didomiData?: IDidomiDataModel
  ): Promise<void> {
    if (!user) {
      return Promise.resolve();
    }
    return StorageManager.getValue("users")
      .then((users: UsersStorage) => {
        if (!users) {
          users = {};
        }

        if (!user.DidomiData && didomiData) {
          user.DidomiData = didomiData;
        }
        if (user.Id) {
          // keep assetProperties
          const assetsProperties = users[user.Id]?.assetsProperties;
          users[user.Id] = { ...user, assetsProperties };
        }
        return users;
      })
      .then((users) => StorageManager.setValue("users", users))
      .then(() => StorageManager.setValue("userId", user.Id));
  }

  static deleteUser(): Promise<void> {
    return StorageManager.setValue("userId", ANONYMOUS_ID);
  }

  static userIdAndStoragePromise(): Promise<any> {
    return Promise.all([
      StorageManager.getValue("userId"),
      StorageManager.getValue("users"),
    ]);
  }

  /**
   * Replace only one asset props.
   * @param userAssetProperties All asset properties with the same `AssetId` will be replaced with this props. Other props will be intact
   */
  static updateUserAssetsProperties(
    userAssetProperties: IUserAssetPropertiesModel
  ): Promise<void> {
    return this.userIdAndStoragePromise().then(([userId, users]) => {
      if (userId && users) {
        const oldAssetProperties =
          users[userId].assetsProperties?.filter(
            (item: any) => item.AssetId != userAssetProperties.AssetId
          ) ?? [];
        const newAssetProperties = [userAssetProperties, ...oldAssetProperties];
        return this.setUserAssetsProperties(newAssetProperties);
      }
    });
  }

  /**
   * It clear all previous properties, and save new.
   * @param userAssetsProperties Properties array which will be stored in storage
   */
  static setUserAssetsProperties(
    userAssetsProperties: IUserAssetPropertiesModel[]
  ): Promise<void> {
    return this.userIdAndStoragePromise().then(([userId, users]) => {
      if (userId && users) {
        users[userId].assetsProperties = userAssetsProperties;
        return StorageManager.setValue("users", users);
      }
    });
  }

  static getUserAssetsProperties(): Promise<IUserAssetPropertiesModel[]> {
    return this.userIdAndStoragePromise().then(([userId, users]) => {
      if (userId && users) {
        return users[userId].assetsProperties ?? [];
      } else {
        return [];
      }
    });
  }

  static isOnMyList(mediaId: number): Promise<boolean> {
    return this.getUserAssetsProperties().then((assetsProperties) => {
      const assetProps = assetsProperties.find(
        (item) => item.AssetId == mediaId
      );
      return assetProps?.IsFavorite == true;
    });
  }

  static addToMyList(mediaId: number): Promise<void> {
    return this.setFavourite(mediaId, true);
  }

  static removeFromMyList(mediaId: number): Promise<void> {
    return this.setFavourite(mediaId, false);
  }

  private static setFavourite(
    mediaId: number,
    isFavourite: boolean
  ): Promise<void> {
    return this.getUserAssetsProperties()
      .then((assetsProperties) => {
        const assetProps = assetsProperties.find(
          (item) => item.AssetId == mediaId
        );
        return <IUserAssetPropertiesModel>{
          ...assetProps,
          AssetId: mediaId,
          IsFavorite: isFavourite,
        };
      })
      .then((assetProperties) =>
        this.updateUserAssetsProperties(assetProperties)
      );
  }

  static async getMyListIds(): Promise<number[]> {
    const assetProperties = await this.getUserAssetsProperties();
    return assetProperties
      .filter((asset) => Boolean(asset.IsFavorite))
      .map((asset) => asset.AssetId);
  }
}
