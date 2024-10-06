import { load } from "./scripts/load";
import { scrape } from "./scripts/scrape";

const scrapeBtn = document.getElementById("scrapeButton");

scrapeBtn?.addEventListener("click", () => {
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

const loadBtn = document.getElementById("loadButton");
const loadInput = document.getElementById("solutionInput");

loadBtn?.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];

    chrome.scripting.executeScript(
      {
        target: { tabId: currentTab.id ?? 0 },
        func: load,
        args: [loadInput?.nodeValue ?? ""],
      },
      (results) => {
        const message = results[0].result;
        chrome.runtime.sendMessage(message);
      }
    );
  });
});
