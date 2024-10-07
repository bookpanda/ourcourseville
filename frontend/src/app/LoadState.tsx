"use client";

import { FC } from "react";
import { setCurrentCourse } from "../store/courseSlice";
import { setCurrentFaculty } from "../store/facultySlice";
import { useAppDispatch } from "../store/store";
import { Course, Faculty } from "../types";

interface LoadStateProps {
  currentFaculty?: Faculty;
  currentCourse?: Course;
}

export const LoadState: FC<LoadStateProps> = ({
  currentFaculty,
  currentCourse,
}) => {
  const dispatch = useAppDispatch();

  if (currentFaculty) dispatch(setCurrentFaculty(currentFaculty));
  if (currentCourse) dispatch(setCurrentCourse(currentCourse));

  return <></>;
};
