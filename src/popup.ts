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
        console.log("Scraped data:", results); // Logs the result to the popup
        chrome.runtime.sendMessage(results);

        // document.getElementById("result").textContent = JSON.stringify(
        //   results[0].result,
        //   null,
        //   2
        // );
      }
    );
  });
});
