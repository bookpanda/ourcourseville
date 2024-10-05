import { AxiosResponse } from "axios";
import { apiClient } from "./axios";
import {
  AssignmentDTO,
  parseAssignmentDTO,
  parseAssignmentDTOList,
} from "./dto/assignment.dto";

export const getAssignmentByCourse = async (facultyCode: string) => {
  try {
    const res: AxiosResponse<AssignmentDTO[]> = await apiClient.get(
      `/assignment/course/${facultyCode}`
    );

    return parseAssignmentDTOList(res.data);
  } catch (error) {
    console.error("Failed to get assignment by course code", error);
    return Error("Failed to get assignment by course code");
  }
};

export const getAssignmentByCode = async (code: string) => {
  try {
    const res: AxiosResponse<AssignmentDTO> = await apiClient.get(
      `/assignment/${code}`
    );

    return parseAssignmentDTO(res.data);
  } catch (error) {
    console.error("Failed to get assignment by code", error);
    return Error("Failed to get assignment by code");
  }
};
