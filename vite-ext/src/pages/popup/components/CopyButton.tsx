"use client";

import { FC } from "react";
import { FaCopy } from "react-icons/fa";

interface CopyButtonProps {
  text: string;
}

export const CopyButton: FC<CopyButtonProps> = ({ text }) => {
  const handleClick = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="hover:bg-default text-medium h-12 w-full rounded-lg px-2 py-3"
    >
      <FaCopy size={20} />
    </button>
  );
};
