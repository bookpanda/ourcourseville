import { Faculty } from "@/src/types";
import { FC } from "react";
import { Card } from ".";

interface FacultyCardProps {
  faculty: Faculty;
  onClick?: () => void;
}

export const FacultyCard: FC<FacultyCardProps> = ({ faculty, onClick }) => {
  const { code, name } = faculty;
  const href = `/faculty/${code}/course`;
  return (
    <Card href={href}>
      <div className="flex flex-col gap-2" onClick={onClick}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <div className="text-sm font-semibold text-secondary-default">
              {code}
            </div>
            <div className="font-ibmplex line-clamp-3 h-[72px] text-base font-semibold text-high">
              {name}
            </div>
          </div>
          <ul className="flex h-[26px] flex-row gap-2"></ul>
        </div>
      </div>
      <div className="h-[1px] w-full rounded-full bg-dark"></div>
    </Card>
  );
};
