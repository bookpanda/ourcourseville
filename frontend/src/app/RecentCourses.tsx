"use client";

import { FC } from "react";
import { FaChalkboard } from "react-icons/fa6";
import { CourseCard } from "../components/Card/CourseCard";
import { useGetRecentCourses } from "../hooks/useGetRecentCourses";
import { Faculty } from "../types";

interface RecentCoursesProps {
  faculties: Faculty[];
}

export const RecentCourses: FC<RecentCoursesProps> = ({ faculties }) => {
  const { recentCourses } = useGetRecentCourses();

  if (recentCourses.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4 max-lg:flex-col-reverse">
        <div className="flex w-full flex-col gap-2 rounded-lg bg-white p-3 max-lg:w-full">
          <div className="flex justify-between gap-4">
            <div className="flex w-full items-center gap-2">
              <FaChalkboard className="h-5 w-5 text-secondary-default max-lg:h-4 max-lg:w-4" />
              <div className="text-lg font-semibold text-high max-lg:text-base">
                Recent
              </div>
            </div>
          </div>
          <div
            data-orientation="horizontal"
            role="separator"
            className="border-disable h-px border-b"
          />
          <div className="grid grid-cols-3 gap-2 overflow-x-auto pt-2 max-md:flex">
            {recentCourses.map((c) => {
              const faculty = faculties.find((f) => f.code === c.facultyCode);
              return (
                <CourseCard
                  href={`/faculty/${c.facultyCode}/course/${c.code}/assignment`}
                  key={c.code}
                  course={c}
                  faculty={faculty}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
