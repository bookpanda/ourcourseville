"use strict";
const btn = document.getElementById("scrapeButton");
btn?.addEventListener("click", () => {
    console.log("click");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id ?? 0 },
            func: scrapePage,
        }, (results) => {
            console.log("Scraped data:", results); // Logs the result to the popup
            // document.getElementById("result").textContent = JSON.stringify(
            //   results[0].result,
            //   null,
            //   2
            // );
        });
    });
});
function scrapePage() {
    const pageTitle = document.title;
    const mainElements = document.querySelectorAll("main");
    const innerMain = mainElements[1];
    const form = innerMain.querySelectorAll("form")[0];
    const questions = Array.from(form.children).filter((child) => child.tagName === "DIV");
    chrome.runtime.sendMessage({ title: pageTitle, questions: questions });
    return { title: pageTitle, questions: questions }; // Also return it for popup use
}
