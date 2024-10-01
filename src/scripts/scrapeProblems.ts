import { Problem } from "../types";

export const scrapeProblems = (): Problem[] => {
  const mainElements = document.querySelectorAll("main");
  const innerMain = mainElements[1];
  const form = innerMain.querySelectorAll("form")[0];

  const problemsDiv = Array.from(form.children).filter(
    (child) => child.tagName === "DIV"
  );

  const problems = problemsDiv.map((p) => {
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

  return problems;
};
