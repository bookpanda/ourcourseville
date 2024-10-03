import { ScrapeMessage } from "../types";

export const scrape = (url: string): ScrapeMessage => {
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

  const parts = url.split("/");
  const courseID = parts[4];
  const assignmentID = parts[6].split("#")[0];

  // courseCode, course
  const courseIcon = document.querySelector('img[alt="desktop course icon"]');
  let courseCode = "null";
  let course = "null";
  if (courseIcon) {
    const siblingDiv = courseIcon.nextElementSibling;
    const childDivs = siblingDiv?.querySelectorAll("div");
    if (childDivs && childDivs.length >= 2) {
      const rawCourseCode = childDivs[0].textContent?.trim() ?? "null";
      courseCode = rawCourseCode.split(".")[0];
      course = childDivs[1].textContent?.trim() ?? "null";
    }
  }

  // assignment
  const anchor = document.querySelectorAll(
    `a[href="/course/${courseID}/assignments"]`
  );
  let assignment = "No assignment name found";
  if (anchor[1]) {
    assignment = "asd";
    const parentDiv = anchor[1].closest("div");
    assignment =
      parentDiv?.nextElementSibling?.nextElementSibling?.textContent?.trim() ??
      "No assignment name";
  }

  const response: ScrapeMessage = {
    type: "scrape",
    courseID,
    course,
    courseCode,
    assignmentID,
    assignment,
    problems: qnas,
  };

  // chrome.runtime.sendMessage(response);

  return response;
};
