/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useMemo } from "react";

interface Props {
  isGrid?: boolean;
  itemWidth: number;
  isHover: boolean;
  isActive?: boolean;
  itemMargin: number;
}

export const useResponsivePodcastStyles = ({
  isGrid,
  isActive,
  isHover,
  itemWidth,
  itemMargin,
}: Props) =>
  useMemo(() => {
    const getAspectRatio = isGrid ? "2.33" : "1.6";

    const smallerSizes = isGrid ? 0.7 : 1;

    const containerStyles = {
      padding: itemWidth * 0.055 * smallerSizes,
      margin: `0 ${itemMargin}px`,
      aspectRatio: getAspectRatio,
    };

    const iconStyles = {
      width: itemWidth * 0.147 * smallerSizes,
      height: itemWidth * 0.147 * smallerSizes,
      marginRight: itemWidth * 0.027,
    };

    const durationStyles = {
      fontSize: itemWidth * 0.044 * smallerSizes,
    };

    const descriptionStyles = {
      fontSize: itemWidth * 0.041 * smallerSizes,
      marginBottom: itemWidth * 0.028 * smallerSizes,
    };

    const titleStyles = {
      fontSize: itemWidth * 0.05 * smallerSizes,
      marginBottom: itemWidth * 0.028 * smallerSizes,
    };

    const dateStyles = {
      fontSize: itemWidth * 0.044 * smallerSizes,
      marginBottom: itemWidth * 0.028 * smallerSizes,
    };

    return {
      iconStyles,
      durationStyles,
      descriptionStyles,
      titleStyles,
      dateStyles,
      containerStyles,
    };
  }, [itemWidth, isActive, isHover, isGrid]);
