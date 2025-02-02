"use client";

import { pushRecentCourses, setCurrentCourse } from "@/src/store/courseSlice";
import { setCurrentFaculty } from "@/src/store/facultySlice";
import { useAppDispatch } from "@/src/store/store";
import { Course, Faculty } from "@/src/types";
import Image from "next/image";
import { FC } from "react";
import { Card } from ".";

interface CourseCardProps {
  href: string;
  course: Course;
  faculty?: Faculty;
}

export const CourseCard: FC<CourseCardProps> = ({ href, course, faculty }) => {
  const { code, name, count } = course;
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (faculty) dispatch(setCurrentFaculty(faculty));
    dispatch(setCurrentCourse(course));
    dispatch(pushRecentCourses(course));
  };

  return (
    <Card href={href} onClick={handleClick}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <Image
            src={course.icon}
            alt="logo"
            className="h-[60px] w-[60px] rounded-full"
            unoptimized
            width={60}
            height={60}
          />
        </div>
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
      <div className="text-sm text-medium">Assignments: {count}</div>
    </Card>
  );
};
