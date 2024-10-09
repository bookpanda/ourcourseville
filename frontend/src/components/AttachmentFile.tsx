import Link from "next/link";
import { FaFileArrowDown } from "react-icons/fa6";

import { FC } from "react";

interface AttachmentFileProps {
  url: string;
}

export const AttachmentFile: FC<AttachmentFileProps> = ({ url }) => {
  const fileName = url.split("/").pop();
  return (
    <Link href={url} target="_blank">
      <div className="bg-light flex min-h-[50px] w-full items-center justify-between gap-2 overflow-hidden rounded-lg p-2 lg:px-4 lg:py-1">
        <div className="flex w-full items-center gap-2">
          <FaFileArrowDown className="text-medium" size={20} />
          <div className="flex w-full flex-col">
            <h5 className="h6 lg:h5 line-clamp-1 break-all text-primary-default">
              {fileName}
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
};
