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
          <Link href={item.href} className="w-full">
            <TabButton
              key={index}
              text={item.text}
              isActive={index === currentIndex}
            />
          </Link>
        ))}
      </div>
    </>
  );
};
