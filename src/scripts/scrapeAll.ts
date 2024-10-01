import { ScrapeMessage } from "../types";
import { scrapeProblems } from "./scrapeProblems";

export const scrapeAll = (url: string): ScrapeMessage => {
  const problems = scrapeProblems();

  const response: ScrapeMessage = {
    type: "scrape",
    problems: problems,
  };

  // chrome.runtime.sendMessage(response);

  return response;
};
