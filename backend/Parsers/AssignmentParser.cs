using backend.DTO;
namespace backend.Parsers;

public class AssignmentParser
{
    public static AssignmentDTO ModelToDTO(Assignment assignment) =>
        new AssignmentDTO
        {
            ID = assignment.ID ?? string.Empty,
            CourseCode = assignment.CourseCode,
            Code = assignment.Code,
            Name = assignment.Name,
            CreatedAt = assignment.CreatedAt.ToDateTime()
        };

    public static List<AssignmentDTO> ModelToDTOList(List<Assignment> faculties)
    {
        List<AssignmentDTO> dtos = new List<AssignmentDTO>();
        foreach (Assignment assignment in faculties)
        {
            dtos.Add(ModelToDTO(assignment));
        }

        return dtos;
    }
}