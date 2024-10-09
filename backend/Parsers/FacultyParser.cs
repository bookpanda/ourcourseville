using backend.DTO;
using backend.Models;

namespace backend.Parsers;

public class FacultyParser
{
    public static FacultyDTO ModelToDTO(Faculty faculty) =>
        new FacultyDTO
        {
            ID = faculty.ID ?? string.Empty,
            Code = faculty.Code,
            Name = faculty.Name,
            Count = faculty.Count,
            CreatedAt = faculty.CreatedAt.ToDateTime()
        };

    public static List<FacultyDTO> ModelToDTOList(List<Faculty> faculties)
    {
        List<FacultyDTO> dtos = new List<FacultyDTO>();
        foreach (Faculty faculty in faculties)
        {
            dtos.Add(ModelToDTO(faculty));
        }

        return dtos;
    }
}