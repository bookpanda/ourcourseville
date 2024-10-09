import clsx from "clsx";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";

interface NavItemProps extends PropsWithChildren {
  isSelected: boolean;
  isEnabled: boolean;
  isMobile: boolean;
  href: string;
  text: string;
  children: React.ReactNode;
}

export const NavItem: FC<NavItemProps> = ({
  isEnabled,
  isSelected,
  isMobile,
  href,
  text,
  children,
}) => {
  if (isMobile)
    return (
      <Link
        href={isEnabled ? href : "#"}
        className={clsx(
          "h5 hover:bg-default flex items-center gap-2 rounded-lg px-2 py-3 text-high",
          isSelected ? "bg-default" : "bg-white"
        )}
      >
        {isEnabled && (
          <>
            {children}
            {text}
          </>
        )}
      </Link>
    );

  return (
    <Link
      href={isEnabled ? href : "#"}
      className={clsx(
        "border-b-2 py-1",
        isSelected
          ? "border-primary-default text-primary-default"
          : "border-transparent text-medium"
      )}
    >
      <div
        className={clsx(
          isEnabled
            ? "hover:bg-primary-bg hover:text-primary-default"
            : "cursor-not-allowed text-gray-300",
          "flex items-center gap-2 rounded-2xl px-2 py-3.5"
        )}
      >
        {children}
        {text}
      </div>
    </Link>
  );
};
