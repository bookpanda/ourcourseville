import { Course } from "@/src/types";

export type CourseDTO = {
  id: string;
  faculty_code: string;
  code: string;
  icon: string;
  name: string;
  created_at: string;
};

export const parseCourseDTO = (data: CourseDTO): Course => ({
  id: data.id,
  facultyCode: data.faculty_code,
  code: data.code,
  icon: data.icon,
  name: data.name,
  createdAt: data.created_at,
});

export const parseCourseDTOList = (data: CourseDTO[]): Course[] => {
  return data.map(parseCourseDTO);
};
