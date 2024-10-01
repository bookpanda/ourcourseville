export interface Message {
  type: MessageType;
}

export interface ScrapeMessage extends Message {
  title: string;
  problems: {
    question: string;
    answer: string;
  }[];
}

export enum MessageType {
  SCRAPE = "scrape",
  FILLIN = "fillin",
}

export function isScrapeMessage(msg: Message): msg is ScrapeMessage {
  return (msg as ScrapeMessage).problems !== undefined;
}
