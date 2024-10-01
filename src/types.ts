export interface Message {
  type: "scrape" | "fillin";
}

export interface ScrapeMessage extends Message {
  title: string;
  problems: {
    question: string;
    answer: string;
  }[];
}

export function isScrapeMessage(msg: Message): msg is ScrapeMessage {
  return (msg as ScrapeMessage).problems !== undefined;
}
