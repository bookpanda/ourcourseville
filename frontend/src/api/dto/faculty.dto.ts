import { Faculty } from "@/src/types";

export type FacultyDTO = {
  id: string;
  code: string;
  name: string;
  count: number;
  created_at: string;
};

export const parseFacultyDTO = (data: FacultyDTO): Faculty => ({
  id: data.id,
  code: data.code,
  name: data.name,
  count: data.count,
  createdAt: data.created_at,
});

export const parseFacultyDTOList = (data: FacultyDTO[]): Faculty[] => {
  return data.map(parseFacultyDTO);
};
