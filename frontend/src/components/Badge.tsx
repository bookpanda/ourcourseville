import clsx from "clsx";
import { FC } from "react";

interface BadgeProps {
  color: string;
  text: string;
}

export const Badge: FC<BadgeProps> = ({ color, text }) => {
  return (
    <div
      className={clsx(
        `bg-${color}`,
        "border-success-default min-h-[22px] min-w-fit rounded-full border px-3 py-0.5 text-center text-xs text-white lg:min-h-[28px] lg:py-1 lg:text-sm"
      )}
    >
      {text}
    </div>
  );
};
