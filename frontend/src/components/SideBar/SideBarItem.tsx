import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface SideBarItemProps {
  icon: JSX.Element;
  text: string;
  href: string;
}

export const SideBarItem: FC<SideBarItemProps> = ({ icon, text, href }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <button
        className={clsx(
          isActive ? "bg-primary-bg" : "bg-white",
          "hover:bg-default h-12 w-full rounded-lg px-2 py-3"
        )}
        type="button"
      >
        <div className="flex h-full w-full items-center justify-between gap-2">
          <div
            className={clsx(
              isActive ? "text-primary-default" : "text-medium",
              "flex h-6 w-6 flex-row items-center justify-center"
            )}
          >
            {icon}
          </div>
          <div
            className={clsx(
              isActive && "text-primary-default",
              "line-clamp-1 flex-1 text-start text-base"
            )}
          >
            {text}
          </div>
        </div>
      </button>
    </Link>
  );
};
