import { Problem, Record } from "@/src/types";

export type RecordDTO = {
  id: string;
  assignment_code: string;
  code: string;
  problems: Problem[];
  created_at: string;
};

export const parseRecordDTO = (data: RecordDTO): Record => ({
  id: data.id,
  assignmentCode: data.assignment_code,
  problems: data.problems,
  createdAt: data.created_at,
});

export const parseRecordDTOList = (data: RecordDTO[]): Record[] => {
  return data.map(parseRecordDTO);
};
