import { RecordDTO } from "@src/types";

export const fillin = async (record: RecordDTO) => {
  console.log("Success:", record);
  const mainElements = document.querySelectorAll("main");
  const innerMain = mainElements[1];
  const form = innerMain.querySelectorAll("form")[0];

  const problems = Array.from(form.children).filter(
    (child) => child.tagName === "DIV"
  );

  problems.forEach((div, i) => {
    if (i >= record.problems.length) {
      console.error("No answer found for question", i + 1);
      return;
    }
    const answer = record.problems[i].answer;
    console.log(`answer for question ${i + 1}`, answer);
    const inputs = div.querySelectorAll("input");

    inputs.forEach((input) => {
      if (input.type === "text") {
        input.value = answer;
      } else if (input.type === "radio") {
        if (input.value === answer) {
          input.click();
        }
      }
    });

    const buttons = div.querySelectorAll("button");
    buttons.forEach((button) => {
      if (button.value === answer) {
        button.click();
      }
    });
  });
};
