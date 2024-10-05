import { Assignment } from "@/src/types";

export type AssignmentDTO = {
  id: string;
  course_code: string;
  code: string;
  name: string;
  created_at: string;
};

export const parseAssignmentDTO = (data: AssignmentDTO): Assignment => ({
  id: data.id,
  courseCode: data.course_code,
  code: data.code,
  name: data.name,
  createdAt: data.created_at,
});

export const parseAssignmentDTOList = (data: AssignmentDTO[]): Assignment[] => {
  return data.map(parseAssignmentDTO);
};
