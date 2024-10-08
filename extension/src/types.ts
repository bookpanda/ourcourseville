export interface ScrapeRecord {
  courseCode: string;
  courseID: string;
  course: string;
  courseIcon: string;
  assignmentCode: string;
  assignment: string;
  problems: {
    question: string;
    answer: string;
  }[];
}

export type RecordDTO = {
  id: string;
  url?: string;
  assignment_code: string;
  problems: {
    question: string;
    answer: string;
  }[];
  created_at: string;
};
