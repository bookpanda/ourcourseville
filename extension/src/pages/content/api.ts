import { RecordDTO, ScrapeRecord } from "@src/types";

const apiUrl: string = chrome.runtime.getManifest().api_url;
const apiKey: string = chrome.runtime.getManifest().api_key;

export const saveRecord = async (record: ScrapeRecord) => {
  const dto = messageToDTO(record);

  try {
    const response = await fetch(`${apiUrl}/record`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: RecordDTO = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getRecord = async (recordID: string) => {
  console.log("getRecord", recordID);
  try {
    const response = await fetch(`${apiUrl}/record/${recordID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: RecordDTO = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

type CreateRecord = {
  course_code: string;
  course_id: string;
  course_icon: string;
  course: string;
  assignment_code: string;
  assignment: string;
  problems: {
    question: string;
    answer: string;
  }[];
};

const messageToDTO = (record: ScrapeRecord): CreateRecord => {
  return {
    course_code: record.courseCode,
    course_id: record.courseID,
    course_icon: record.courseIcon,
    course: record.course,
    assignment_code: record.assignmentCode,
    assignment: record.assignment,
    problems: record.problems,
  };
};
