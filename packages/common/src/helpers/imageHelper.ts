/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { MediaImageType } from "../enums";
import { IMediaImageModel } from "../models";

export class ImageHelper {
  static getImageByType(
    images?: IMediaImageModel[],
    imageType?: MediaImageType
  ) {
    return images?.find((img) => img.ImageTypeCode === imageType);
  }

  static getHighlightsImage(images?: IMediaImageModel[]) {
    let image = this.getImageByType(images, MediaImageType.Highlights);

    if (!image) {
      image = this.getImageByType(images, MediaImageType.Frame);
    }

    return image;
  }

  static getHighlightsImageUrl(
    images?: IMediaImageModel[]
  ): string | undefined {
    if (!images || images.length === 0) {
      return undefined;
    }

    const image = this.getHighlightsImage(images);

    if (image) {
      return image.Url;
    }

    return undefined;
  }

  static getLandscapeImage(images?: IMediaImageModel[]) {
    let image = this.getImageByType(images, MediaImageType.Landscape);

    if (!image) {
      image = this.getImageByType(images, MediaImageType.Frame);
    }

    return image;
  }

  static getLandscapeImageUrl(images?: IMediaImageModel[]): string | undefined {
    if (!images || images.length === 0) {
      return undefined;
    }

    const image = this.getLandscapeImage(images);

    if (image) {
      return image.Url;
    }

    return undefined;
  }

  static getBackgroundImageUrl(
    images?: IMediaImageModel[]
  ): string | undefined {
    if (!images || images.length === 0) {
      return undefined;
    }

    const image = this.getBackgroundImage(images);

    if (image) {
      return image.Url;
    }

    return undefined;
  }

  static getBackgroundImage(images?: IMediaImageModel[]) {
    let image = this.getImageByType(images, MediaImageType.Background);

    if (!image) {
      image = this.getImageByType(images, MediaImageType.Frame);
    }

    return image;
  }

  static getFrameImage(images?: IMediaImageModel[]) {
    let image = this.getImageByType(images, MediaImageType.Frame);

    if (!image) {
      image = this.getImageByType(images, MediaImageType.Highlights);
    }

    return image;
  }

  static getFrameImageUrl(images?: IMediaImageModel[]) {
    const image = this.getFrameImage(images);

    if (image) {
      return image.Url;
    }
  }

  static getSquareImage(images?: IMediaImageModel[]) {
    const image = this.getImageByType(images, MediaImageType.Square);

    return image;
  }

  static getSquareImageUrl(images?: IMediaImageModel[]) {
    const image = this.getSquareImage(images);

    if (image) {
      return image.Url;
    }
  }
  static getRoundImage(images?: IMediaImageModel[]) {
    const image = this.getImageByType(images, MediaImageType.Round);

    return image;
  }

  static getRoundImageUrl(images?: IMediaImageModel[]): string | undefined {
    const image = this.getRoundImage(images);

    if (image) {
      return image.Url;
    }

    return undefined;
  }

  static getCoverImage(images?: IMediaImageModel[]) {
    const image = this.getImageByType(images, MediaImageType.Cover);

    return image;
  }

  static getCoverImageUrl(images?: IMediaImageModel[]): string | undefined {
    const image = this.getCoverImage(images);

    if (image) {
      return image.Url;
    }

    return undefined;
  }
}
