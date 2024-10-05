import { Assignment } from "@/src/types";
import Link from "next/link";
import { FC } from "react";
import { FaUser } from "react-icons/fa6";
import { Tile } from ".";
import { Badge } from "../Badge";
import { Button } from "../Button";

interface AssignmentTileProps {
  assignment: Assignment;
}

export const AssignmentTile: FC<AssignmentTileProps> = ({ assignment }) => {
  const { code, name, createdAt } = assignment;

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
          {createdAt}
        </div>
      </div>
      <div className="border-default border-b"></div>
      <div className="flex justify-between gap-1">
        <div className="flex items-center gap-2">
          {/* click will copy */}
          <Badge color="success-default" text={code} />
          <Link href={`/assignment/${code}`}>
            <Button text="Read Detail" />
          </Link>
        </div>
      </div>
    </Tile>
  );
};
