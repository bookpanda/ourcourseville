using System.Text.Json.Serialization;

namespace backend.DTO;

public record CourseDTO
{
    [JsonPropertyName("id")]
    public string? ID { get; init; }
    [JsonPropertyName("faculty_code")]
    public required string FacultyCode { get; init; }
    [JsonPropertyName("code")]
    public required string Code { get; init; }
    [JsonPropertyName("name")]
    public required string Name { get; init; }

    [JsonPropertyName("created_at")]
    public DateTime? CreatedAt { get; init; }
}