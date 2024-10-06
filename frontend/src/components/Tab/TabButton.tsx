import clsx from "clsx";
import { FC } from "react";

interface TabButtonProps {
  text: string;
  isActive: boolean;
  onClick: () => void;
}

export const TabButton: FC<TabButtonProps> = ({ text, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        isActive
          ? "border-b-2 border-primary-default"
          : "border-default border-b-[1px]",
        "box-border h-10 w-full flex-auto whitespace-nowrap px-4 py-2 lg:h-[50px] lg:py-3"
      )}
    >
      <div
        className={clsx(
          isActive ? "inline-block" : "flex justify-center gap-2",
          "h-full flex-row items-center text-center"
        )}
      >
        <div
          className={clsx(
            isActive ? "font-semibold text-primary-default" : "font-normal",
            "h5 hidden w-fit whitespace-nowrap lg:inline-block"
          )}
        >
          {text}
        </div>
        <div className="lg:hidden">{text}</div>
      </div>
    </button>
  );
};
