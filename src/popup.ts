import { ScrapeMessage } from "./types";

const btn = document.getElementById("scrapeButton");

btn?.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id ?? 0 },
        func: scrapePage,
      },
      (results) => {
        console.log("results:", results);
        const message = results[0].result;
        console.log("message:", message);
        // chrome.runtime.sendMessage(message);
      }
    );
  });
});

const scrapePage = (): ScrapeMessage => {
  const pageTitle = document.title;
  const mainElements = document.querySelectorAll("main");
  const innerMain = mainElements[1];
  const form = innerMain.querySelectorAll("form")[0];

  const problems = Array.from(form.children).filter(
    (child) => child.tagName === "DIV"
  );

  const qnas = problems.map((p) => {
    const questionDiv = p.children[0].children[0];
    const questionP = questionDiv.getElementsByTagName("p");
    const textArray = Array.from(questionP).map((para) =>
      para.textContent?.trim()
    );
    const question = textArray.join(" ");

    const answerDiv = p.children[0].children[1];
    const textAnswer = Array.from(answerDiv.childNodes)
      .reduce((text, node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          return text + node?.textContent?.trim();
        }
        return text;
      }, "")
      .trim();
    if (textAnswer) return { question, answer: textAnswer };

    const checkedButton = answerDiv.querySelector(
      'button[data-state="checked"]'
    );
    const label = document.querySelector(`label[for="${checkedButton?.id}"]`);
    const choiceAnswer = label?.textContent?.trim();
    if (choiceAnswer)
      return {
        question,
        answer: choiceAnswer,
      };

    const fileAnchor = answerDiv.querySelector("a");
    const fileUrl = fileAnchor?.href;
    if (fileUrl) return { question, answer: fileUrl };

    return { question, answer: "No answer found" };
  });

  const response: ScrapeMessage = {
    type: "scrape",
    title: pageTitle,
    problems: qnas,
  };

  // chrome.runtime.sendMessage(response);

  return response;
};
