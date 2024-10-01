import { saveRecord } from "./api";
import { isScrapeMessage, Message, MessageType } from "./types";

chrome.runtime.onMessage.addListener(
  (message: Message, sender, sendResponse) => {
    switch (message.type) {
      case MessageType.SCRAPE:
        if (!isScrapeMessage(message)) return;

        console.log("Received scraped data:", message);
        saveRecord(message);
        break;
    }

    // You can do something with the data here, like saving it or processing it

    sendResponse({ status: "Data received" });
  }
);
