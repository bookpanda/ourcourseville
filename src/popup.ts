const btn = document.getElementById("scrapeButton");

btn?.addEventListener("click", () => {
  console.log("click");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id ?? 0 },
        func: scrapePage,
      },
      (results) => {
        console.log("Scraped data:", results); // Logs the result to the popup
        // document.getElementById("result").textContent = JSON.stringify(
        //   results[0].result,
        //   null,
        //   2
        // );
      }
    );
  });
});

function scrapePage() {
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
    if (textAnswer) {
      return { question, answer: textAnswer };
    }

    const checkedButton = answerDiv.querySelector(
      'button[data-state="checked"]'
    );
    if (!checkedButton) {
      console.log("No checked button found in the specified <div>.");
      return { question, answer: "No answer found" };
    }

    const label = document.querySelector(`label[for="${checkedButton.id}"]`);
    const choiceAnswer = label?.textContent?.trim() ?? "No answer found";

    return {
      question,
      answer: choiceAnswer,
    };
  });

  chrome.runtime.sendMessage({
    title: pageTitle,
    problems: qnas,
  });

  return { title: pageTitle, problems: qnas }; // Also return it for popup use
}
