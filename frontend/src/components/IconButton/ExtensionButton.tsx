"use client";
import { FaExternalLinkAlt } from "react-icons/fa";

import Link from "next/link";
import { FC } from "react";

interface ExtensionButtonProps {
  url: string;
}

export const ExtensionButton: FC<ExtensionButtonProps> = ({ url }) => {
  return (
    <Link
      href={url}
      target="_blank"
      className="rounded-full p-2 text-medium hover:bg-primary-bg hover:text-primary-default"
    >
      <FaExternalLinkAlt className="outline-none" size={20} />
    </Link>
  );
};
