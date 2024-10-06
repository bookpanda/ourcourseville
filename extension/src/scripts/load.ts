export const load = async (recordID: string) => {
  console.log("load", recordID);
  const apiUrl = chrome.runtime.getManifest().api_url;
  const apiKey = chrome.runtime.getManifest().api_key;
  type RecordDTO = {
    id: string;
    assignment_code: string;
    problems: {
      question: string;
      answer: string;
    }[];
    created_at: string;
  };

  try {
    const response = await fetch(`${apiUrl}/record/${recordID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return "error status" + response.status;
    }

    const result: RecordDTO = await response.json();
    console.log("Success:", result);
    const mainElements = document.querySelectorAll("main");
    const innerMain = mainElements[1];
    const form = innerMain.querySelectorAll("form")[0];

    const problems = Array.from(form.children).filter(
      (child) => child.tagName === "DIV"
    );

    problems.forEach((div, i) => {
      if (i >= result.problems.length) {
        console.error("No answer found for question", i + 1);
        return;
      }
      const answer = result.problems[i].answer;
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
  } catch (error) {
    console.error("Error:", error);
    return "error";
  }
};
