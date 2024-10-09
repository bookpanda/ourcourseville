"use client";

import { setCurrentFaculty } from "@/src/store/facultySlice";
import { useAppDispatch } from "@/src/store/store";
import { Faculty } from "@/src/types";
import { FC } from "react";
import { Card } from ".";

interface FacultyCardProps {
  faculty: Faculty;
}

export const FacultyCard: FC<FacultyCardProps> = ({ faculty }) => {
  const dispatch = useAppDispatch();
  const { code, name, count } = faculty;
  const href = `/faculty/${code}/course`;

  const handleClick = () => {
    dispatch(setCurrentFaculty(faculty));
  };

  return (
    <Card href={href}>
      <div className="flex flex-col gap-2" onClick={handleClick}>
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
      <div className="text-sm text-medium">Courses: {count}</div>
    </Card>
  );
};
