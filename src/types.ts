export interface Message {
  type: "scrape" | "fillin";
}

export interface ScrapeMessage extends Message {
  problems: Problem[];
}

export function isScrapeMessage(msg: Message): msg is ScrapeMessage {
  return (msg as ScrapeMessage).problems !== undefined;
}

export type Problem = {
  question: string;
  answer: string;
};

export type Metadata = {
  courseID: string;
  course: string;
  assignmentID: string;
  assignment: string;
};
