export type Faculty = {
  id: string;
  code: string;
  name: string;
  createdAt: string;
};

export type Course = {
  id: string;
  facultyCode: string;
  code: string;
  icon: string;
  name: string;
  createdAt: string;
};

export type Assignment = {
  id: string;
  courseCode: string;
  code: string;
  name: string;
  createdAt: string;
};

export type Record = {
  id: string;
  assignmentCode: string;
  problems: Problem[];
  createdAt: string;
};

export type Problem = {
  question: string;
  answer: string;
};
