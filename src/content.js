// src/content.js

// Function to scrape data from the current page
function scrapeData() {
  const elements = document.querySelectorAll("p"); // Change selector as needed
  const data = Array.from(elements).map((el) => el.innerText); // Collect text content
  return data;
}

// Send the scraped data to the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scrape") {
    const scrapedData = scrapeData();
    sendResponse({ data: scrapedData });
  }
});
