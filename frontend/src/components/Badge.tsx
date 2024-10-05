import clsx from "clsx";
import { FC } from "react";

interface BadgeProps {
  text: string;
}

export const Badge: FC<BadgeProps> = ({ text }) => {
  return (
    <div
      className={clsx(
        `bg-success-default`,
        "border-success-default min-h-[22px] min-w-fit rounded-full border px-3 py-0.5 text-center text-xs text-white lg:min-h-[28px] lg:py-1 lg:text-sm"
      )}
    >
      {text}
    </div>
  );
};
