import { saveRecord } from "./api";
import { isScrapeMessage, Message } from "./types";

chrome.runtime.onMessage.addListener(
  (message: Message, sender, sendResponse) => {
    switch (message.type) {
      case "scrape":
        if (!isScrapeMessage(message)) return;

        console.log("Received scraped data:", message);
        saveRecord(message);
        break;
    }

    sendResponse({ status: "Data received" });
  }
);
