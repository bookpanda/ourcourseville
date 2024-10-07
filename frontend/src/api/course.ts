import { AxiosResponse } from "axios";
import { apiClient } from "./axios";
import {
  CourseDTO,
  parseCourseDTO,
  parseCourseDTOList,
} from "./dto/course.dto";

export const getCourseByFaculty = async (facultyCode: string) => {
  try {
    const res: AxiosResponse<CourseDTO[]> = await apiClient.get(
      `/course/faculty/${facultyCode}`
    );
    res.data.sort((a, b) => a.name.localeCompare(b.name));

    return parseCourseDTOList(res.data);
  } catch (error) {
    console.error("Failed to get course by faculty code", error);
    return Error("Failed to get course by faculty code");
  }
};

export const getCourseByCode = async (code: string) => {
  try {
    const res: AxiosResponse<CourseDTO> = await apiClient.get(
      `/course/${code}`
    );

    return parseCourseDTO(res.data);
  } catch (error) {
    console.error("Failed to get course by code", error);
    return Error("Failed to get course by code");
  }
};
