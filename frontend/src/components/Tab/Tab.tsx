import Link from "next/link";
import { FC } from "react";
import { TabButton } from "./TabButton";

interface TabProps {
  currentIndex: number;
  items: {
    text: string;
    href: string;
  }[];
}

export const Tab: FC<TabProps> = ({ currentIndex, items }) => {
  return (
    <>
      <div className="flex">
        {items.map((item, index) => (
          <Link key={index} href={item.href} className="w-full">
            <TabButton text={item.text} isActive={index === currentIndex} />
          </Link>
        ))}
      </div>
    </>
  );
};
