/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import dayjs from "dayjs";

import { ANONYMOUS_ID } from "../constants";
import { IUserInfoModel } from "../models";
import { ITokenModel } from "../models/Auth";

import { StorageManager } from "./../services/StorageManager";
import { StorageHelper } from "./storageHelper";

export class AuthorizationHelper {
  static async isLoggedIn(): Promise<boolean> {
    const isAnonymous = await this.isAnonymous();
    const session = await this.session();
    if (isAnonymous || !session) {
      return false;
    } else {
      return true;
    }
  }

  static async isAuthenticated(): Promise<boolean> {
    const session = await StorageManager.getValue("session");

    return session && session.Token !== null;
  }

  static async isAnonymous(): Promise<boolean> {
    const user = await StorageHelper.getUser();

    return !user || user.Id === ANONYMOUS_ID;
  }

  static hasTokenExpired(token?: ITokenModel): boolean {
    if (!token) {
      return true;
    }

    const now = dayjs();
    const expireDate = dayjs(token.TokenExpires);

    return now.isAfter(expireDate);
  }

  static async session(): Promise<ITokenModel> {
    const session = await StorageManager.getValue("session");

    return session;
  }

  static async user(): Promise<IUserInfoModel> {
    const user = await StorageHelper.getUser();

    return user;
  }
}
