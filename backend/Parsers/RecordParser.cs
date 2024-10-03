using backend.DTO;
using backend.Models;

namespace backend.Parsers;

public class RecordParser
{
    public static RecordDTO ModelToDTO(Record record) =>
        new RecordDTO
        {
            ID = record.ID ?? string.Empty,
            CourseCode = record.CourseCode,
            CourseID = record.CourseID,
            Course = record.Course,
            AssignmentID = record.AssignmentID,
            Assignment = record.Assignment,
            Problems = record.Problems,
            CreatedAt = record.CreatedAt.ToDateTime()
        };
}