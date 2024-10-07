"use client";

import { FC } from "react";
import { setCurrentAssignment } from "../store/assignmentSlice";
import { setCurrentCourse } from "../store/courseSlice";
import { setCurrentFaculty } from "../store/facultySlice";
import { setCurrentRecord } from "../store/recordSlice";
import { useAppDispatch } from "../store/store";
import { Assignment, Course, Faculty, Record } from "../types";

interface LoadStateProps {
  currentFaculty?: Faculty;
  currentCourse?: Course;
  currentAssignment?: Assignment;
  currentRecord?: Record;
}

export const LoadState: FC<LoadStateProps> = ({
  currentFaculty,
  currentCourse,
  currentAssignment,
  currentRecord,
}) => {
  const dispatch = useAppDispatch();

  if (currentFaculty) dispatch(setCurrentFaculty(currentFaculty));
  if (currentCourse) dispatch(setCurrentCourse(currentCourse));
  if (currentAssignment) dispatch(setCurrentAssignment(currentAssignment));
  if (currentRecord) dispatch(setCurrentRecord(currentRecord));

  return <></>;
};
