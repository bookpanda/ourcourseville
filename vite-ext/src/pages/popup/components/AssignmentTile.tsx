import { FC } from "react";
import { FaUser } from "react-icons/fa6";
import { Button } from "./Button";
import { Tile } from "./Tile";

interface AssignmentTileProps {
  href: string;
}

export const AssignmentTile: FC<AssignmentTileProps> = ({ href }) => {
  return (
    <Tile>
      <div className="grid items-center gap-2 lg:grid-cols-[auto,188px,188px]">
        <div className="flex gap-2">
          <FaUser
            size={25}
            className="text-medium w-4 pt-0.5 lg:w-5 lg:text-lg"
          />
          <h5 className="h6 lg:h5 text-high font-semibold">test</h5>
        </div>
        <div className="h6 text-medium flex justify-center text-center">nd</div>
      </div>
      <hr className="my-1" />
      <div className="flex justify-between gap-1">
        <div className="flex items-center gap-2"></div>
        <Button text="Read Detail" />
      </div>
    </Tile>
  );
};
