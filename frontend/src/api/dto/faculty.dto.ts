import { Faculty } from "@/src/types";

export type FacultyDTO = {
  id: string;
  code: string;
  name: string;
  created_at: string;
};

export const parseFacultyDTO = (data: FacultyDTO): Faculty => ({
  id: data.id,
  code: data.code,
  name: data.name,
  createdAt: data.created_at,
});

export const parseFacultyDTOList = (data: FacultyDTO[]): Faculty[] => {
  return data.map(parseFacultyDTO);
};
