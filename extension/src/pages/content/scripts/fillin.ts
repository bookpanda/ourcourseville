import { RecordDTO } from "@src/types";

export const fillin = async (record: RecordDTO) => {
  console.log("Success:", record);
  const mainElements = document.querySelectorAll("main");
  const innerMain = mainElements[1];
  const form = innerMain.querySelectorAll("form")[0];

  const problems = Array.from(form.children).filter(
    (child) => child.tagName === "DIV"
  );

  const solutions = record.problems;

  problems.forEach((p, i) => {
    const questionDiv = p.children[0].children[0];
    const questionP = questionDiv.getElementsByTagName("p");
    const textArray = Array.from(questionP).map((para) =>
      para.textContent?.trim()
    );
    const question = textArray.join(" ");

    const answer =
      solutions.find((solution) => solution.question === question)?.answer ??
      "No answer found";
    console.log(`answer for question ${question} (${i + 1}):`, answer);
    const inputs = p.querySelectorAll("input");

    inputs.forEach((input) => {
      if (input.type === "text") {
        input.value = answer;
      } else if (input.type === "radio") {
        if (input.value === answer) {
          input.click();
        }
      }
    });

    const buttons = p.querySelectorAll("button");
    buttons.forEach((button) => {
      if (button.value === answer) {
        button.click();
      }
    });
  });
};
