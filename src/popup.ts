import { scrapePage } from "./scripts/scrape";

const btn = document.getElementById("scrapeButton");

btn?.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id ?? 0 },
        func: scrapePage,
      },
      (results) => {
        const message = results[0].result;
        chrome.runtime.sendMessage(message);
      }
    );
  });
});
