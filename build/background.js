"use strict";
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Received scraped data:", message);
    // You can do something with the data here, like saving it or processing it
    sendResponse({ status: "Data received" });
});
