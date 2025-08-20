/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IMediaModel, IUserInfoModel } from "../models";

export class MediaHelper {
  /**
   * Check if user has access to product. If user bought that product or has subscription to package.
   * @param user `IUserInfoModel` is stored in `IAppState.auth.user`
   * @param productId
   */
  static isUserOwnMedia(user?: IUserInfoModel, media?: IMediaModel): boolean {
    if (!media || !media.Products || media.Products.length === 0) {
      return false;
    }

    if (!user || !user.Products || user.Products.length === 0) {
      return false;
    }

    const mediaProducts = media?.Products ?? [];
    const userProducts = user?.Products ?? [];
    return !!userProducts.some(
      (up) => mediaProducts.findIndex((mp) => mp.Id === up.Id) >= 0
    );
  }

  static getLongDescritpion(media?: IMediaModel) {
    if (!media) {
      return;
    }
    const { LongDescription, Description, ShortDescription } = media;

    return LongDescription ?? Description ?? ShortDescription;
  }
}
