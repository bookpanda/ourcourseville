// src/background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scrape") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "scrape" }, (response) => {
        sendResponse(response);
      });
    });
    return true; // Keep the message channel open for sendResponse
  }
});
