import { AxiosResponse } from "axios";
import { apiClient } from "./axios";
import { FacultyDTO, parseFacultyDTOList } from "./dto/faculty.dto";

export const getAllFaculty = async () => {
  try {
    const res: AxiosResponse<FacultyDTO[]> = await apiClient.get("/faculty");

    return parseFacultyDTOList(res.data);
  } catch (error) {
    console.error("Failed to get all faculty", error);
    return Error("Failed to get all faculty");
  }
};
