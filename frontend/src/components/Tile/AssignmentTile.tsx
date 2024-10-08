import { Assignment } from "@/src/types";
import { formatTime } from "@/src/utils/formatTime";
import Link from "next/link";
import { FC } from "react";
import { FaUser } from "react-icons/fa6";
import { Tile } from ".";
import { Badge } from "../Badge";
import { Button } from "../Button";

interface AssignmentTileProps {
  href: string;
  assignment: Assignment;
}

export const AssignmentTile: FC<AssignmentTileProps> = ({
  href,
  assignment,
}) => {
  const { code, name, createdAt } = assignment;

  const formattedDate = formatTime(createdAt);

  return (
    <Tile>
      <div className="grid items-center gap-2 lg:grid-cols-[auto,188px,188px]">
        <div className="flex gap-2">
          <FaUser
            size={25}
            className="w-4 pt-0.5 text-medium lg:w-5 lg:text-lg"
          />
          <h5 className="h6 lg:h5 font-semibold text-high">{name}</h5>
        </div>
        <div className="h6 flex justify-center text-center text-medium">
          {formattedDate}
        </div>
      </div>
      <hr className="my-1" />
      <div className="flex justify-between gap-1">
        <div className="flex items-center gap-2">
          <Badge text={code} />
        </div>
        <Link href={href}>
          <Button text="Read Detail" />
        </Link>
      </div>
    </Tile>
  );
};
