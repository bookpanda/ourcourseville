import { AxiosResponse } from "axios";
import { apiClient } from "./axios";
import { CourseDTO, parseCourseDTOList } from "./dto/course.dto";

export const getCourseByFaculty = async (facultyCode: string) => {
  try {
    const res: AxiosResponse<CourseDTO[]> = await apiClient.get(
      `/course/faculty/${facultyCode}`
    );

    return parseCourseDTOList(res.data);
  } catch (error) {
    console.error("Failed to get course by faculty code", error);
    return Error("Failed to get course by faculty code");
  }
};
