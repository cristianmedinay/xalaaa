/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ActionsObservable, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { AuthorizationHelper, StorageHelper, TimeHelper } from "../../helpers";
import { DataProvider } from "../../providers";
import { StorageManager } from "../../services";
import { SYNC_USER_FAILURE, SYNC_USER_SUCCESS } from "../auth/consts";
import { ISyncUserFailureAction, ISyncUserSuccessAction } from "../auth/types";
import { getMediaChannelsForUserSuccess } from "../media/actions";
import { getProductsSuccess } from "../user/actions";

import { finishAppUserDataPreload } from "./actions";

const preloadProducts = async () => {
  try {
    const user = await StorageHelper.getUser();
    const products = await DataProvider.getProducts();
    user.Products = products;

    return products;
  } catch (error) {
    console.error("Unable to get user products", error);
    return [];
  }
};

const preloadChannels = async () => {
  try {
    const channels = await DataProvider.getMediaChannelsForUser(true).then(
      (channels) =>
        channels
          // Return only channels that have SimilarMedia, since it will return current playing program
          .filter((channels) => Boolean(channels.SimilarMedia))
          // Remove nested SimilarMedia since object is too big to save in local
          // storage on Safari
          .map((channel) => ({
            ...channel,
            SimilarMedia: channel.SimilarMedia?.map((media) => {
              return {
                ...media,
                SimilarMedia: [],
              };
            }),
          }))
    );

    await StorageManager.setValue("channels", {
      lastUpdateDate: TimeHelper.getCurrentDateTime(),
      channels: channels,
    });

    return channels;
  } catch (error) {
    console.error("Unable to get media channels for user", error);
    return [];
  }
};

const preloadUserAssetsProperties = async () => {
  try {
    const userAssetsProperties = await DataProvider.getUserAssetsProperties();

    await StorageHelper.setUserAssetsProperties(userAssetsProperties);
  } catch (error) {
    console.error("Unable to get and save user properties", error);
  }
};

const preload = async () => {
  // Preload and set all necessary user data before app show any screen
  const products = await preloadProducts();
  const channels = await preloadChannels();

  const isAnonymous = await AuthorizationHelper.isAnonymous();

  if (!isAnonymous) {
    await preloadUserAssetsProperties();
  }

  return { products, channels };
};

const preloadUserDataEpic = (
  action$: ActionsObservable<ISyncUserSuccessAction>
) =>
  action$.pipe(
    ofType(SYNC_USER_SUCCESS),
    mergeMap(() => {
      return from(preload()).pipe(
        mergeMap((data) => {
          const { products, channels } = data;

          return of(
            // Return corresponding success actions to propagate data in store
            getProductsSuccess(products),
            getMediaChannelsForUserSuccess(channels),

            // Finish preload process
            finishAppUserDataPreload()
          );
        })
      );
    })
  );

const emptyPreloadUserDataEpic = (
  action$: ActionsObservable<ISyncUserFailureAction>
) =>
  action$.pipe(
    ofType(SYNC_USER_FAILURE),
    mergeMap(() => {
      return of(finishAppUserDataPreload());
    })
  );

export const coreEpics = [preloadUserDataEpic, emptyPreloadUserDataEpic];
