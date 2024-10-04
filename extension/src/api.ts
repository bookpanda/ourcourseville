import { ScrapeMessage } from "./types";

export const saveRecord = async (record: ScrapeMessage) => {
  console.log(`api:`);
  console.log(record);

  const dto = messageToDTO(record);

  try {
    const response = await fetch("localhost:5203/api/v1/record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Success:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};

type CreateRecord = {
  course_code: string;
  course_id: string;
  course: string;
  assignment_id: string;
  assignment: string;
  problems: {
    question: string;
    answer: string;
  }[];
};

const messageToDTO = (record: ScrapeMessage): CreateRecord => {
  return {
    course_code: record.courseCode,
    course_id: record.courseID,
    course: record.course,
    assignment_id: record.assignmentID,
    assignment: record.assignment,
    problems: record.problems,
  };
};
