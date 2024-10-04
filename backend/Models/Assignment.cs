using System.Text.Json.Serialization;
using backend.Models;
using Google.Cloud.Firestore;

namespace backend.DTO;

[FirestoreData]
public record Assignment
{
    [FirestoreProperty]
    public string? ID { get; init; }
    [FirestoreProperty]
    public required string CourseCode { get; init; }
    [FirestoreProperty]
    public required string Code { get; init; }
    [FirestoreProperty]
    public required string Name { get; init; }
    [FirestoreProperty]
    public required DateTime CreatedAt { get; init; }
}