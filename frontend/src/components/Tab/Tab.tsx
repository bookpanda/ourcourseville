import { useState } from "react";
import { TabButton } from "./TabButton";

export const Tab = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleClick = (index: number) => {
    setCurrentTab(() => index);
  };

  return (
    <>
      <div className="flex">
        <TabButton
          onClick={() => handleClick(0)}
          text="Records"
          isActive={currentTab === 0}
        />
        <TabButton
          onClick={() => handleClick(1)}
          text="Solution"
          isActive={currentTab === 1}
        />
      </div>
    </>
  );
};
