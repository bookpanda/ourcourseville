using System.Text.Json.Serialization;
using backend.Models;

namespace backend.DTO;

public record AssignmentDTO
{
    [JsonPropertyName("id")]
    public string? ID { get; init; }
    [JsonPropertyName("course_code")]
    public required string CourseCode { get; init; }
    [JsonPropertyName("code")]
    public required string Code { get; init; }
    [JsonPropertyName("name")]
    public required string Name { get; init; }
    [JsonPropertyName("created_at")]
    public DateTime? CreatedAt { get; init; }
}