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
    [JsonPropertyName("icon")]
    public required string Icon { get; init; }
    [JsonPropertyName("name")]
    public required string Name { get; init; }
    [JsonPropertyName("count")]
    public int Count { get; init; } = 0;

    [JsonPropertyName("created_at")]
    public DateTime? CreatedAt { get; init; }
}