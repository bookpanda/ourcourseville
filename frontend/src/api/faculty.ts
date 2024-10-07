import { AxiosResponse } from "axios";
import { apiClient } from "./axios";
import {
  FacultyDTO,
  parseFacultyDTO,
  parseFacultyDTOList,
} from "./dto/faculty.dto";

export const getAllFaculty = async () => {
  try {
    const res: AxiosResponse<FacultyDTO[]> = await apiClient.get("/faculty");
    res.data.sort((a, b) => a.code.localeCompare(b.code));

    return parseFacultyDTOList(res.data);
  } catch (error) {
    console.error("Failed to get all faculty", error);
    return Error("Failed to get all faculty");
  }
};

export const getFacultyByCode = async (code: string) => {
  try {
    const res: AxiosResponse<FacultyDTO> = await apiClient.get(
      `/faculty/${code}`
    );

    return parseFacultyDTO(res.data);
  } catch (error) {
    console.error("Failed to get faculty by code", error);
    return Error("Failed to get faculty by code");
  }
};
