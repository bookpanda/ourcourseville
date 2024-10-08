import { FC } from "react";
import { Button } from "./Button";
import { Tile } from "./Tile";

interface AssignmentTileProps {
  href: string;
}

export const AssignmentTile: FC<AssignmentTileProps> = ({ href }) => {
  return (
    <Tile>
      <div className="grid items-center gap-2 lg:grid-cols-[auto,188px,188px]">
        <Button text="Share solution" />
        <hr className="my-1" />
        <div className="h6 text-medium flex justify-center text-center">nd</div>
        <Button text="Load solution" />
      </div>
    </Tile>
  );
};
