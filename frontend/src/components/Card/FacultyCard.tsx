import { FC } from "react";
import { Card } from ".";

interface FacultyCardProps {
  code: string;
  name: string;
}

export const FacultyCard: FC<FacultyCardProps> = ({ code, name }) => {
  const href = `/faculty/${code}`;
  return (
    <Card href={href}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <div className="text-secondary-default text-sm font-semibold">
              {code}
            </div>
            <div className="text-high font-ibmplex line-clamp-3 h-[72px] text-base font-semibold">
              {name}
            </div>
          </div>
          <ul className="flex h-[26px] flex-row gap-2"></ul>
        </div>
      </div>
      <div className="bg-dark h-[1px] w-full rounded-full"></div>
    </Card>
  );
};
