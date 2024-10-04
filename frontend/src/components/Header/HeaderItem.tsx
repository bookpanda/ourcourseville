import Link from "next/link";
import { FC, PropsWithChildren } from "react";

interface HeaderItemProps extends PropsWithChildren {
  href: string;
  children: React.ReactNode;
}

export const HeaderItem: FC<HeaderItemProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="text-primary-default border-primary-default border-b-2 py-1"
    >
      <div className="hover:text-primary-default hover:bg-primary-bg flex items-center gap-2 rounded-2xl px-2 py-3.5">
        {children}
      </div>
    </Link>
  );
};
