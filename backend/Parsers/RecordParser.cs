using backend.DTO;
using backend.Models;

namespace backend.Parsers;

public class RecordParser
{
    public static RecordDTO ModelToCreatedDTO(Record record, CreateRecordDTO createRecord, string webUrl)
    {
        string facultyCode = createRecord.CourseCode.Substring(0, 2);
        return new RecordDTO
        {
            ID = record.ID ?? string.Empty,
            url = $"{webUrl}/faculty/{facultyCode}/course/{createRecord.CourseCode}/assignment/{createRecord.AssignmentCode}/record/{record.ID}",
            AssignmentCode = record.AssignmentCode,
            Problems = record.Problems,
            CreatedAt = record.CreatedAt.ToDateTime()
        };
    }

    public static RecordDTO ModelToDTO(Record record) =>
        new RecordDTO
        {
            ID = record.ID ?? string.Empty,
            AssignmentCode = record.AssignmentCode,
            Problems = record.Problems,
            CreatedAt = record.CreatedAt.ToDateTime()
        };

    public static List<RecordDTO> ModelToDTOList(List<Record> faculties)
    {
        List<RecordDTO> dtos = new List<RecordDTO>();
        foreach (Record record in faculties)
        {
            dtos.Add(ModelToDTO(record));
        }

        return dtos;
    }
}