import Link from "next/link";
import { FC } from "react";
import { TabButton } from "./TabButton";

interface TabProps {
  currentIndex: number;
  items: {
    text: string;
    href: string;
    isEnabled: boolean;
  }[];
}

export const Tab: FC<TabProps> = ({ currentIndex, items }) => {
  return (
    <>
      <div className="flex">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.isEnabled ? item.href : "#"}
            className="w-full"
          >
            <TabButton
              text={item.text}
              isActive={index === currentIndex}
              isEnabled={item.isEnabled}
            />
          </Link>
        ))}
      </div>
    </>
  );
};
