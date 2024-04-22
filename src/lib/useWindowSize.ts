import { useState, useEffect } from "react";
import { useMounted } from "@/lib/useMounted";

export const useWindowSize = () => {
  const mounted = useMounted();

  const [width, setWidth] = useState<number | undefined>();
  const [height, setHeight] = useState<number | undefined>();

  const handleWindowResize = () => {
    if (window?.innerWidth > 0) {
      setWidth(window.innerWidth);
    }
    if (window?.innerHeight > 0) {
      setHeight(window.innerHeight);
    }
  };

  useEffect(() => {
    if (mounted) {
      handleWindowResize();
      window.addEventListener("resize", handleWindowResize);

      return () => window.removeEventListener("resize", handleWindowResize);
    }
  }, [mounted]);

  return { windowWidth: width, windowHeight: height };
};
