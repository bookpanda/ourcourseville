import { AxiosResponse } from "axios";
import { apiClient } from "./axios";
import {
  RecordDTO,
  parseRecordDTO,
  parseRecordDTOList,
} from "./dto/record.dto";

export const getRecordByAssignment = async (facultyCode: string) => {
  try {
    const res: AxiosResponse<RecordDTO[]> = await apiClient.get(
      `/record/assignment/${facultyCode}`
    );
    res.data.sort((a, b) => a.created_at.localeCompare(b.created_at));

    return parseRecordDTOList(res.data);
  } catch (error) {
    console.error("Failed to get record by assignment code", error);
    return Error("Failed to get record by assignment code");
  }
};

export const getRecordByID = async (id: string) => {
  try {
    const res: AxiosResponse<RecordDTO> = await apiClient.get(`/record/${id}`);

    return parseRecordDTO(res.data);
  } catch (error) {
    console.error("Failed to get record by id", error);
    return Error("Failed to get record by id");
  }
};
