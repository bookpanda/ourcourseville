using backend.DTO;
using backend.Models;

namespace backend.Parsers;

public class CourseParser
{
    public static CourseDTO ModelToDTO(Course course) =>
        new CourseDTO
        {
            ID = course.ID ?? string.Empty,
            FacultyCode = course.FacultyCode,
            Code = course.Code,
            Name = course.Name,
            CreatedAt = course.CreatedAt.ToDateTime()
        };

    public static List<CourseDTO> ModelToDTOList(List<Course> faculties)
    {
        List<CourseDTO> dtos = new List<CourseDTO>();
        foreach (Course course in faculties)
        {
            dtos.Add(ModelToDTO(course));
        }

        return dtos;
    }
}