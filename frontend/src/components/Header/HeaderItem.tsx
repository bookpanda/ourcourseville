import clsx from "clsx";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";

interface HeaderItemProps extends PropsWithChildren {
  isSelected: boolean;
  href: string;
  children: React.ReactNode;
}

export const HeaderItem: FC<HeaderItemProps> = ({
  isSelected,
  href,
  children,
}) => {
  return (
    <Link
      href={href}
      className={clsx(
        "border-b-2 py-1",
        isSelected
          ? "text-primary-default border-primary-default"
          : "text-medium border-transparent"
      )}
    >
      <div className="hover:text-primary-default hover:bg-primary-bg flex items-center gap-2 rounded-2xl px-2 py-3.5">
        {children}
      </div>
    </Link>
  );
};
