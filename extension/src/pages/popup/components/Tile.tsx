import { FC, PropsWithChildren } from "react";

export const Tile: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-light flex flex-col gap-3 rounded-lg p-2 lg:px-4 lg:py-2">
      {children}
    </div>
  );
};
