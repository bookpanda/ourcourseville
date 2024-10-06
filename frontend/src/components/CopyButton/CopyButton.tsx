"use client";

import { toast } from "@/hooks/use-toast";
import { FC } from "react";
import { FaCopy } from "react-icons/fa";

interface CopyButtonProps {
  text: string;
}

export const CopyButton: FC<CopyButtonProps> = ({ text }) => {
  const handleClick = () => {
    navigator.clipboard.writeText(text);

    toast({
      title: "Copied",
      description: text,
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="hover:bg-default h-12 w-full rounded-lg px-2 py-3 text-medium"
    >
      <FaCopy size={20} />
    </button>
  );
};
