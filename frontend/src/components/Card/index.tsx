import Link from "next/link";
import { FC, PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  href: string;
}

export const Card: FC<CardProps> = ({ href, children }) => {
  return (
    <Link href={href} className="w-full">
      <div className="border-disable m-0 flex w-full min-w-[188px] cursor-pointer flex-col gap-2 rounded-xl border bg-white p-4 shadow-sm transition-all duration-200 ease-in-out hover:translate-y-[-4px] hover:shadow-md">
        {children}
      </div>
    </Link>
  );
};
