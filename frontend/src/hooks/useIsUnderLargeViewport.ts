import { useEffect, useState } from "react";

export const useIsUnderLargeViewport = () => {
  const [isUnderLarge, setIsUnderLarge] = useState(
    () => window.innerWidth < 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setIsUnderLarge(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isUnderLarge };
};
