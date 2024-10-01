using System.Collections.Generic;
using System.Text.Json.Serialization;
using backend.Models;

namespace backend.DTO;

public class RecordDTO
{
    [JsonPropertyName("course_code")]
    public required string CourseCode { get; set; }
    [JsonPropertyName("course_id")]
    public required string CourseID { get; set; }
    [JsonPropertyName("course")]
    public required string Course { get; set; }
    [JsonPropertyName("assignment_id")]
    public required string AssignmentID { get; set; }
    [JsonPropertyName("assignment")]
    public required string Assignment { get; set; }
    [JsonPropertyName("problems")]
    public required List<Problem> Problems { get; set; }
}