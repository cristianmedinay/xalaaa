/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { useEffect, useState } from "react";

export const useHandleTouchEvents = (
  slider: React.RefObject<HTMLDivElement>,
  innerWidth: number,
  MARGIN_RIGHT: number,
  MARGIN_LEFT: number,
  setTransform: (value: number | ((prev: number) => number)) => void,
  setIsTransition: (value: boolean) => void
) => {
  const [newWidth, setNewWidth] = useState(innerWidth);
  const [isTouchEnd, setIsTouchEnd] = useState(true);
  const [valueToTransform, setValueToTransform] = useState([0]);
  const [touchX, setTouchX] = useState(0);

  useEffect(() => {
    if (
      slider.current &&
      slider.current.getBoundingClientRect().right <
        innerWidth - MARGIN_RIGHT &&
      newWidth !== innerWidth
    ) {
      const transformValue =
        slider.current.getBoundingClientRect().right -
        innerWidth +
        MARGIN_RIGHT;

      setTransform((prev) => prev - transformValue);
      setIsTransition(false);
      setNewWidth(innerWidth);
    }

    let timer: NodeJS.Timeout;
    if (isTouchEnd) {
      timer = setTimeout(() => {
        if (
          slider.current &&
          slider.current.getBoundingClientRect().left - MARGIN_LEFT > 0
        ) {
          setIsTransition(true);
          setTransform(0);
        }
        if (
          slider.current &&
          slider.current.getBoundingClientRect().right <
            innerWidth - MARGIN_RIGHT
        ) {
          const transformValue =
            innerWidth - slider.current.getBoundingClientRect().right;
          setIsTransition(true);
          setTransform((prev) => prev + transformValue);
        }
      }, 270);
    }

    return () => clearTimeout(timer);
  }, [
    innerWidth,
    isTouchEnd,
    newWidth,
    MARGIN_LEFT,
    MARGIN_RIGHT,
    setIsTransition,
    setTransform,
    slider,
  ]);

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    event.persist();
    setTouchX(event.touches[0].clientX);
    setValueToTransform([0]);
    setIsTransition(true);
    setIsTouchEnd(false);
  };

  const onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    event.persist();
    setValueToTransform((prev) => [...prev, event.touches[0].clientX - touchX]);
    if (valueToTransform.length > 1) {
      setTransform(
        (prev) =>
          prev +
          (valueToTransform[valueToTransform.length - 1] -
            valueToTransform[valueToTransform.length - 2])
      );
    }
  };

  const onTouchEnd = () => {
    setIsTouchEnd(true);
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
};
