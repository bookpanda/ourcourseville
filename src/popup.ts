import { scrape } from "./scripts/scrape";

const btn = document.getElementById("scrapeButton");

btn?.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];

    chrome.scripting.executeScript(
      {
        target: { tabId: currentTab.id ?? 0 },
        func: scrape,
        args: [currentTab.url ?? ""],
      },
      (results) => {
        const message = results[0].result;
        chrome.runtime.sendMessage(message);
      }
    );
  });
});
