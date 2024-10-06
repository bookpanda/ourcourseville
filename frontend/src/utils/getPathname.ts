import { headers } from "next/headers";

export const getPathname = () => {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");

  return pathname ?? "/";
};
