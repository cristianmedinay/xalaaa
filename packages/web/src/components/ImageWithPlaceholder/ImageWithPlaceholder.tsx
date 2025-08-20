/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { CellType, ThemeContext } from "@xala/common";
import * as React from "react";
import isEqual from "react-fast-compare";

import { LoaderSpinner } from "../LoaderSpinner";

import "./ImageWithPlaceholder.scss";

export interface Props {
  imageContainerClassName?: string; // custom className for component
  imageContainerStyles?: React.CSSProperties; // custom styles for component
  imageClassName?: string; // custom styles for image element
  imageSrc?: string; // source for the image which will be rendered once it is loaded
  spinner?: boolean;
  gradient?: string;
  placeholderSrc?: string;
  cellType?: CellType;
  alt?: string;
}

export interface State {
  hasBeenLoaded?: string; // flag that indicates whether or not image has been loaded
}

/*
 * Component which will display given image based od imageSrc. Until image is not loaded (ready to be rendered)
 * a placeholder image will be rendered
 */
class ImageWithPlaceholder extends React.Component<Props, State> {
  static contextType = ThemeContext;

  private _imageLoader: HTMLImageElement = new Image();
  private _mounted = false;

  public state = {
    hasBeenLoaded: "",
  };

  public componentDidMount() {
    const { imageSrc } = this.props;
    this._mounted = true;
    this._loadImage(imageSrc);
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.imageSrc !== this.props.imageSrc) {
      this.setState({ hasBeenLoaded: undefined });
      this._loadImage(this.props.imageSrc);
    }
  }

  public componentWillUnmount() {
    this._imageLoader.src = "";
    this._mounted = false;
  }

  public shouldComponentUpdate(nextProps: Props, nextState: State) {
    return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
  }

  public get viewContent() {
    const { hasBeenLoaded } = this.state;
    const { alt, imageClassName, imageSrc, gradient, spinner, placeholderSrc } =
      this.props;

    if (hasBeenLoaded) {
      const imgClassName = imageClassName
        ? `ImageWithPlaceholder-img ${imageClassName}`
        : "ImageWithPlaceholder-img";
      return (
        <img
          alt={alt || "placeholder"}
          key="placeholder"
          draggable={false}
          src={imageSrc}
          className={imgClassName}
        />
      );
    } else if (!gradient && placeholderSrc && spinner) {
      return (
        <div key="spinner" className="ImageWithPlaceholder-spinner">
          <LoaderSpinner />
        </div>
      );
    }

    return [];
  }

  public render() {
    const {
      children,
      imageContainerClassName = "",
      imageContainerStyles = {},
      gradient,
      placeholderSrc,
      cellType,
    } = this.props;
    const { hasBeenLoaded } = this.state;
    const backgroundStyle = imageContainerStyles;

    if (!hasBeenLoaded) {
      if (gradient) {
        backgroundStyle.backgroundImage = gradient;
      } else if (placeholderSrc) {
        let borderRadius;
        if (cellType === CellType.Round) {
          borderRadius = "100%";
        } else if (cellType === CellType.Channel) {
          borderRadius = "10px";
        } else {
          borderRadius = "5px";
        }

        let backgroundPosition;

        switch (cellType) {
          case CellType.Promo:
            backgroundPosition = "left";
            break;
          case CellType.Custom:
            backgroundPosition = "top";
            break;
          default:
            backgroundPosition = "center";
            break;
        }

        backgroundStyle.backgroundImage = `url(${placeholderSrc})`;
        backgroundStyle.backgroundColor = this.context.themeProvider.getColor(
          "AppCellsBackgroundColor"
        );
        backgroundStyle.backgroundRepeat = "no-repeat";
        backgroundStyle.backgroundSize = "cover";
        backgroundStyle.borderRadius = borderRadius;
        backgroundStyle.backgroundPosition = backgroundPosition;
      }
    }

    return (
      <div
        className={
          imageContainerClassName
            ? imageContainerClassName
            : "ImageWithPlaceholder"
        }
        style={backgroundStyle}
      >
        {this.viewContent}
        {children}
      </div>
    );
  }

  private _loadImage(currentOverlayImage = "") {
    if (!this._mounted) {
      return;
    }

    this._imageLoader.src = currentOverlayImage;
    this._imageLoader.onload = () => {
      if (!this._mounted) {
        return;
      }
      this.setState({ hasBeenLoaded: this.props.imageSrc });
    };
  }
}

export default ImageWithPlaceholder;
