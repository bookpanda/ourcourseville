using System.Text.Json.Serialization;
using backend.Models;

namespace backend.DTO;

public record RecordDTO
{
    [JsonPropertyName("course_code")]
    public required string CourseCode { get; init; }
    [JsonPropertyName("course_id")]
    public required string CourseID { get; init; }
    [JsonPropertyName("course")]
    public required string Course { get; init; }
    [JsonPropertyName("assignment_id")]
    public required string AssignmentID { get; init; }
    [JsonPropertyName("assignment")]
    public required string Assignment { get; init; }
    [JsonPropertyName("problems")]
    public required List<Problem> Problems { get; init; }
}