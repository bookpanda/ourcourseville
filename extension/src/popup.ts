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

loadBtn?.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    const loadInput = document.querySelector("input");

    chrome.scripting.executeScript({
      target: { tabId: currentTab.id ?? 0 },
      func: load,
      args: [loadInput?.value ?? ""],
    });
  });
});
