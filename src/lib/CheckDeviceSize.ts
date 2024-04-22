import { useWindowSize } from "@/lib/useWindowSize";

export const CheckDeviceSize = (pixels: number) => {
  const { windowWidth } = useWindowSize();
  if (windowWidth === undefined) {
    return windowWidth;
  }
  return windowWidth <= pixels;
};
