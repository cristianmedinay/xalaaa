/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAssetModel, ImageHelper, ThemeContext } from "@xala/common";
import React from "react";
import { BehaviorSubject, Subscription } from "rxjs";

import resources from "../../resources/app";

export interface ImageBackgroundProps {
  subject$?: BehaviorSubject<IAssetModel | undefined>;
}

interface ImageBackgroundState {
  backgroundImageSrc?: string;
}

export class ImageBackground extends React.Component<
  ImageBackgroundProps,
  ImageBackgroundState
> {
  static contextType = ThemeContext;
  private _subscriptions: Subscription[] = [];
  private _backgroundLoader: HTMLImageElement = new Image();
  private _backgroundLoaderTimeout?: number;

  state: Readonly<ImageBackgroundState> = {
    backgroundImageSrc: resources.background,
  };

  public componentDidMount() {
    const { subject$ } = this.props;

    if (!subject$) {
      return;
    }

    this._subscriptions.push(
      subject$.subscribe((asset: IAssetModel | undefined) => {
        const frameImageUrl = ImageHelper.getFrameImageUrl(asset?.Images);

        if (frameImageUrl) {
          if (this._backgroundLoaderTimeout) {
            clearTimeout(this._backgroundLoaderTimeout);
          }

          this._backgroundLoader.src = frameImageUrl;
          this._backgroundLoader.onload = () => {
            this._backgroundLoaderTimeout = window.setTimeout(() => {
              this.setState(() => ({ backgroundImageSrc: frameImageUrl }));
            }, 2000);
          };
        }
      })
    );
  }

  public componentWillUnmount() {
    // Cancel download image
    this._backgroundLoader.src = "";
    // Unsubscribe subscriptions
    this._subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }

  render() {
    const { backgroundImageSrc } = this.state;

    return (
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `url('${backgroundImageSrc}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          filter: "blur(8px)",
          WebkitFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: `linear-gradient(to bottom, rgba(255,255,255,0), ${this.context.themeProvider.getColor(
              "AppBackgroundColor"
            )})`,
          }}
        ></div>
      </div>
    );
  }
}
